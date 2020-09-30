<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Searchable\Search;
use App\Model\Servicio;

class BuscarHost extends Controller
{
    /**
     * Devuelve los resultados de búsqueda
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $results = (new Search())
            ->registerModel(Servicio::class, 'name', 'serverAlias')
            ->search($request->input('query'));
            $results = $results->filter(function($datos){
              return $datos->searchable->tipodatos->estaHabilitado() == 1;
            });
        return response()->json($results);
    }
}
