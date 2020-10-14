<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ServicioTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('servicio_type')->insert([
          'name' => 'Sitio Web',
          'description' => 'Sitio Web',
          'habilitado' => 2,
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('servicio_type')->insert([
          'name' => 'Servidor',
          'description' => 'Servidor',
          'habilitado' => 2,
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('servicio_type')->insert([
          'name' => 'Servidor Base Datos',
          'description' => 'Servidor Base Datos',
          'habilitado' => 2,
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('servicio_type')->insert([
          'name' => 'Balanceador',
          'description' => 'Balanceador',
          'habilitado' => 2,
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('servicio_type')->insert([
          'name' => 'Servicios',
          'description' => 'Servicios DSIT (MS TEAMS + CISCO ... )',
          'created_at' => now(),
          'updated_at' => now()
      ]);
    }
}
