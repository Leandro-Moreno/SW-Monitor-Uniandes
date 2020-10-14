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
class Servicio extends Model implements Searchable
{
    protected $table = 'servicios';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_nagios', 'name', 'imagen', 'address', 'tag', 'current_state',
        'manual_state','last_time_up','last_time_down', 'check_command',
        'is_flapping','tipo_id', 'servidor', 'servidor_bd','analytics',
         'description','creacion', 'responsable1', 'responsable2', 'mostrar'
    ];
    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'name';
    }
    /**
     * @return SearchResult
     */
    public function getSearchResult(): SearchResult
    {
        $url = route('servicio.show', $this);
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
        return $this->belongsTo('App\Model\Servicio', 'servidor');
    }
    /**
     * @return Host
     */
    public function servidorBDDatos()
    {
        return $this->belongsTo('App\Model\Servicio', 'servidor_bd');
    }
    public function serviciosHijos()
    {
      return $this->hasMany('App\Model\Servicio','servidor', 'id');
    }
    /**
     * @return HostType
     */
    public function tipodatos()
    {
        return $this->belongsTo('App\Model\ServicioType', 'tipo_id');
    }
    public function usuarios()
    {
        return $this->belongsToMany('App\User', 'responsables','servicio_id','user_id')->withPivot(["tipo","responsabilidad_tipos_id"]);
    }
    public function unidades()
    {
        return $this->belongsToMany('App\Model\Unidad', 'responsables','servicio_id','unidad_id')->withPivot(["tipo","responsabilidad_tipos_id"]);
    }
    public function alertas()
    {
        return $this->hasMany('App\Model\Alert','servicio_id');
    }
    /**
     * @return State
     */
    public function estadoMonitor()
    {
        return $this->belongsTo('App\Model\State', 'current_state');
    }
    /**
     * @return State
     */
    public function estadoMonitorManual()
    {
        return $this->belongsTo('App\Model\State', 'manual_state');
    }
    public function claseEstadoMonitor()
    {
      dd($this->manual_state);
      if ($this->manual_state != 0)
      {

      }
      else {
        // code...
      }
    }

    /**
     * @param string $name
     * @return Host[]
     */
    public function buscarHostsPorname($name='')
    {
        $resultados  = $this::where('name', $name)->get();
        return is_null($resultados)? $this : $resultados;
    }
    /**
     * @param string $name
     * @return Host
     */
    public function buscarHostPorname($name='')
    {
        $resultado  = $this::where('name', $name)->first();
        return is_null($resultado)? $this : $resultado;
    }
    /**
     * @param string $name
     * @return Host['id']
     */
    public function buscarHostIdPorname($name='')
    {
        $resultado  = $this::where('name', $name)->first();
        return is_null($resultado)? null: $resultado->id;
    }
}
