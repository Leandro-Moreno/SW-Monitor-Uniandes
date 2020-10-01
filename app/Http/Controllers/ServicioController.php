<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collecion;
use Illuminate\Http\Request;
use Illuminate\Http\File;

use App\Http\Requests\ServicioRequest;
use App\User;
use App\Model\Servicio;
use App\Model\ServicioType;
use App\Model\Responsable;
use App\Model\State;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

use App\Imports\ServiciosImport;
use Maatwebsite\Excel\Facades\Excel;



class ServicioController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Servicio::class);
        $this->middleware('auth')->except(['index', 'show','sitiosWeb','servidores','database', 'soloServicio']);
    }

    /**
     * Show the application dashboard.
     * @param Servicio  $servicio
     * @return \Illuminate\View\View
     */
    public function index(Servicio $servicio)
    {
        $currentPage = request()->get('page',1);
        $servicios = cache()->remember('servicios'.$currentPage, 5,function(){
          return Servicio::where('mostrar','1')
                    ->whereHas('tipodatos', function($q){
                      $q->where('habilitado',1);
                    })
                    ->orderBy('last_time_down', 'DESC')
                    ->paginate(80);
        });
        return view('servicios.index', ['servicios' => $servicios]);
    }

    /**
     * @param string $name
     * @return \Illuminate\View\View
     */
    public function show( Servicio $servicio )
    {
        $servidor = new Servicio;
        $servicios = new Servicio;
        $serviciosServidor = new Servicio;
        // dd($servicio);
        /*
         * Valida si el servicio no es un Sitio Web.
         * Los servidores, balanceadores
         * y bases de datos pueden tener otros Servicio hijos
         */
        if( $servicio->tipo_id  !=  1 ){
          $servicios  = $this->buscarServiciosHijos(  $servicio );
          $filtroNagios = $servicios->countBy(function ($servicio) {
                return isset( $servicio['id_nagios'] )?"si":"no";
            });
            /*
            * Se convierte a array para no agregar valor tipo colección
            */
            $servicio->nagios = isset($filtroNagios->si)?$filtroNagios->toArray():array("si"=>0,"no"=>0);
        }
          // $servidor = $servicio->servidorBDDatos;
          $servidor = $servicio->servidorDatos;
        return view('servicios.show', ['servicio' => $servicio , 'servidor' => $servidor, 'servicios' => $servicios]);
    }
    /**
     * Muestra el formulario para editar el servicio.
     *
     * @param  string $name
     * @param  \App\Model\Servicio  $servicio
     * @return \Illuminate\View\servicios\edit
     */
    public function edit(Servicio $servicio, ServicioType $typos)
    {
        $servidor = Servicio::where('tipo_id', '2')->orWhere('tipo_id', '4')->orderBy('name', 'asc')->get();
        $servidorBD = Servicio::where('tipo_id', '3')->orderBy('name', 'asc')->get();
        $typos = ServicioType::where('habilitado', 1)->get();
        $states = State::get();
        // dd($servidor[1]->responsable());
        $users = User::all();
        $responsables = Responsable::where('servicio_id', $servicio->id)->get();
        // dd($responsables);
        return view('servicios.edit', [ 'servicio' => $servicio,
                                        'states' => $states,
                                        'servidores' => $servidor,
                                        'servidoresBD' => $servidorBD,
                                        'typos' => $typos,
                                        'users' => $users,
                                        'responsables' => $responsables
                                      ]);
    }
    public function buscarServiciosHijos(Servicio $servicio){
      $servicios = $servicio->serviciosHijos;
      /*
      *Se filtran todos los servicio del servidor que tambien son un servidor.
      */
      $serviciosServidor = $servicios->filter(function($value, $servicio){
        return $value['tipo_id']  !=  1;
      });

      if( isset($serviciosServidor)  )
      {
        foreach ( $serviciosServidor as $servHijo ) {
          $servicios = $servicios->merge($servHijo->serviciosHijos);
        }
      }
      $servicios  = $servicios->sortByDesc('last_time_down');
      return $servicios;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Servicio  $servicio
     * @return \Illuminate\Http\Response
     */
    public function update(ServicioRequest $request, Servicio $servicio)
    {
        $datos = $request->all();
        // dd($datos);
        $datos['mostrar'] = isset($datos['mostrar'])?$datos['mostrar']:"2";
        if(isset($datos['tipo'])){
          $datos['tipo_id'] = $datos['tipo'];
        }
        if (array_key_exists("imagen",$datos)) {
            $this->validarCarpetaImagenes();
            $imagen = $datos['imagen'];
            $nombreImagen = $request->file('imagen')->getClientOriginalName();
            $nombreImagen = $servicio->id."-".\Str::random(3)."-".$nombreImagen;
            $datos['imagen'] = $nombreImagen;
            $this->crearImagenReducida( $request, $nombreImagen );
            $this->crearImagenNormal($request, $nombreImagen);
        }
        $servicio->update($datos);
        return redirect()->route('servicio.show',$servicio)->withStatus(__('Servicio actualizado con éxito.'));
    }

    public function updateResponsable(int $servicio_id, int $user_id)
    {
        $responsable = new Responsable;
        $responsable->servicio_id  = $servicio_id;
        $responsable->user_id  = $user_id;
        $responsable->save();
    }
    /**
     * Show the application dashboard.
     *
     * @param \App\Model\Servicio  $servicio
     * @return \Illuminate\View\View
     */
    public function sitiosWeb(Servicio $servicio)
    {
        $servicio =  $servicio::where('tipo_id', '=', 1)->orderBy('last_time_down', 'DESC')->paginate(80);
        // Servicio::where('name','=', $name)->firstOrFail();
        return view('servicios.index', ['servicios' => $servicio]);
    }
    /**
     * Muestra todos los servidores
     *
     * @param \App\Model\Servicio  $servicio
     * @return \Illuminate\View\View
     */
    public function servidores(Servicio $servicio)
    {
        $servicio =  $servicio::where('tipo_id', '=', 2)->orWhere('tipo_id', '=', '4')->orderBy('last_time_down', 'DESC')->paginate(80);

        return view('servicios.index', ['servicios' => $servicio]);
    }
    /**
     * Show the application dashboard.
     *
     * @param \App\Model\Servicio  $servicio
     * @return \Illuminate\View\View
     */
    public function database(Servicio $servicio)
    {
        $servicio =  $servicio::where('tipo_id', '=', 3)->orderBy('last_time_down', 'DESC')->paginate(80);

        return view('servicios.index', ['servicios' => $servicio]);
    }
    /**
     * Muestra Servicios con solo el tipo de Servicio
     *
     * @param \App\Model\Servicio  $servicio
     * @return \Illuminate\View\View
     */
    public function soloServicio(Servicio $servicio)
    {
        $servicio =  $servicio::where('tipo_id', 5)->orderBy('last_time_down', 'DESC')->paginate(80);

        return view('servicios.index', ['servicios' => $servicio]);
    }
    public function import(){
      $asistentes = Excel::import(new ServiciosImport, request()->file('file'));
      dd($asistentes);
      return back();
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function store(ServicioRequest $request)
    {
      $datos = $request->all();
      // dd($datos);
      if(isset($datos['tipo'])){
        $datos['tipo_id'] = $datos['tipo'];
      }
      if (array_key_exists("imagen",$datos)) {
          $imagen = $datos['imagen'];
          $nombreImagen = $request->file('imagen')->getClientOriginalName();
          $nombreImagen = \Str::random(3)."-".$nombreImagen;
          $datos['imagen'] = $nombreImagen;
          $this->crearImagenReducida( $request, $nombreImagen );
          $this->crearImagenNormal($request, $nombreImagen);
      }
      $servicio = Servicio::create($datos);
      return redirect()->route('servicio.show',$servicio)->withStatus(__('Servicio creado con éxito.'));

    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function importCreate()
    {
        return view('servicios.import');
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function create()
    {
        $typos = ServicioType::where('habilitado', 1)->get();
        return view('servicios.create', ['typos' => $typos]);
    }
}
