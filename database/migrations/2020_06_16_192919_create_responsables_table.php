<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResponsablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('responsables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('servicio_id')->onUpdate('cascade')->constrained('servicios');
            $table->integer('tipo');
            $table->foreignId('unidad_id')->nullable()->onUpdate('cascade')->constrained('unidads');
            $table->foreignId('user_id')->nullable()->onUpdate('cascade')->constrained('users');
            $table->foreignId('responsabilidad_tipos_id')->nullable()->onUpdate('cascade')->constrained('responsabilidades_tipos');
            $table->timestamps();
            //TODO: ROL
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('host_user');
    }
}
