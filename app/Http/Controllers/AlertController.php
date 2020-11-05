<?php

namespace App\Http\Controllers;

use Auth;
use Carbon\Carbon;
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
    public function alertasActivasEnRango($fecha_inicial, $fecha_final, $pagina){
      return cache()->remember('alertas'.$fecha_inicial.$fecha_final.$pagina,60*5, function() use ($fecha_inicial, $fecha_final){
        return Alert::whereBetween('fechaInicio', [$fecha_inicial, $fecha_final])
                    ->orWhereBetween('fechaFin', [$fecha_inicial, $fecha_final])
                    ->orWhere(function($query) use($fecha_inicial){
                      $query->where('fechaInicio','<',$fecha_inicial)
                            ->whereNull('fechaFin');
                    })
                    ->with('servicio')
                    ->orderBy('created_at', 'ASC')
                    ->paginate(15);
      });
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $currentPage = request()->get('page',1);
      $hoy = today();
      $fin_semana = today()->endOfWeek();
      $alertas = $this->alertasActivasEnRango($hoy, $fin_semana, $currentPage);
      return view('alertas.index', ['alertas' => $alertas,'antes' => $hoy, 'despues' => $fin_semana, 'alertaActiva' => "index"]);
    }
    /*
    */
    public function alertasSemana()
    {
      $currentPage = request()->get('page',1);
      $dias_antes = now()->sub(7,'day');
      $mañana = now()->tomorrow();
      $alertas = $this->alertasActivasEnRango($dias_antes, $mañana, $currentPage);
      return view('alertas.index', ['alertas' => $alertas,'antes' => $dias_antes, 'despues' => $mañana, 'alertaActiva' => "semana"]);
    }
    /*alertasUltimos30Dias*/
    public function alertasMes()
    {
      $currentPage = request()->get('page',1);
      $dias_antes = today()->sub(30,'day');
      $mañana = today();
      $alertas = $this->alertasActivasEnRango($dias_antes, $mañana, $currentPage);
      return view('alertas.index', ['alertas' => $alertas,'antes' => $dias_antes, 'despues' => $mañana, 'alertaActiva' => "mes"]);
    }
    public function alertasMes2()
    {
      $currentPage = request()->get('page',1);
      $inicio_mes = now()->startOfMonth();
      $fin_mes = now()->endOfMonth();
      $alertas = $this->alertasActivasEnRango($inicio_mes, $fin_mes, $currentPage);
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
        $caso = new Alert();
        $caso->fill($input);
        $caso->creador = Auth::id();
        $caso->save();
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
    public function update(Request $request, Alert $alert)
    {
        $datos = $request->all();
        $user = Auth::user();
        $datos['responsableAccion'] = $user->id;
        $datos['fechaAccion'] = now()->toDateTimeString();
        $alert->fill($datos);
        // dd($datos);
        $alert->save();
        return redirect('alert')->with('status', 'Alerta '.$alert->id.' actualizada con éxito.');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Decisiones  $decisiones
     * @return \Illuminate\Http\Response
     */
    public function destroy(Alert $alert)
    {
        $alert->delete();
        return redirect()->route('alert.index')->withStatus(__('Alerta eliminada con éxito.'));
    }
}
