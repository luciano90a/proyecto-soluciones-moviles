<?php

namespace App\Http\Controllers;

use App\Models\Post;
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //
        $token = $request->header('Authorization');
        $user = JWTAuth::toUser($token);
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
