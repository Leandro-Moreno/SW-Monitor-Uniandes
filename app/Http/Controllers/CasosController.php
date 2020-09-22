<?php

namespace App\Http\Controllers;

use Auth;
use App\Model\Casos;
use App\Model\Host;
use Illuminate\Http\Request;

class CasosController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Casos::class, 'caso');
        $this->middleware('auth')->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $currentPage = request()->get('page',1);
        $casos = cache()->remember('casos'.$currentPage, 60,function(){
          return Casos::where('estado','1')->with('host')->orderBy('created_at', 'ASC')->paginate(80);
        });
        return view('casos.index', ['casos' => $casos]);
    }
    public function casoCerrado()
    {
      $currentPage = request()->get('page',1);
      $casos = cache()->remember('casos-cerrados'.$currentPage, 60,function(){
        return Casos::where('estado','2')->with('host')->orderBy('created_at', 'ASC')->paginate(80);
      });
      return view('casos.index', ['casos' => $casos]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    public function agregarCasoHost(Host $host)
    {
      return view('hosts.create-caso', ['host' => $host]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $caso = new Casos();
        $caso->fill($input);
        $caso->solicitante = Auth::id();
        $caso->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Decisiones  $decisiones
     * @return \Illuminate\Http\Response
     */
    public function show(Casos $caso)
    {
        return view('casos.show', ['caso' => $caso]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Casos  $decisiones
     * @return \Illuminate\Http\Response
     */
    public function edit(Casos $caso, Host $host)
    {
        return view('casos.edit', ['caso' => $caso]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Decisiones  $decisiones
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Casos $caso)
    {
        $datos = $request->all();
        $user = Auth::user();
        $datos['responsableAccion'] = $user->id;
        $datos['fechaAccion'] = now()->toDateTimeString();
        $caso->fill($datos);
        // dd($datos);
        $caso->save();
        return redirect('caso')->with('status', 'Caso '.$caso->id.' actualizado con éxito.');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Decisiones  $decisiones
     * @return \Illuminate\Http\Response
     */
    public function destroy(Casos $caso)
    {
        //
    }
}
