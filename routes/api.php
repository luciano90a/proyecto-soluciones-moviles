<?php

use App\Http\Controllers\auth\Authcontroller;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Usercontroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [ Authcontroller::class, 'register']);
Route::post('login', [ Authcontroller::class, 'login']);
Route::middleware('jwt.verify')->group(function () {
    Route::post('post',[PostController::class,'store']);
    Route::post('upload', [ImageController::class, 'upload_image']);
    Route::get('viewpost',[PostController::class,'index']);

});

Route::get('users', [Usercontroller::class, 'index']);
Route::get('token/validate', [AuthController::class, 'verifyToken']);


