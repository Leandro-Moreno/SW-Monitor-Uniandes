<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicioTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('servicio_type', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("name");
            $table->longText('description');
            $table->integer('habilitado')->default(1);
            $table->timestamps();
        });
    }

    /**..
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('servicio_type');
    }
}
