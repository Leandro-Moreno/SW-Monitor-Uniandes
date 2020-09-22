<?php

namespace App\Imports;

use App\Model\Host;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class HostsImport implements ToCollection
{

    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        $cantidadCargada = 0;
        foreach ($rows as $row) {
            $validarEstadoEnExcel = true;
            switch ($row[28]) {
                case "Redirecciona":
                case "Eliminar DNS":
                case "Borrado":
                    $validarEstadoEnExcel = false;
                    break;
            }

            if ($validarEstadoEnExcel) {
                $host = $this->buscarHostConServerAlias(  $row  );
                $servidor = new Host();
                $servidor_bd = new Host();
                $host->servidor = $servidor->buscarHostIdPorname( $row[10]  );
                $host->servidor_bd  = $servidor_bd->buscarHostIdPorname(  $row[17]  );
                $host->analytics  = $row[18];
                $host->description  = $row[29];
                /* current_state = 3 corresponde a sin monitor.*/
                $host->current_state = isset($host->id_nagios) ? $host->current_state  : 3;
                if (! isset($host->id)) {
                    $host->name = $this->urlToDomain($row[2]);
                    $host->address = $this->urlToDomain($row[2]);
                    if ($host->name=="") {
                        continue;
                    }
                }
                $cantidadCargada++;
                $host->save();
            }
        }
        print_r($cantidadCargada);
    }

    /**
     * @param Collection $row
     * @return Host
     */
    public function buscarHostConServerAlias(Collection $row)
    {
        $host = new Host();
        $serverAlias = array();
        $resultado;
        for ($casilla  = 2  ; $casilla < 9  ; $casilla++) {
            $dominio  = $this->urlToDomain($row[$casilla]);
            if (isset($dominio)) {
                if (! isset($host->name)) {
                    $host = $host->buscarHostPorname($dominio);
                } else {
                    if ($host->name != $dominio && ! in_array($dominio, $serverAlias)) {
                        array_push($serverAlias, $dominio);
                    }
                }
            }
        }
        // $serverAlias  = array_shift($serverAlias);
        $host->serverAlias = json_encode($serverAlias);
        return $host;
    }

    /**
     * @param $url
     * Ingresa una url como ejemplo https://prueba.uniandes.edu.co/resultado
     * Retorna solo el dominio prueba.uniandes.edu.co
     * @return string
     */
    public function urlToDomain($url = "prueba.uniandes.edu.co")
    {
        if (substr($url, 0, 8) == 'https://') {
            $url = substr($url, 8);
        }
        if (substr($url, 0, 7) == 'http://') {
            $url = substr($url, 7);
        }
        if (substr($url, 0, 4) == 'www.') {
            $url = substr($url, 4);
        }
        if (strpos($url, '/') !== false) {
            $explode = explode('/', $url);
            $url     = $explode['0'];
        }
        return $url;
    }
}
