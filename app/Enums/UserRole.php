<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case Teknisi = 'teknisi';
    case Operator = 'operator';
}
