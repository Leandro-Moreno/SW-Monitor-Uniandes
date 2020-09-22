<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->foreignId('rol_id')->default(2)->constrained('roles');
                $table->string('name');
                $table->string('surname');
                $table->string('email')->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->biginteger('unidad_id')->unsigned()->nullable();
                $table->foreign('unidad_id')->references('id')->on('unidads');
                $table->string('password');
                $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
