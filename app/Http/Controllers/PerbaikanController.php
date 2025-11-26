<?php

namespace App\Http\Controllers;

use App\Enums\StatusKerusakan;
use App\Models\Perbaikan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PerbaikanController extends Controller
{
    //
    public function index(Request $request) 
    {
        $searchQuery = $request->query('search');

        // Query builder
        $query = Perbaikan::with(['kerusakan', 'teknisi', 'kerusakan.mesin']);
        
        // Filter untuk teknisi - hanya tampilkan tugas yang di-assign ke mereka
        if (Auth::user()->role->value === 'teknisi') {
            $query->where('teknisi_id', Auth::id());
        }
    
        // Filter search
        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('tindakan', 'like', "%{$searchQuery}%")
                  ->orWhere('sparepart', 'like', "%{$searchQuery}%")
                  ->orWhere('catatan', 'like', "%{$searchQuery}%")
                  ->orWhereHas('kerusakan', function ($subQ) use ($searchQuery) {
                      $subQ->where('deskripsi', 'like', "%{$searchQuery}%")
                           ->orWhere('status', 'like', "%{$searchQuery}%");
                  });
            });
        }

        $perbaikan = $query->latest()->get();

        return Inertia::render('perbaikan/index', [
            'perbaikan' => $perbaikan, 
            'filters' => $request->only(['search']),
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id' => 'required|exists:perbaikans,id',
            'tindakan' => 'required|string|max:255',
            'sparepart' => 'required|string|max:255',
            'catatan' => 'nullable|string|max:255',
        ]);

        // Ambil data perbaikan
        $perbaikan = Perbaikan::with('kerusakan')->findOrFail($request->id);

        $dataUpdate = [
            'tindakan' => $validated['tindakan'],
            'sparepart' => $validated['sparepart'],
            'catatan' => $validated['catatan'] ?? null,
        ];

        if($perbaikan->kerusakan->status !== StatusKerusakan::Selesai->value) {
            $perbaikan->kerusakan()->update([
                'status' => StatusKerusakan::Selesai->value,
            ]);

            $dataUpdate['waktu_selesai'] = now();
        }


        // Update data
        $perbaikan -> update($dataUpdate);

        return redirect()->route('perbaikan.index')->with('success', 'Perbaikan berhasil diperbarui dan kerusakan diselesaikan');
    }

    public function history(Request $request) 
    {
        $searchQuery = $request->query('search');

        // Query builder
        $query = Perbaikan::with(['kerusakan', 'teknisi', 'kerusakan.mesin'])
                ->whereHas('kerusakan', function ($q) {
                    $q->where('status', StatusKerusakan::Selesai->value);
                });
    
        // Filter search
        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('tindakan', 'like', "%{$searchQuery}%")
                  ->orWhere('sparepart', 'like', "%{$searchQuery}%")
                  ->orWhere('catatan', 'like', "%{$searchQuery}%")
                  ->orWhereHas('kerusakan', function ($subQ) use ($searchQuery) {
                      $subQ->where('deskripsi', 'like', "%{$searchQuery}%")
                           ->orWhere('status', 'like', "%{$searchQuery}%");
                  });
            });
        }

        $perbaikan = $query->latest()->get();

        return Inertia::render('perbaikan/history', [
            'history' => $perbaikan, 
            'filters' => $request->only(['search']),
        ]);
    }

}
