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
    public function upload_image(Request $request){
        $validator=Validator::make($request->all(),['image'=>['required',File::image()->max(3*1024)]]);
        if($validator->fails()){
            return response ()->json($validator->messages());
        }
        $image= new Image();
        $file = $request->file('image');
        $filename = uniqid() . "_" . $file->getClientOriginalName();
        $file->move(public_path('public/images'),$filename);
        $url=URL::to('/') . '/public/images' . $filename;
        $image['url']=$url;
        $image->save();
        return response ()->json(['isSuccess'=>true,'url'=>$url]);

    }
}
