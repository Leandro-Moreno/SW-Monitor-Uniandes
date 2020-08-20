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

Route::get('/', 'HostController@index')->name('hosts');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');


// Route::get('host/{host}', 'HostController@indexUnico')->name('host');

Route::get('/sitios-web', 'HostController@sitiosWeb')->name('sitios-web');
Route::get('/servidores', 'HostController@servidores')->name('servidores');
Route::get('/bases-de-datos', 'HostController@database')->name('database');
Route::get('host/import','HostController@importCreate')->name('importCreate');
Route::post('host/import','HostController@import')->name('import');
Route::resource('host', 'HostController');
Route::get('buscar', 'BuscarHost@index')->name('buscar');


  Route::resource('resource', 'Controller', [
             'except' => [
                 'index',
                 'show'
             ]
         ])
         ->middleware(['auth']);



Route::group(['middleware' => 'auth'], function () {
	Route::resource('user', 'UserController', ['except' => ['show']]);
	Route::get('profile', ['as' => 'profile.edit', 'uses' => 'ProfileController@edit']);
	Route::put('profile', ['as' => 'profile.update', 'uses' => 'ProfileController@update']);
	Route::put('profile/password', ['as' => 'profile.password', 'uses' => 'ProfileController@password']);
});
