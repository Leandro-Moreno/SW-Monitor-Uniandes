<?php

namespace App\Http\Controllers;

use Auth;
use App\Model\Alert;
use App\Model\Servicio;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Alert::class);
        $this->middleware('auth')->except(['index', 'show', 'alertasMes', 'casoCerrado', 'alertasSemana']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $currentPage = request()->get('page',1);
      $alertas = cache()->remember('alertas'.$currentPage,1, function(){
        $hoy = now();
        $fin_semana = now()->endOfWeek();
        return Alert::whereBetween('fechaInicio', [$hoy, $fin_semana])
                    ->orWhereBetween('fechaFin', [$hoy, $fin_semana])
                    ->with('servicio')
                    ->orderBy('created_at', 'ASC')
                    ->paginate(80);
      });
      return view('alertas.index', ['alertas' => $alertas]);
    }
    public function casoCerrado()
    {
      $currentPage = request()->get('page',1);
      $alertas = cache()->remember('alertas-activas'.$currentPage, 60,function(){
        $fecha_actual = now();
        return Alert::whereDate('fechaInicio', '<', $fecha_actual)
        ->whereDate('fechaFin', '>=', $fecha_actual)
        ->with('host')
        ->orderBy('created_at', 'ASC')
        ->paginate(80);
      });
      return view('alertas.index', ['alertas' => $alertas]);
    }
    public function alertasSemana()
    {
      $currentPage = request()->get('page',1);
      $alertas = cache()->remember('alertas-semana'.$currentPage,1, function(){
        $inicio_semana = now()->startOfWeek();
        $fin_semana = now()->endOfWeek();
        return Alert::whereBetween('fechaInicio', [$inicio_semana, $fin_semana])
                    ->orWhereBetween('fechaFin', [$inicio_semana, $fin_semana])
                    ->with('servicio')
                    ->orderBy('created_at', 'ASC')
                    ->paginate(80);
      });
      return view('alertas.index', ['alertas' => $alertas]);
    }
    public function alertasMes()
    {
      $currentPage = request()->get('page',1);
      $alertas = cache()->remember('alertas-semana'.$currentPage,1, function(){
        $inicio_mes = now()->startOfMonth();
        $fin_mes = now()->endOfMonth();
        return Alert::whereBetween('fechaInicio', [$inicio_mes, $fin_mes])
                    ->orWhereBetween('fechaFin', [$inicio_mes, $fin_mes])
                    ->with('servicio')
                    ->orderBy('created_at', 'ASC')
                    ->paginate(80);
      });
      return view('alertas.index', ['alertas' => $alertas]);
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
    public function agregarAlertaServicio(Servicio $servicio)
    {
      return view('servicios.create-caso', ['servicio' => $servicio]);
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
        // dd($input);
        $caso = new Alert();
        $caso->fill($input);
        $caso->creador = Auth::id();
        // $caso->create($input);
        $caso->save();
        // dd($caso);
        return redirect()->route('servicio.show',$caso->servicio)->withStatus(__('Alerta creada con éxito.'));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Decisiones  $decisiones
     * @return \Illuminate\Http\Response
     */
    public function show(Alert $alert)
    {
        return view('alertas.show', ['alerta' => $alert]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Alert  $decisiones
     * @return \Illuminate\Http\Response
     */
    public function edit(Alert $alert)
    {
        return view('alertas.edit', ['alerta' => $alert]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Decisiones  $decisiones
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Alert $alerta)
    {
        $datos = $request->all();
        $user = Auth::user();
        $datos['responsableAccion'] = $user->id;
        $datos['fechaAccion'] = now()->toDateTimeString();
        $alerta->fill($datos);
        // dd($datos);
        $alerta->save();
        return redirect('caso')->with('status', 'Alerta '.$alerta->id.' actualizada con éxito.');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Decisiones  $decisiones
     * @return \Illuminate\Http\Response
     */
    public function destroy(Alert $alerta)
    {
        //
    }
}
