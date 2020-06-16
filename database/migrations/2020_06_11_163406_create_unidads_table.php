<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnidadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unidads', function (Blueprint $table) {
            $table->id();
            $table->longText('name');
            $table->biginteger('unidad_padre_id')->unsigned()->nullable();
            $table->foreign('unidad_padre_id')->references('id')->on('unidads');
            $table->biginteger('responsable1')->unsigned()->nullable();
            $table->foreign('responsable1')->references('id')->on('users');
            $table->biginteger('responsable2')->unsigned()->nullable();
            $table->foreign('responsable2')->references('id')->on('users');
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
        Schema::dropIfExists('unidads');
    }
}
