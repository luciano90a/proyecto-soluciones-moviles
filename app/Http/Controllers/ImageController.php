<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class ImageController extends Controller
{
    //
    public function upload_image(Request $request)
{
    $validator = Validator::make($request->all(), [
        'image' => ['required', File::image()->max(3 * 1024)],
    ]);

    if ($validator->fails()) {
        return response()->json(['isSuccess' => false, 'message' => 'Validation failed', 'errors' => $validator->messages()], 400);
    }

    if (!$request->hasFile('image')) {
        return response()->json(['isSuccess' => false, 'message' => 'No image provided'], 400);
    }

    $file = $request->file('image');

    // Verificar y validar el tipo de archivo si es necesario

    $filename = uniqid() . "_" . $file->getClientOriginalName();
    $file->move(public_path('public/images'), $filename);

    $url = URL::to('/') . '/public/images/' . $filename;

    $image = new Image();
    $image->url = $url;
    $image->save();

    return response()->json(['isSuccess' => true, 'url' => $url], 200);
}

}
