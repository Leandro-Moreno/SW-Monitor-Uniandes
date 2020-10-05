<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('users')->insert([
          'name' => 'Leandro Moreno',
          'email' => 'le.moreno910@uniandes.edu.co',
          'unidad_id' => '1',
          'rol_id' => '2',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '1',
          'password' => Hash::make('111111'),
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Edwin Lasso',
          'email' => 'elasso@uniandes.edu.co',
          'unidad_id' => '2',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Adriana Hernandez',
          'email' => 'adherna@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);

      DB::table('users')->insert([
          'name' => 'Ana Carrillo',
          'email' => 'am.carrillo@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Andres Moreno',
          'email' => 'andmoren@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Carlos Herrera',
          'email' => 'c.herrerav@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Cesar Zuluaga',
          'email' => 'czuluaga@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Cielo Oviedo',
          'email' => 'coviedo@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Cindy Hernandez',
          'email' => 'cv.hernandez@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Daiana Paez',
          'email' => 'dr.paez@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Diana Garzon',
          'email' => 'dc.garzon@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Diana Melo',
          'email' => 'dianamelo@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Edel Amaya',
          'email' => 'eamaya@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Elkin Burgos',
          'email' => 'eburgos@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'German Reyes',
          'email' => 'ga.reyes@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Johana Rodriguez',
          'email' => 'jc.rodriguezp@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Juan Arevalo',
          'email' => 'jc.arevalo@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Karen Perez',
          'email' => 'kjperezg@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Laura Gonzalez',
          'email' => 'ln.gonzalez138@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Luis Rojas',
          'email' => 'la.rojasg@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Luz Millan',
          'email' => 'lmillan@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Maria Lastra',
          'email' => 'mlastra@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Omar Talero',
          'email' => 'otalero@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Vanessa Perez',
          'email' => 'va-perez@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Cinthya Sanchez',
          'email' => 'cc.sanchez65@uniandes.edu.co',
          'email_verified_at' => now(),
          'unidad_id' => '1',
          'rol_id' => '2',
          'password' => 'a',
          'created_at' => now(),
          'updated_at' => now()
      ]);
    }
}
