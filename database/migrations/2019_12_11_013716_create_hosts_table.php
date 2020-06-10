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
        Schema::create('hosts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_nagios');
            $table->longText('name');
            $table->string('address');
            $table->string('tag')->nullable();
            $table->integer('current_state')->default(0);
            $table->dateTime("last_time_up");
            $table->dateTime("last_time_down");
            $table->string("check_command");
            $table->integer("mostrar")->default(0);
            $table->integer("tipo")->default(1);
            $table->integer("is_flapping");
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
