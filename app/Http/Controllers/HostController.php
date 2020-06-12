<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collecion;


use App\Model\Host;
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
    public function edit(Host $host)
    {
      dd($host);
        return view('hosts.edit', ['host' => $host]);
    }
}
