<?php

use Illuminate\Database\Seeder;

class UnidadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('unidads')->insert([
            'name' => 'DSIT',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('unidads')->insert([
            'name' => 'CedEx Sitios Web',
            'unidad_padre_id' => '1',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
