<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function responsabilidades()
    {
        return $this->hasMany('App\Model\Responsable');
    }
    public function hosts()
    {
      return $this->belongsToMany('App\Model\Host','responsables','user_id','host_id')->withPivot(["tipo","responsabilidad_tipos_id"]);
    }
    public function unidad()
    {
      return $this->belongsTo('App\Model\Unidad');
    }
    /**
    *
    * VAlida si el usuario tiene permisos como administrador
    *
    * @return boolean
    **/
    public function isAdmin()
    {
      return $this->role_id < 2;
    }
}
