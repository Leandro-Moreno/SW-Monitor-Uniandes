<?php

use Illuminate\Database\Seeder;

class AlertSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('alertas')->insert([
          'asunto' => 'Alerta de prueba 1',
          'descripcion' => 'Se va a actualizar la base de datos de banner',
          'servicio_id' => '23',
          'creador' => '1',
          'fechaInicio' => now()->subDays(3),
          'fechaFin' => now()->addDays(5),
          'created_at' => now(),
          'updated_at' => now()
      ]);
    }
}
