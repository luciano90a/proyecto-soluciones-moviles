<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    //Redirecciona al dashboard.
    public function dashboard()
    {
        return view('layouts.dashboard');
    }

    public function findUser (Request $request){

        $user = in_array($request->username, session('users'));
        return view('layouts.dashboard');
    }

}
