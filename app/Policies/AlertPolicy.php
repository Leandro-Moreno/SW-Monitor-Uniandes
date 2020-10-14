<?php

namespace App\Policies;

use App\User;
use App\Model\Alert;
use App\Model\Host;
use Illuminate\Auth\Access\HandlesAuthorization;

class AlertPolicy
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
     * @param  \App\Model\Alert  $alert
     * @return mixed
     */
    public function view(?User $user, Alert $alert)
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
     * @param  \App\Model\Alert  $alert
     * @return mixed
     */
    public function update(User $user, Alert $alert)
    {
      if($user->isAdmin()){
        return true;
      }
      return false;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Model\Alert  $alert
     * @return mixed
     */
    public function delete(User $user, Alert $alert)
    {
      return true;
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Model\Alert  $alert
     * @return mixed
     */
    public function restore(User $user, Alert $alert)
    {
      return true;
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Model\Alert  $alert
     * @return mixed
     */
    public function forceDelete(User $user, Alert $alert)
    {
        //
    }
}
