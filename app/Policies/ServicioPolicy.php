<?php

namespace App\Policies;

use App\Model\Servicio;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Auth;

class ServicioPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(?User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Servicio  $servicio
     * @return mixed
     */
    public function view(?User $user, Servicio $servicio)
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
      if($user->isAdmin()){
        return true;
      }
      return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Servicio  $servicio
     * @return boolean
     */
    public function update(User $user, Servicio $servicio)
    {
      if($user->isAdmin()){
        return true;
      }
      return false;
    }
    /*
    * Policies para validar si su unidad o el usuario tiene permisos
    *
    *
    */
    // public function update(User $user, Servicio $servicio)
    // {
    //   $user_hosts = $user->hosts;
    //   $servicio_unidades = $servicio->unidades;
    //   if($servicio_unidades->contains($user->unidad)  ||  $user_hosts->contains(  $servicio )){
    //     $datos = $this->permisosServicioUnidades( $servicio_unidades, $user );
    //     if( $user_hosts->contains( $servicio ) ){
    //       $datos_usuario_host = $this->permisosUsuarioServicios(  $user_hosts, $servicio  );
    //       $datos = $datos->push(  $datos_usuario_host );
    //     }
    //     return $datos->contains(function (  $resultado  ){
    //       return $resultado->getOriginal('pivot_responsabilidad_tipos_id') == 2;
    //     });
    //   }
    //   return false;
    // }
    public function permisosServicioUnidades( $unidades, $user){
      $unidades  = $unidades->unique();
      $unidades  = $unidades->filter(function($unidad) use ($user){
        return $unidad->id==$user->unidad->id;
      });
      return $unidades;
    }
    public function permisosUsuarioServicios( $servicios, Servicio $servicio)
    {
      $servicios  = $servicios->unique();
      $servicios  = $servicios->filter(function(  $value) use ($servicio){
        return $value->id==$servicio->id;
      });
      return $servicios;
    }
    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Servicio  $servicio
     * @return mixed
     */
    public function delete(User $user, Servicio $servicio)
    {
      if($user->isAdmin()){
        return true;
      }
      return false;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Servicio  $servicio
     * @return mixed
     */
    public function restore(User $user, Servicio $servicio)
    {
      if($user->isAdmin()){
        return true;
      }
      return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Servicio  $servicio
     * @return mixed
     */
    public function forceDelete(User $user, Servicio $servicio)
    {
      if($user->isAdmin()){
        return true;
      }
      return false;
    }
}
