<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCasosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('casos', function (Blueprint $table) {
            $table->id();
            $table->biginteger('servicio')->unsigned();
            $table->foreign('servicio')->references('id')->on('hosts');
            $table->biginteger('solicitante')->unsigned();
            $table->foreign('solicitante')->references('id')->on('users');
            $table->string("asunto");
            $table->string("descripcion");
            $table->biginteger('responsableAccion')->unsigned();
            $table->foreign('responsableAccion')->references('id')->on('users');
            $table->dateTime("fechaTomada")->default(now());
            $table->dateTime("fechaAccion")->nullable();
            $table->string("decision");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('decisiones');
    }
}
