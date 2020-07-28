<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDecisionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('decisiones', function (Blueprint $table) {
            $table->id();
            $table->biginteger('sitioWeb')->unsigned();
            $table->foreign('sitioWeb')->references('id')->on('hosts');
            $table->biginteger('responsableDecision')->unsigned();
            $table->foreign('responsableDecision')->references('id')->on('users');
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
