<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Searchable\Search;
use App\Model\Host;

class BuscarHost extends Controller
{
    /**
     * Devuelve los resutlados de búsqueda
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $results = (new Search())
            ->registerModel(Host::class, 'name', 'serverAlias')
            ->search($request->input('query'));
        return response()->json($results);
    }
}
