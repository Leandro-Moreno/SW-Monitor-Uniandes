<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use League\Flysystem\Adapter\Local;
use Kevinrob\GuzzleCache\CacheMiddleware;
use Kevinrob\GuzzleCache\Strategy\GreedyCacheStrategy;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Kevinrob\GuzzleCache\Storage\FlysystemStorage;
use Illuminate\Support\Collecion;

use App\Model\Host;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
          $this->almacenarApiNagios();
            //
        })->everyMinute()
        ->appendOutputTo(storage_path('logs/inspire.log'));
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    public function almacenarApiNagios()
    {
        $api  = $this->llamarApi();
        foreach ($api as $servicio) {
            $hostAlmacenar = Host::where('name', $servicio["name"])->first();

            if (is_null($hostAlmacenar)) {
                $hostAlmacenar = new Host;
                $hostAlmacenar->id_nagios  = $servicio["@attributes"]["id"];
                $hostAlmacenar->address  = $servicio["address"];
                $hostAlmacenar->name  = $servicio["name"];
                $hostAlmacenar->check_command = $servicio["check_command"];
                if( strpos($servicio["name"], "dti-")!== false || strpos($servicio["name"], "dsit-")!== false){
                  $hostAlmacenar->mostrar = 2;
                }
                if(strpos($servicio["name"], "sql")!== false|| strpos($servicio["name"], "beora")!== false)
                {
                  $hostAlmacenar->tipo_id = 3; 
                }
            }

            $hostAlmacenar->current_state = $servicio["current_state"]==0?1:2;
            $hostAlmacenar->last_time_up = $servicio["last_time_up"];
            $hostAlmacenar->last_time_down = $servicio["last_time_down"];
            $hostAlmacenar->is_flapping  = $servicio["is_flapping"];
            $hostAlmacenar->save();
        }
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
        $response = $client->request('GET', config('app.nagios_api'));

        $resp=$response->getBody();
        $respuesta=json_decode($resp, true);
        $respuesta=$respuesta["hoststatuslist"]["hoststatus"];
        return $respuesta;
    }
}
