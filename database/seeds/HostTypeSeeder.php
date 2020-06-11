<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class HostTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('host_type')->insert([
          'nombre' => 'Sitio Web',
          'description' => 'Sitio Web',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('host_type')->insert([
          'nombre' => 'Servidor',
          'description' => 'Servidor',
          'created_at' => now(),
          'updated_at' => now()
      ]);
    }
}
