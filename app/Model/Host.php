<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Host extends Model
{
    protected $table = 'hosts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_nagios', 'name', 'address', 'tag', 'current_state',
        'last_time_up','last_time_down', 'check_command', 'is_flapping',
        'tipo_id', 'servidor', 'servidor_bd','analytics', 'description',
        'creacion', 'responsable1', 'responsable2', 'mostrar'
    ];
    public function servidorDatos()
    {
        return $this->belongsTo('App\Model\Host', 'servidor');
    }
    public function tipodatos()
    {
        return $this->belongsTo('App\Model\HostType', 'tipo_id');
    }
    public function responsable()
    {
        return $this->belongsToMany('App\Model\Responsable');
    }
    public function buscarHostPorNombre($nombre=''){
      return $this::where('name',$nombre)->get();
    }


}
