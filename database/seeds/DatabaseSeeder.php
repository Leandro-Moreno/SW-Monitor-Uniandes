<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([RolesTableSeeder::class]);
        $this->call([TipoResponsabilidadSeeder::class]);
        $this->call([UnidadSeeder::class]);
        $this->call([StateSeeder::class]);
        $this->call([UsersTableSeeder::class]);
        $this->call([ServicioTypeSeeder::class]);
        $this->call([ServicioSeeder::class]);
        $this->call([ResponsablesSeeder::class]);
        $this->call([AlertSeeder::class]);
    }
}
