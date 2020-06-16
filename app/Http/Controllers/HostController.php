<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collecion;
use Illuminate\Http\Request;

use App\Http\Requests\HostRequest;
use App\User;
use App\Model\Host;
use App\Model\HostType;
use Carbon\Carbon;

class HostController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
      $this->middleware('auth')->except(['index', 'show','sitiosWeb','servidores','database']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function index(Host $host)
    {

          $host =  $host::orderBy('last_time_down', 'DESC')->paginate(80);

      return view('hosts.index', ['hosts' => $host]);
    }
    public function show($name){
      $host = Host::where('name','=', $name)->firstOrFail();
      return view('hosts.show', ['host' => $host]);
    }
    /**
     * Muestra el formulario para editar el host.
     *
     * @param  \App\Model\Host  $host
     * @return \Illuminate\View\hosts\edit
     */
    public function edit($name, HostType $typos)
    {
      // dd($host);
      $host = Host::where('name','=', $name)->firstOrFail();
      $servidor = Host::where('tipo_id','=', '2')->get();
      $servidorBD = Host::where('tipo_id','=', '3')->get();
      $typos = HostType::all();
      $users = User::all();
      return view('hosts.edit', [ 'host' => $host, 'servidores' => $servidor,'servidoresBD' => $servidorBD, 'typos' => $typos, 'users' => $users ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Host  $host
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Host $host)
    {
      dd($request);
        isset($request->mostrar)?$host->mostrar = $request->mostrar:$host->mostrar = "1";
        $host->servidor = $request->servidor;
        $host->analytics = $request->analytics;
        $host->description = $request->description;
        $host->tipo_id = $request->tipo;
        // dd($host->mostrar);
        $host->save();
        return redirect()->route('hosts')->withStatus(__('Host actualizado con éxito.'));
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function sitiosWeb(Host $host){
      $host =  $host::where('tipo_id','=',1)->orderBy('last_time_down', 'DESC')->paginate(80);
// Host::where('name','=', $name)->firstOrFail();
  return view('hosts.index', ['hosts' => $host]);
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function servidores(Host $host){
      $host =  $host::where('tipo_id','=',2)->orderBy('last_time_down', 'DESC')->paginate(80);

  return view('hosts.index', ['hosts' => $host]);
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function database(Host $host){
      $host =  $host::where('tipo_id','=',3)->orderBy('last_time_down', 'DESC')->paginate(80);

  return view('hosts.index', ['hosts' => $host]);
    }

}
