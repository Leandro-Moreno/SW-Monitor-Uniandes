<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hosts',
            function (Blueprint $table) {
                // nagiosxi
                $table->bigIncrements('id');
                $table->integer('id_nagios')->nullable();
                $table->longText('name')->nullable();
                $table->string('address')->nullable();
                $table->string('tag')->nullable();
                $table->dateTime("last_time_up")->nullable();
                $table->dateTime("last_time_down")->nullable();
                $table->string("check_command")->nullable();
                $table->integer("mostrar")->default(0)->nullable();
                $table->integer("is_flapping")->default(0)->nullable();
                $table->longText("serverAlias")->nullable();
                // $table->biginteger('unidad_id')->unsigned()->nullable();
                // $table->foreign('unidad_id')->references('id')->on('unidads');
                $table->biginteger('current_state')->unsigned()->default(1)->nullable();
                $table->foreign('current_state')->references('id')->on('states');

                $table->biginteger('tipo_id')->unsigned()->default(1)->nullable();
                $table->foreign('tipo_id')->references('id')->on('host_type');
                $table->biginteger('servidor_bd')->unsigned()->nullable();
                $table->foreign('servidor_bd')->references('id')->on('hosts');
                $table->biginteger('servidor')->unsigned()->nullable();
                $table->foreign('servidor')->references('id')->on('hosts');
                $table->string("analytics")->nullable();
                $table->longText('description')->nullable();
                $table->dateTime("creacion")->nullable();

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
        Schema::dropIfExists('hosts');
    }
}
