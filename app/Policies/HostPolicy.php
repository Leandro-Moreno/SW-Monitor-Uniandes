<?php

namespace App\Policies;

use App\Model\Host;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Auth;

class HostPolicy
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
     * @param  \App\Host  $host
     * @return mixed
     */
    public function view(?User $user, Host $host)
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
      if($user->isAdmin() > 1){
        return false;
      }
      return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Host  $host
     * @return boolean
     */
    public function update(User $user, Host $host)
    {
      if($user->rol_id == 1){
        return true;
      }
      return false;
    }
    /*
    * Policies para validar si su unidad o el usuario tiene permisos
    *
    *
    */
    // public function update(User $user, Host $host)
    // {
    //   $user_hosts = $user->hosts;
    //   $host_unidades = $host->unidades;
    //   if($host_unidades->contains($user->unidad)  ||  $user_hosts->contains(  $host )){
    //     $datos = $this->permisosHostUnidades( $host_unidades, $user );
    //     if( $user_hosts->contains( $host ) ){
    //       $datos_usuario_host = $this->permisosUsuarioHosts(  $user_hosts, $host  );
    //       $datos = $datos->push(  $datos_usuario_host );
    //     }
    //     return $datos->contains(function (  $resultado  ){
    //       return $resultado->getOriginal('pivot_responsabilidad_tipos_id') == 2;
    //     });
    //   }
    //   return false;
    // }
    public function permisosHostUnidades( $unidades, $user){
      $unidades  = $unidades->unique();
      $unidades  = $unidades->filter(function($unidad) use ($user){
        return $unidad->id==$user->unidad->id;
      });
      return $unidades;
    }
    public function permisosUsuarioHosts( $hosts, Host $host)
    {
      $hosts  = $hosts->unique();
      $hosts  = $hosts->filter(function(  $value) use ($host){
        return $value->id==$host->id;
      });
      return $hosts;
    }
    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Host  $host
     * @return mixed
     */
    public function delete(User $user, Host $host)
    {
      if($user->rol_id > 1){
        return false;
      }
      return true;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Host  $host
     * @return mixed
     */
    public function restore(User $user, Host $host)
    {
      if($user->rol_id > 1){
        return false;
      }
      return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Host  $host
     * @return mixed
     */
    public function forceDelete(User $user, Host $host)
    {
      if($user->rol_id > 1){
        return false;
      }
      return true;
    }
}
