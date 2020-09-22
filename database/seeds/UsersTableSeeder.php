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
          'name' => 'Leandro',
          'surname' => 'Moreno',
          'email' => 'le.moreno910@uniandes.edu.co',
          'unidad_id' => '1',
          'rol_id' => '1',
          'email_verified_at' => now(),
          'password' => Hash::make('111111'),
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Edwin',
          'surname' => 'Lasso',
          'email' => 'elasso@uniandes.edu.co',
          'unidad_id' => '2',
          'email_verified_at' => now(),
          'password' => Hash::make('111111'),
          'created_at' => now(),
          'updated_at' => now()
      ]);
      DB::table('users')->insert([
          'name' => 'Jesús',
          'surname' => 'Rodriguez',
          'email' => 'j.rodriguez@uniandes.edu.co',
          'email_verified_at' => now(),
          'password' => Hash::make('111111'),
          'created_at' => now(),
          'updated_at' => now()
      ]);
      factory(App\User::class)->times(48)->create();
    }
}
