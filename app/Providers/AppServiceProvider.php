<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
      // Configuración para fechas en español
      Carbon::setUTF8(true);
      Carbon::setLocale(config('app.locale'));
      setlocale(LC_ALL, 'es_MX', 'es', 'ES', 'es_MX.utf8');

      if($this->app->environment('production')) {
          \URL::forceScheme('https');
      }
    }
}
