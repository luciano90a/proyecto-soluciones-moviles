<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function logout()
    {
        session([
            'auth' => false,
            'posts' => '',
            'users' => ''
        ]);
        return redirect()->route('login');
    }
}
