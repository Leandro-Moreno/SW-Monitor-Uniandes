<?php

namespace App\Http\Controllers\Auth;

use Auth;
use Socialite;
use App\User;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider()
    {
        return Socialite::with('microsoft')->setTenantId('fabd047c-ff48-492a-8bbb-8f98b9fb9cca')->redirect();
    }
    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
     public function handleProviderCallback()
     {
         $user = Socialite::driver('microsoft')->user();
         dd($user);
         $givenName  =  explode(" ", $user->user["givenName"]);
         $surname  =  explode(" ", $user->user["surname"]);
         $jobTitle  = $user->user["jobTitle"];
         $usuario = User::where('email',$user->email)
                           ->first();
         if (!$usuario) {
           session()->flash('message', 'Usuario no existe');
           return redirect('login');
         }
         $usuario->update(array(
                             'name' => $givenName[0],
                             'name2' => $givenName[1],
                             'apellido' => $surname[0],
                             'apellido2' => $surname[1],
                             'cargo' => $jobTitle,
                           ));
         $user = User::where('email',$user->email)->first();
         if ($user) {
           Auth::login($user);
         }
         else{
           $usuario->create(array(
                               'name' => $givenName[0],
                               'name2' => $givenName[1],
                               'apellido' => $surname[0],
                               'apellido2' => $surname[1],
                               'cargo' => $jobTitle,
                             ));
           Auth::login($usuario);
         }
         return redirect($this->redirectTo);
     }
}
