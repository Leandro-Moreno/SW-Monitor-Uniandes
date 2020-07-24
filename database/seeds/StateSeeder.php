<?php

use Illuminate\Database\Seeder;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('states')->insert([
          'name' => 'activo',
          'class' => 'success',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('states')->insert([
          'name' => 'caido',
          'class' => 'danger',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('states')->insert([
          'name' => 'borrado',
          'class' => 'black',
          'created_at' => now(),
          'updated_at' => now()
      ]);
    }
}
