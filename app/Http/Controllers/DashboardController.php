<?php

namespace App\Http\Controllers;

use App\Models\Kerusakan;
use App\Models\Mesin;
use App\Models\Perbaikan;
use App\Models\User;

class DashboardController extends Controller
{
    public function index() {

        $jumlahMesin = Mesin::count();
        $jumlahUser = User::count();
        $totalPerbaikan = Perbaikan::count();
        $totalKerusakanBulanIni = Kerusakan::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        $listTeknisi = User::where('role', 'teknisi')->get();

        $kerusakanTerbaru = Kerusakan::with('mesin')
            ->latest()
            ->take(5)
            ->get();

        return inertia('dashboard', [
            'jumlahMesin' => $jumlahMesin,
            'jumlahUser' => $jumlahUser,
            'totalPerbaikan' => $totalPerbaikan,
            'totalKerusakanBulanIni' => $totalKerusakanBulanIni,
            'listTeknisi' => $listTeknisi,
            'kerusakanTerbaru' => $kerusakanTerbaru,
        ]);
    }
}
