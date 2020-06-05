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
    public function index()
    {
        // $hosts  = $this->llamarApi();

      $hosts =  collect( $this->llamarApi())->filter(function ($value) {
                                              if (preg_match("/^([0-9]{1,3}\.){3}[0-9]{1,3}$/", $value["address"])==0) {
                                                  return $value;
                                              }
                                          })
                                          ->sortByDesc('last_time_down');
                                          // dd($hosts->first());
                                          //
                                          //
                                          //
                                          $api  = $this->llamarApi();
                                          foreach ($api as $servicio ) {
                                            $hostAlmacenar = Host::where('id_nagios',$servicio["@attributes"]["id"])->first();

                                            if(is_null($hostAlmacenar)){
                                              $hostAlmacenar = new Host;
                                              $hostAlmacenar->id_nagios  = $servicio["@attributes"]["id"];
                                              $hostAlmacenar->address  = $servicio["address"];
                                              $hostAlmacenar->name  = $servicio["name"];
                                              $hostAlmacenar->check_command = $servicio["check_command"];
                                            }

                                            $hostAlmacenar->current_state = $servicio["current_state"];
                                            $hostAlmacenar->last_time_up = $servicio["last_time_up"];
                                            $hostAlmacenar->last_time_down = $servicio["last_time_down"];
                                            $hostAlmacenar->save();
                                          }
                                          return view('hosts.index', ['hosts'=> $hosts]);
    }
    public function llamarApi()
    {
        $stack = HandlerStack::create();

        // Choose a cache strategy: the PrivateCacheStrategy is good to start with
        $cache_strategy_class = 'vendor\\Kevinrob\\GuzzleCache\\Strategy\\GreedyCacheStrategy';

        // Instantiate the cache storage: a PSR-6 file system cache with
        // a default lifetime of 1 minute (60 seconds).
        $stack->push(
          new CacheMiddleware(
                new GreedyCacheStrategy(
                  new FlysystemStorage(
                    new Local($_SERVER["DOCUMENT_ROOT"]."/tmp")
                ),
                  120
              )
            ),
          "cache"
          );

        $client = new \GuzzleHttp\Client();
        // Initialize the client with the handler option
        $client = new Client(['handler' => $stack]);

        $response = $client->request('GET', 'http://trini.uniandes.edu.co/nagiosxi/api/v1/objects/hoststatus?apikey=pm6pu99iemo6qqhignmkiupkmr984qnseqla2updihhcb2tqmic9e6q4u4c2r0r7&pretty=1');

        $resp=$response->getBody();
        $respuesta=json_decode($resp, true);
        $respuesta=$respuesta["hoststatuslist"]["hoststatus"];
        return $respuesta;
    }
}
