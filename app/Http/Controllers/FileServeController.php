<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

class FileServeController extends Controller
{
    public function serve(string $path): mixed
    {
        // Block directory traversal and null bytes
        if (str_contains($path, '..') || str_contains($path, "\0")) {
            abort(403);
        }

        if (!Storage::disk('public')->exists($path)) {
            abort(404);
        }

        $content = Storage::disk('public')->get($path);
        $mime = $this->resolveMime($path);

        return response($content, 200, [
            'Content-Type' => $mime,
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }

    private function resolveMime(string $path): string
    {
        return match (strtolower(pathinfo($path, PATHINFO_EXTENSION))) {
            'jpg', 'jpeg' => 'image/jpeg',
            'png'         => 'image/png',
            'gif'         => 'image/gif',
            'webp'        => 'image/webp',
            'svg'         => 'image/svg+xml',
            'pdf'         => 'application/pdf',
            default       => 'application/octet-stream',
        };
    }
}
