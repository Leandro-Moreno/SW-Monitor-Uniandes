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
            $table->biginteger('host_id')->unsigned();
            $table->foreign('host_id')->references('id')->on('hosts');
            $table->biginteger('solicitante')->unsigned();
            $table->foreign('solicitante')->references('id')->on('users');
            $table->string("asunto");
            $table->integer("estado")->default(1);
            $table->longText("descripcion");
            $table->biginteger('responsableAccion')->unsigned()->nullable();
            $table->foreign('responsableAccion')->references('id')->on('users');
            $table->dateTime("fechaTomada")->nullable();
            $table->dateTime("fechaAccion")->nullable();
            $table->longText("accion")->nullable();
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
        Schema::dropIfExists('casos');
    }
}
