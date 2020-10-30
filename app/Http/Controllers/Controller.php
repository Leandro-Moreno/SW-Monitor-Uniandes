<?php

namespace App\Http\Controllers;

use Intervention\Image\Facades\Image;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function validarCarpetaImagenes()
    {
      if(!Storage::exists('/public/servicios')) {
          Storage::makeDirectory('/public/servicios', 0775, true); //creates directory
      }
      if(!Storage::exists('/public/servicios-300')) {
          Storage::makeDirectory('/public/servicios-300', 0775, true); //creates directory
      }
    }
    public function crearImagenReducida($request, $nombreImagen)
    {
      $this->validarCarpetaImagenes();
      $image_resize = Image::make( $request->file('imagen') );
      $image_resize->fit(100, 100);
      $image_resize->save(public_path('storage/servicios-300/' . $nombreImagen));
    }
    public function crearImagenNormal($request, $nombreImagen)
    {
      $this->validarCarpetaImagenes();
      $image_resize = Image::make( $request->file('imagen') );
      $image_resize->fit(500, 500);
      $image_resize->save(public_path('storage/servicios/' . $nombreImagen));
    }
}
