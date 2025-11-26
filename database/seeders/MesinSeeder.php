<?php

namespace Database\Seeders;

use App\Models\Mesin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MesinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Mesin::insert([
            [
                'kode_mesin' => 'FDP-001',
                'nama_mesin' => 'Mesin Penggiling Daging',
                'lokasi' => 'Pabrik A - Lantai 1',
                'kategori' => 'Pengolahan Bahan',
            ],
            [
                'kode_mesin' => 'FDP-002',
                'nama_mesin' => 'Mesin Pemotong Sayuran',
                'lokasi' => 'Pabrik A - Lantai 1',
                'kategori' => 'Pengolahan Bahan'
            ],
            [
                'kode_mesin' => 'FDP-003',
                'nama_mesin' => 'Mesin Pencampur Adonan',
                'lokasi' => 'Pabrik A - Lantai 2',
                'kategori' => 'Pencampuran'
            ],
            [
                'kode_mesin' => 'FDP-004',
                'nama_mesin' => 'Mesin Pemasak Uap',
                'lokasi' => 'Pabrik A - Lantai 2',
                'kategori' => 'Pemasakan'
            ],
            [
                'kode_mesin' => 'FDP-005',
                'nama_mesin' => 'Mesin Oven Industri',
                'lokasi' => 'Pabrik B - Lantai 1',
                'kategori' => 'Pemasakan'
            ],
            [
                'kode_mesin' => 'FDP-006',
                'nama_mesin' => 'Mesin Pendingin Cepat',
                'lokasi' => 'Pabrik B - Lantai 1',
                'kategori' => 'Pendinginan'
            ],
            [
                'kode_mesin' => 'FDP-007',
                'nama_mesin' => 'Mesin Pengisian Cairan',
                'lokasi' => 'Pabrik B - Lantai 2',
                'kategori' => 'Pengemasan'
            ],
            [
                'kode_mesin' => 'FDP-008',
                'nama_mesin' => 'Mesin Pengemasan Vakum',
                'lokasi' => 'Pabrik C - Lantai 1',
                'kategori' => 'Pengemasan'
            ],
            [
                'kode_mesin' => 'FDP-009',
                'nama_mesin' => 'Mesin Penempel Label',
                'lokasi' => 'Pabrik C - Lantai 2',
                'kategori' => 'Pengemasan'
            ],
            [
                'kode_mesin' => 'FDP-010',
                'nama_mesin' => 'Mesin Conveyor Makanan',
                'lokasi' => 'Pabrik C - Lantai 2',
                'kategori' => 'Distribusi'
            ],
        ]);

    }
}
