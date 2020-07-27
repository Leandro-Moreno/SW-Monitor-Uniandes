<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Searchable\Search;
use App\Model\Host;

class BuscarHost extends Controller
{
    public function index(Request $request)
    {
        $results = (new Search())
            ->registerModel(Host::class, 'name')
            ->search($request->input('query'));

        return response()->json($results);
    }
}
