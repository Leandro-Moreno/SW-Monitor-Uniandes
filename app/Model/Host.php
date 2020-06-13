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
        'creacion', 'responsable1', 'responsable2'
    ];
    public function servidorDatos()
    {
        return $this->belongsTo('App\Model\Host', 'servidor');
    }
    public function tipodatos()
    {
        return $this->belongsTo('App\Model\HostType', 'tipo_id');
    }


}
