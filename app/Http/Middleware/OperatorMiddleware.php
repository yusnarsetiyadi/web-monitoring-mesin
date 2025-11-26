<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class OperatorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!Auth::check() || Auth::user()->role !== 'operator') {
            return redirect()->route('dashboard')
            ->with('messageError', 'Akses ditolak. Hanya operator yang dapat mengakses halaman ini.');
        }

        return $next($request);
    }
}
