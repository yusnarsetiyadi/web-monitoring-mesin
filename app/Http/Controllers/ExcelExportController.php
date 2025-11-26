<?php

namespace App\Http\Controllers;

use App\Exports\ExportDatakerusakan;
use App\Exports\ExportDataPerbaikan;
use App\Models\Kerusakan;
use App\Models\Perbaikan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExcelExportController extends Controller
{
    public function index() {
        return Inertia::render('report/index');
    }


    // report Kerusakan
    public function reportKerusakan(Request $request) {
        $month = $request->get('month', now()->month);
        $year = $request->get('year', now()->year);

        // Query data kerusakan berdasarkan bulan dan tahun
        $kerusakans = Kerusakan::with('mesin', 'user')
            ->whereYear('waktu_lapor', $year)
            ->whereMonth('waktu_lapor', $month)
            ->get();

        // Geneerate Excel 
        $exporter = new ExportDatakerusakan($kerusakans, $month, $year);
        
        return $exporter->generate();
    }

    public function reportPerbaikan(Request $request) {
        $month = (int) $request->get('month', now()->month);
        $year = (int) $request->get('year', now()->year);

        $perbaikans = Perbaikan::with('kerusakan', 'teknisi')
            ->whereYear('waktu_mulai', $year)
            ->whereMonth('waktu_mulai', $month)
            ->get();

        $exporter = new ExportDataPerbaikan($perbaikans, $month, $year);
        return  $exporter->generate();
    }
}
