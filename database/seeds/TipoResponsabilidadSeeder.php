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
            'name' => 'funcional',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('responsabilidades_tipos')->insert([
            'name' => 'tecnico',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
