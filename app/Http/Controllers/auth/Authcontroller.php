<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use Tymon\JWTAuth\Facades\JWTAuth;

class Authcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login (LoginRequest $loginrequest){
    $user_data = $loginrequest->only('email','password');

    try{
        if ( !$token = JWTAuth::attempt($user_data) ){
            return response()->json([
                "amigo"=> "error de datos ingresados"
            ]);
        }
        $token_check=$token;

    }catch (\Exception $e){
        return response()->json(
            [
                "error"=> "usuario no existe"
            ],500
        );
    }
    $user=auth()->user();
    $users = User::all();
    $post = Post::all();
    if ($user->role=="admin"){
        return response()->json([
            'users'=> $users,
            'posts'=>$post,
        ]);
    }else{
        return response()->json([
            'token' => $token_check,
            'user' => $user,
        ]);
    }
    }
     public function register(RegisterRequest $request){

        $user = User::create(
            [
            'name'=> $request->name,
            'username'=> $request->username,
            'lastname'=> $request->lastname,
            'email'=> $request->email,
            'password'=> $request->password,
            'pdf_path'=>"",
            'role'=> "usuario",
            'status'=>"on",
            ]
        );
        $token=JWTAuth::fromUser($user);

        return response()->json(
            [
                'user'=>$user,
                'token'=>$token
            ]
            );
     }
     public function verifyToken(){
        try{
            $token = JWTAuth::getToken();
            if(!$token){
                return response()->json([
                    'error_verirfy_token','token no valido'
                ],400);
            }
            $user = JWTAuth::parseToken()->authenticate();

            return response()->json([
                'message'=>'token valido <)',
                'user'=>$user,
                'token'=>$token
            ]);
        }catch (\Exception $e){
            return response()->json([
                'error'=>$e->getMessage()
            ]);
        }
     }
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
