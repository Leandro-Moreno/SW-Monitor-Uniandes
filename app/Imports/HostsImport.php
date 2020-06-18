<?php

namespace App\Imports;

use App\Host;
use Maatwebsite\Excel\Concerns\ToModel;

class HostsImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        dd($row);
        return new Host([
            //
        ]);
    }
}
