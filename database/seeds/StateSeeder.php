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
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('states')->insert([
          'name' => 'caido',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('states')->insert([
          'name' => 'borrado',
          'created_at' => now(),
          'updated_at' => now() 
      ]);
    }
}
