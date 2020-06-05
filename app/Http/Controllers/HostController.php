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

      $hosts =  collect(
                        $this->llamarApi())
                                          ->filter(function ($value) {
                                              if (preg_match("/^([0-9]{1,3}\.){3}[0-9]{1,3}$/", $value["address"])==0) {
                                                  return $value;
                                              }
                                          })
                                          ->sortByDesc('current_state');
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
