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
        'id_nagios', 'name', 'address', 'tag', 'current_state', 'last_time_up','last_time_down', 'check_command', 'is_flapping'
    ];


}
