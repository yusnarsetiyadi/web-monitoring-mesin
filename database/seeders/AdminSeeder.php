<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'role' => UserRole::Admin->value, // <- gunakan ->value untuk enum
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Teknisi',
                'email' => 'teknisi@gmail.com',
                'role' => UserRole::Teknisi->value,
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Operator',
                'email' => 'operator@gmail.com',
                'role' => UserRole::Operator->value,
                'password' => Hash::make('password123'),
            ]
        ]);
    }
}
