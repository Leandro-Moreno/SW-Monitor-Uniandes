<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Unidad extends Model
{
  protected $table = 'unidads';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [ 'name', 'unidad_padre_id'];

  public function unidadPadre()
  {
      return $this->belongsTo('App\Model\Unidad', 'unidad_padre_id');
  }
  public function usuarios()
  {
    return $this->hasMany('App\User');
  }
}
