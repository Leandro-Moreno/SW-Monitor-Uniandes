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
          'name' => 'Jorge',
          'surname' => 'Jorge',
          'email' => 'je.peralta@uniandes.edu.co',
          'email_verified_at' => now(),
          'password' => Hash::make('111111'),
          'created_at' => now(),
          'updated_at' => now()
      ]);
    }
}
