<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Like;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\User;
use app\Http\Controllers\Usercontroller;
use Tymon\JWTAuth\Facades\JWTAuth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //metodo para retornar los post
        $posts = Post::orderBy('created_at', 'desc')->get();

        return response()->json($posts, 200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //
        $token = $request->header('Authorization');
        $user = JWTAuth::toUser($token);
        try{
            $new_post=Post::create([
                'post_title'=>$request->post_title,
                'post_description'=>$request->post_description,
                'post_image_dir'=>$request->post_image_dir,
                'post_likes'=>$request->post_likes,
                'post_comments'=>$request->post_comments,
                'user_id'=>$user->id
            ]);
            return response()->json([
                'message'=>'exito',],200);
        }catch(\Exception $e){
            return response()->json([
        'message'=> $e] ,500);
        }

    }
    public function likePost(Post $post)
    {
        try {
            // Verifica si el usuario ya ha dado like a este post
            $user = auth()->user();
            if ($post->likes()->where('user_id', $user->id)->exists()) {
                return response()->json(['message' => 'Ya has dado like a este post'], 422); // 422 Unprocessable Entity
            }

            // Incrementa el número de likes y crea un registro en la tabla de likes
            $post->increment('post_likes');
            $post->likes()->create(['user_id' => $user->id]);

            return response()->json(['message' => 'Like incrementado con éxito'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al incrementar el like'], 500);
        }
    }


public function dislikePost(Post $post)
{
    try {
        // Verifica si el usuario ya ha dado like a este post
        $user = auth()->user();
        $existingLike = $post->likes()->where('user_id', $user->id)->first();

        if ($existingLike) {
            // Si ya existe un like, disminuye el número de likes y elimina el like existente
            $post->decrement('post_likes');
            $existingLike->delete();
            return response()->json(['message' => 'Dislike realizado con éxito'], 200);
        }
        return response()->json(['message' => 'No has dado like a este post'], 422);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al gestionar el dislike'], 500);
    }
}
public function getLikedPosts()
{
    try {
        // Obtén el usuario autenticado
        $user = auth()->user();

        // Obtén los posts que le gustan al usuario
        $likedPosts = $user->likedPosts()->pluck('id')->toArray();

        return response()->json(['likedPosts' => $likedPosts], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al obtener los posts que le gustan al usuario'], 500);
    }
}





    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
