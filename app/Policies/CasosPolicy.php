<?php

namespace App\Policies;

use App\User;
use App\Model\Casos;
use App\Model\Host;
use Illuminate\Auth\Access\HandlesAuthorization;

class CasosPolicy
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
     * @param  \App\Model\Casos  $casos
     * @return mixed
     */
    public function view(?User $user, Casos $casos)
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
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Model\Casos  $casos
     * @return mixed
     */
    public function update(User $user, Casos $caso)
    {
      if($user->rol_id == 1 || $caso->usuarioSolicitante->id == $user->id){
        return true;
      }
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Model\Casos  $casos
     * @return mixed
     */
    public function delete(User $user, Casos $casos)
    {
      return true;
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Model\Casos  $casos
     * @return mixed
     */
    public function restore(User $user, Casos $casos)
    {
      return true;
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Model\Casos  $casos
     * @return mixed
     */
    public function forceDelete(User $user, Casos $casos)
    {
        //
    }
}
