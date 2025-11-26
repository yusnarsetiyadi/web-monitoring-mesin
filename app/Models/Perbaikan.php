<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Perbaikan extends Model
{
    protected $fillable = [
        'kerusakan_id',
        'teknisi_id',
        'tindakan',
        'sparepart',
        'waktu_mulai',
        'waktu_selesai',
        'catatan',
    ];


    public function kerusakan(): BelongsTo
    {
        return $this->belongsTo(Kerusakan::class);
    }

    public function teknisi(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
