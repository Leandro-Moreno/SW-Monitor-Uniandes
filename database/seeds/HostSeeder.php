<?php

use Illuminate\Database\Seeder;

class HostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      /*1*/
      DB::table('hosts')->insert([
          'name' => 'soportadas02.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.237.93',
          'tipo_id' => '4',
          'description' => '',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*2*/
      DB::table('hosts')->insert([
          'name' => 'soportadas04.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.237.107',
          'tipo_id' => '4',
          'description' => 'Soportadas04 es el balanceador que corresponde a los servidores anonymous y anonymous2. Creados en 2014, con una version de php 5.6.',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*3*/
      DB::table('hosts')->insert([
          'name' => 'anonymous.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.50.59',
          'tipo_id' => '2',
          'servidor' => '2',/*Corresponde a soportadas04*/
          'description' => 'Soportadas04 es el balanceador que corresponde a los servidores anonymous y anonymous2. Creados en 2014, con una version de php 5.6.',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*4*/
      DB::table('hosts')->insert([
          'name' => 'anonymous2.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.50.240',
          'tipo_id' => '2',
          'servidor' => '2',/*Corresponde a soportadas04*/
          'description' => 'Soportadas04 es el balanceador que corresponde a los servidores anonymous y anonymous2. Creados en 2014, con una version de php 5.6.',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*5*/
      DB::table('hosts')->insert([
          'name' => 'soportadas05.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.237.109',
          'tipo_id' => '4',
          'description' => '',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*6*/
      DB::table('hosts')->insert([
          'name' => 'csdsit.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.237.154',
          'tipo_id' => '4',
          'description' => 'Balanceador',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*7*/
      DB::table('hosts')->insert([
          'name' => 'timbiqui.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.50.92',
          'tipo_id' => '2',
          'servidor' => '7',
          'description' => 'Soportadas04 corresponde a los servidores anonymous y anonymous2. Creados en 2014, con una version de php 5.6.',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*8*/
      DB::table('hosts')->insert([
          'name' => 'pelayo.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.50.117',
          'tipo_id' => '2',
          'servidor' => '1',
          'description' => '',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*9*/
      DB::table('hosts')->insert([
          'name' => 'pelayo2.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.50.116',
          'tipo_id' => '2',
          'servidor' => '1',
          'description' => '',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*10*/
      DB::table('hosts')->insert([
          'name' => 'pelayo3b.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.50.119',
          'tipo_id' => '2',
          'servidor' => '5',
          'description' => '',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*11*/
      DB::table('hosts')->insert([
          'name' => 'pelayo4.uniandes.edu.co',
          'description' => 'Sitio Web',
          'address' => '157.253.50.120',
          'tipo_id' => '2',
          'servidor' => '5',
          'description' => '',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*12*/
      DB::table('hosts')->insert([
          'name' => 'altamira.uniandes.edu.co',
          'description' => 'Base de datos',
          'address' => '157.253.51.151',
          'tipo_id' => '3',
          'description' => '',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*13*/
      DB::table('hosts')->insert([
          'name' => 'almeira.uniandes.edu.co',
          'description' => 'Base de datos',
          'address' => '157.253.51.152',
          'tipo_id' => '3',
          'description' => '',
          'created_at' => now(),
          'updated_at' => now()
      ]);
      /*14*/
      DB::table('hosts')->insert([
          'name' => 'Contenedoras - Azure',
          'description' => '',
          'address' => '40.91.124.139',
          'tipo_id' => '2',
          'description' => '',
          'created_at' => now(),
          'updated_at' => now()
      ]);

    }
}
