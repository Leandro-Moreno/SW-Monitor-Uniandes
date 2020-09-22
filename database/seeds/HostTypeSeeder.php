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
          'name' => 'Sitio Web',
          'description' => 'Sitio Web',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('host_type')->insert([
          'name' => 'Servidor',
          'description' => 'Servidor',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('host_type')->insert([
          'name' => 'Servidor Base Datos',
          'description' => 'Servidor Base Datos',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('host_type')->insert([
          'name' => 'Balanceador',
          'description' => 'Balanceador',
          'created_at' => now(),
          'updated_at' => now()
      ]);
    }
}
