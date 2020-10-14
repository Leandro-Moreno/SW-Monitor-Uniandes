<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ResponsableType extends Model
{
    protected $table = 'responsabilidades_tipos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = ['name'];
}
