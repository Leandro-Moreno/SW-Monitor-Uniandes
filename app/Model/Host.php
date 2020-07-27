<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Illuminate\Support\Collection;

/**
 * Class Host
 * @package App\Model
 */
class Host extends Model implements Searchable
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

    /**
     * @return SearchResult
     */
    public function getSearchResult(): SearchResult
    {
        $url = route('host.show', $this->name);
        return new SearchResult($this, $this->name, $url);
    }
    public function resultadoBusqueda(){
        return $this->name;
    }
    /**
     * @return Host
     */
    public function servidorDatos()
    {
        return $this->belongsTo('App\Model\Host', 'servidor');
    }
    /**
     * @return Host
     */
    public function servidorBDDatos()
    {
        return $this->belongsTo('App\Model\Host', 'servidor_bd');
    }

    /**
     * @return HostType
     */
    public function tipodatos()
    {
        return $this->belongsTo('App\Model\HostType', 'tipo_id');
    }
    public function responsable()
    {
        return $this->belongsToMany('App\Model\Responsable');
    }

    /**
     * @return State
     */
    public function estadoMonitor()
    {
        return $this->belongsTo('App\Model\State', 'current_state');
    }

    /**
     * @param string $nombre
     * @return Host[]
     */
    public function buscarHostsPorNombre($nombre='')
    {
        $resultados  = $this::where('name', $nombre)->get();
        return is_null($resultados)? $this : $resultados;
    }
    /**
     * @param string $nombre
     * @return Host
     */
    public function buscarHostPorNombre($nombre='')
    {
        $resultado  = $this::where('name', $nombre)->first();
        return is_null($resultado)? $this : $resultado;
    }
    /**
     * @param string $nombre
     * @return Host['id']
     */
    public function buscarHostIdPorNombre($nombre='')
    {
        $resultado  = $this::where('name', $nombre)->first();
        return is_null($resultado)? null: $resultado->id;
    }
}
