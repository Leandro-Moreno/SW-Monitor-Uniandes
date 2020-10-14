<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();
Route::get('auth', 'Auth\LoginController@redirectToProvider');
Route::get('auth/callback', 'Auth\LoginController@handleProviderCallback');
Route::get('dash', function () {
    return view('dashboard');
});
Route::get('/', 'ServicioController@index')->name('servicios');


Route::get('/home', 'HomeController@index')->name('home');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');


// Route::get('host/{host}', 'HostController@indexUnico')->name('host');

Route::get('/sitios-web', 'ServicioController@sitiosWeb')->name('sitios-web');
Route::get('/servidores', 'ServicioController@servidores')->name('servidores');
Route::get('/bases-de-datos', 'ServicioController@database')->name('database');
Route::get('/servicios', 'ServicioController@index')->name('solo-servicios');

Route::resource('servicio', 'ServicioController');

Route::get('/alert/activas', 'AlertController@casoCerrado')->name('alerta-cerrada');
Route::get('/alert/semana', 'AlertController@alertasSemana')->name('alerta-semana');
Route::get('/alert/mes', 'AlertController@alertasMes')->name('alerta-mes');

Route::resource('alert', 'AlertController')->names([
    	'create' => 'alert.create',
    	'show' => 'alert.show',
    	'edit' => 'alert.edit',
    	'update' => 'alert.update',
		'destroy' => 'alert.destroy',
	]);


Route::group(['middleware' => 'auth'], function () {
  Route::get('/servicio/{servicio}/agregar-alerta','AlertController@agregarAlertaServicio')->name('agregarAlerta');
  Route::get('/servicio/import','ServicioController@importCreate')->name('importCreate');
  Route::post('/servicio/import','ServicioController@import')->name('import');
});

Route::group(['middleware' => 'auth'], function () {
	Route::resource('user', 'UserController', ['except' => ['show']]);
	Route::get('profile', ['as' => 'profile.edit', 'uses' => 'ProfileController@edit']);
	Route::put('profile', ['as' => 'profile.update', 'uses' => 'ProfileController@update']);
	Route::put('profile/password', ['as' => 'profile.password', 'uses' => 'ProfileController@password']);
});
