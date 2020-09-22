<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Casos extends Model
{
    protected $table = 'casos';
    protected $primarykey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'host_id' , 'asunto', 'descripcion' ,'accion', 'responsableAccion', 'estado','fechaAccion'
    ];
    public function host()
    {
        return $this->belongsTo('App\Model\Host');
    }
    public function usuarioSolicitante()
    {
      return $this->belongsTo('App\User','solicitante');
    }
}
// $table->biginteger('servicio')->unsigned();
// $table->foreign('servicio')->references('id')->on('hosts');
// $table->biginteger('solicitante')->unsigned();
// $table->foreign('solicitante')->references('id')->on('users');
// $table->string("asunto");
// $table->string("descripcion");
// $table->biginteger('responsableAccion')->unsigned();
// $table->foreign('responsableAccion')->references('id')->on('users');
// $table->dateTime("fechaTomada")->default(now());
// $table->dateTime("fechaAccion")->nullable();
// $table->string("decision");
