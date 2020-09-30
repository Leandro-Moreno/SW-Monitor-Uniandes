<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Alert extends Model
{
    protected $table = 'alertas';
    protected $primarykey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'servicio_id' , 'asunto', 'descripcion' ,'creador', 'fechaInicio', 'fechaFin', 'user_id'
    ];
    public function servicio()
    {
        return $this->belongsTo('App\Model\Servicio','servicio_id');
    }
    public function usuarioSolicitante()
    {
      return $this->belongsTo('App\User','creador');
    }
    public function fechaDeInicio()
    {
      return Carbon::parse($this->fechaInicio)->isoFormat('YYYY-MM-DD');
    }
    public function fechaFinal()
    {
      return Carbon::parse($this->fechaFin)->isoFormat('YYYY-MM-DD');
    }
}
