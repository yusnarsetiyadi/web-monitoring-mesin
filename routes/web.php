<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExcelExportController;
use App\Http\Controllers\KerusakanController;
use App\Http\Controllers\MesinController;
use App\Http\Controllers\PerbaikanController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');   
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Management Mesin
    Route::get('/mesin', [MesinController::class, 'index'])->name('mesin.index');
    Route::post('/mesin', [MesinController::class, 'store'])->name('mesin.store');
    Route::put('/mesin/{id}', [MesinController::class, 'update'])->name('mesin.update');
    Route::delete('/mesin/{id}', [MesinController::class, 'destroy'])->name('mesin.destroy');

    // Management Kerusakan 
    Route::get('/kerusakans', [KerusakanController::class, 'indexOperator'])->name('kerusakans.index');
    Route::post('/kerusakans', [KerusakanController::class, 'store'])->name('kerusakan.store'); 
    Route::delete('/kerusakans/{id}', [KerusakanController::class, 'destroy'])->name('kerusakan.destroy');

    Route::get('/kerusakans/{id}/assign', [KerusakanController::class, 'assign'])->name('kerusakan.assign');
    Route::patch('/kerusakans/{id}/assign', [KerusakanController::class, 'update'])->name('perbaikan.assign');

    // Management Perbaikan
    Route::get('/perbaikan', [PerbaikanController::class, 'index'])->name('perbaikan.index');
    Route::patch('/perbaikan/{id}', [PerbaikanController::class, 'update'])->name('perbaikan.update');

    // Histori Perbaikan
    Route::get('/history', [PerbaikanController::class, 'history'])->name('history');

});
 
// Role admin
 Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    // Management Users - hanya admin yang bisa mengubah role
    Route::get('/users', [UserController::class, 'index'])->name('users.index');    
    Route::put('/users/{id}/role', [UserController::class, 'updateRole'])->name('users.updateRole');

    // Report
    Route::get('/report', [ExcelExportController::class, 'index'])->name('report.index');

    Route::get('/report/export', [ExcelExportController::class, 'reportKerusakan'])->name('report.export.get');
    Route::post('/report/export', [ExcelExportController::class, 'reportKerusakan'])->name('report.export.post');

    Route::get('/report/exportPerbaikan', [ExcelExportController::class, 'reportPerbaikan'])->name('report.perbaikan.export.get');
    Route::post('/report/exportPerbaikan', [ExcelExportController::class, 'reportPerbaikan'])->name('report.perbaikan.export.post');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
