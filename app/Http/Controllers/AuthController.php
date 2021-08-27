<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('active', 1)
            ->where(function ($q) use ($request) {
                return $q->where('name', $request->email)
                    ->orWhere('email', $request->email);
            })->first();

        if ($user && password_verify($request->password, $user->password)) {
            Auth::login($user, true);

            return response()->json([
                'token' => $user->createToken($request->device_name ?: 'web')->plainTextToken,
                'user' => $user
            ]);
        }

        return response()->json([
            'message' => 'Username atau password salah',
        ], 403);
    }

    public function logout()
    {
        return response('', 204);
    }

    public function me()
    {
        return ['user' => auth()->user()];
    }
}
