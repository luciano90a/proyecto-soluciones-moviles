<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LoginController extends Controller
{

    public static $auth = false;

    //redirecciona al login
    public function login()
    {
        return view('layouts.login');
    }

    //Comprueba los datos del adminsitrador
    public function loginAuth(Request $request)
    {
        $messages = makeMessages();

        //Valida la informaición
        $this->validate($request, [
            'email' => ['required', 'email'],
            'password' => ['required']
        ], $messages);

        $credentials = $request->only('email', 'password');

        //Se obtiene la respuesta desde la API utilizando las credenciales
        $response = Http::post('http://192.168.0.2:8000/api/login', $credentials)->json();

        //Verifica que se haya obtenido la respuesta esperdada. 
        //Si no es así, redirecciona al login indicando que las credenciales son incorrectas.
        if(isset($response["users"])){

            $usersAll = $response["users"];
            $posts = $response["posts"];
            $users = array();
            $inactiveUsers = 0;
            $activeUsers = 0 ;
            $postsCount = count($posts);

            foreach($usersAll as $user){
                if($user['role'] === 'usuario'){

                    array_push($users, $user);
                    if($user['status'] === '0'){
                        $inactiveUsers++;
                    }{
                        $activeUsers++;
                    }
                }
            }

            session([
                'auth' => true,
                'user' => 'administrador',
                'posts' => $posts,
                'postsCount' => $postsCount,
                'users' => $users,
                'inactiveUsers' => $inactiveUsers,
                'activeUsers' => $activeUsers
            ]);
            
            return redirect()->route('dashboard');
        }
        else
        {
            return back()->with('message', 'Usuario no registrado o contraseña incorrecta');
        }
    }

}
