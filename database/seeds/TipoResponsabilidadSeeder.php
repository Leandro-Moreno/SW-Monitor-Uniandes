<?php

use Illuminate\Database\Seeder;

class TipoResponsabilidadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('responsabilidades_tipos')->insert([
            'nombre' => 'funcional',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('responsabilidades_tipos')->insert([
            'nombre' => 'tecnico',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
