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
    public function indexUnico(Host $host){

      return view('hosts.indexUnico', ['host' => $host]);
    }
}
