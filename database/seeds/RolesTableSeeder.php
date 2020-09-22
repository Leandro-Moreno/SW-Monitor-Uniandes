<?php

use Illuminate\Database\Seeder;
use App\Rol;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $user = new Rol();
      $user->nombre="Administrador";
      $user->save();

      $user = new Rol();
      $user->nombre="Usuario";
      $user->save();
    }
}
