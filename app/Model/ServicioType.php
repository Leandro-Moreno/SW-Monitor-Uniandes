<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ServicioType extends Model
{
    protected $table = 'servicio_type';
    protected $primarykey = 'id';
    public function estaHabilitado()
    {
      return $this->habilitado;
    }
}
