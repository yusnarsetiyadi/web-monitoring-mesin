<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function index(Request $request)
    {
        // Get Value
        $searchQuery = $request->query('search');

        $listUsers = User::when($searchQuery, function($query, $search) {
            return $query -> where('name', 'like', '%' . $search . '%')
                    -> orwhere('email', 'like', '%' . $search . '%')
                    ->orwhere('role', 'like', '%' . $search . '%');
        })
        ->get();

        return Inertia::render('users/index', [
            'data' => $listUsers,
            'filters' => $request->only(['search'])
        ]);
    }

    public function updateRole(Request $request, $id) {
        $request->validate([
            'role' => ['required', Rule::in(['admin', 'teknisi', 'operator'])],
        ]);

        $user = User::findOrFail($id);

        if ($user->id === Auth::id()  && $request->role !== 'admin') {
            return redirect()->back()->withErrors([
                'role' => 'Admin tidak dapat mengubah role diri sendiri dari admin',
            ]);
        }

        $user->update([
            'role' => $request->role
        ]);

        return redirect()->back()->with('success', 'Role user berhasil diperbarui.');

    }

}
