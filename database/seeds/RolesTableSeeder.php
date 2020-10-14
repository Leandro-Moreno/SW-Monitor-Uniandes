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
      DB::table('roles')->insert([
          'nombre' => 'Super Administrador',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('roles')->insert([
          'nombre' => 'Administrador',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('roles')->insert([
          'nombre' => 'Usuario',
          'created_at' => now(),
          'updated_at' => now()
      ]);
    }
}
