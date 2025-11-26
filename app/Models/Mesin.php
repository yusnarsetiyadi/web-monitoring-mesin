<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mesin extends Model
{
    protected $fillable = [
        'kode_mesin',
        'nama_mesin',
        'lokasi',
        'kategori',
        'gambar_mesin'
    ];


    public function kerusakan(): HasMany
    {
        return $this->hasMany(Kerusakan::class);
    }
}
