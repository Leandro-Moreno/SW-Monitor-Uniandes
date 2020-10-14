<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Responsable extends Pivot
{
    protected $table = 'responsables';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = ['host_id', 'user_id', 'unidad_id', 'tipo', 'responsabilidad_tipos_id'];
    // protected $fillable = [
    //     'id_nagios', 'name', 'address', 'tag', 'current_state',
    //     'last_time_up','last_time_down', 'check_command', 'is_flapping',
    //     'tipo_id', 'servidor', 'servidor_bd','analytics', 'description',
    //     'creacion', 'responsable1', 'responsable2', 'mostrar'
    // ];
    public function host()
    {
        return $this->belongsTo('App\Model\Host', 'host_id');
    }

    public function usuariosResponsables()
    {
        $responsable = $this->belongsTo('App\User', 'user_id');
        return $responsable;
    }
    public function unidadesResponsables()
    {
        $responsable = $this->belongsTo('App\Model\Unidad', 'unidad_id');
        return $responsable;
    }
}
