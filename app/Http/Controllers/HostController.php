<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use League\Flysystem\Adapter\Local;
use Kevinrob\GuzzleCache\CacheMiddleware;
use Kevinrob\GuzzleCache\Strategy\GreedyCacheStrategy;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Kevinrob\GuzzleCache\Storage\FlysystemStorage;
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
          $host =  $host->all()
          ->sortByDesc('last_time_down');

      return view('hosts.index', ['hosts' => $host]);
    }
    public function indexUnico(Host $host){
      // $host = Host::firstWhere('id', $host["id"]);
      // dd($host);

      // dd($host[0]["last_time_up"]->format('M-D-Y '));
      // dd($host);

      return view('hosts.indexUnico', ['host' => $host]);
    }
}
