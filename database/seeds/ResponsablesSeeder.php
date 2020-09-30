<?php

use Illuminate\Database\Seeder;

class ResponsablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('responsables')->insert([
            'servicio_id' => '1',
            'unidad_id' => '1',
            'tipo' => '2',
            'responsabilidad_tipos_id' => '2',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('responsables')->insert([
            'servicio_id' => '2',
            'unidad_id' => '1',
            'tipo' => '2',
            'responsabilidad_tipos_id' => '2',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('responsables')->insert([
            'servicio_id' => '2',
            'user_id' => '1',
            'tipo' => '1',
            'responsabilidad_tipos_id' => '2',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('responsables')->insert([
            'servicio_id' => '2',
            'user_id' => '1',
            'tipo' => '1',
            'responsabilidad_tipos_id' => '1',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
