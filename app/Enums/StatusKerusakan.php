<?php

namespace App\Enums;

enum StatusKerusakan: string
{
    case Dilaporkan = 'Dilaporkan'; //Merah
    case DalamPerbaikan = 'Dalam Perbaikan'; //Biru
    case Selesai = 'Selesai'; //Hijau
    case DiTolak = 'DiTolak'; // Orange
}
