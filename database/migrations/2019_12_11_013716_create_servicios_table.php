<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiciosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('servicios',
            function (Blueprint $table) {
                // nagiosxi
                $table->id();
                $table->integer('id_nagios')->nullable();
                $table->string('name',255)->unique();
                $table->foreignId('tipo_id')->nullable()->default(1)->constrained('servicio_type');
                $table->string("imagen")->nullable();
                $table->longText('description')->nullable();
                $table->string('address')->nullable();
                $table->string('tag')->nullable();
                $table->dateTime("last_time_up")->nullable();
                $table->dateTime("last_time_down")->nullable();
                $table->string("check_command")->nullable();
                $table->integer("mostrar")->default(1);
                $table->integer("is_flapping")->default(0)->nullable();
                $table->longText("serverAlias")->nullable();

                $table->foreignId('manual_state')->nullable()->constrained('states');
                $table->foreignId('current_state')->nullable()->default(1)->constrained('states');
                $table->foreignId('servidor_bd')->nullable()->constrained('servicios');
                $table->foreignId('servidor')->nullable()->constrained('servicios');
                $table->foreignId('responsable1')->nullable()->constrained('users');
                $table->foreignId('responsable2')->nullable()->constrained('users');

                $table->string("analytics")->nullable();
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
        Schema::dropIfExists('servicios');
    }
}
