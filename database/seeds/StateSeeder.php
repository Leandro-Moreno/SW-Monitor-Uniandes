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
          'name' => 'Bien',
          'class' => 'success',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('states')->insert([
          'name' => 'Información',
          'class' => 'danger',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('states')->insert([
          'name' => 'Advertencia',
          'class' => 'warning',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('Crítico')->insert([
          'name' => 'Advertencia',
          'class' => 'warning',
          'created_at' => now(),
          'updated_at' => now()
      ]);
    }
}
