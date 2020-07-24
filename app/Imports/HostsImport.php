<?php

namespace App\Imports;

use App\Model\Host;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class HostsImport implements ToCollection
{
    /** 8
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function collection(Collection $rows)
    {
        $cantidadCargada = 0;
        foreach ($rows as $row)
        {
            $validarEstadoEnExcel = true;
            switch ($row[28]) {
                case "Borrado":
                    $validarEstadoEnExcel = false;
                    break;
                case "Redirecciona":
                    $validarEstadoEnExcel = false;
                    break;
                case "Eliminar DNS":
                    $validarEstadoEnExcel = false;
                    break;
            }
          if($validarEstadoEnExcel){
            $host = $this->buscarHostConCollection($row);
            $host->servidor = $this->buscarHostIdconNombre($row[10]);
            $host->servidor_bd  = $this->buscarHostIdconNombre($row[17]);
            $host->analytics  = $row[18];
            $host->description  = $row[29];
            if( ! isset(  $host->name )  ){
              $host->name = $this->urlToDomain($row[2]);
              $host->address = $this->urlToDomain($row[2]);
              $host->current_state  = 3;
              if($host->name==""){
                continue;
              }
            }
            $cantidadCargada++;
            $host->save();
          }

        }
        print_r($cantidadCargada);
    }
    function buscarHostConCollection(Collection $row){
      $serverAlias = array();
      $resultado;
      for($i=2; $i<9; $i++){
        /*Termina la ejecución si la casilla de excel esta vacia*/
        if(empty($row[$i])){
          break;
        }

        /*Se comprueba que es un subdominio, se elimina el resto*/
        if( isset(  explode('.', $row[$i])[1] )  ){
          $row[$i]  = $this->urlToDomain($row[$i]);
          /*Si resultado esta vacio sigue buscando; no se quiere sobrecargar base de datos*/
          if(!isset($resultado)){
            $resultado = Host::firstWhere('name',$row[$i]);
            /*valida si tiene contenido ese query*/
            isset($resultado)?"":array_push($serverAlias, $row[$i]);
          }
          else{
            ($resultado->name==$row[$i])?"":array_push($serverAlias, $row[$i]);
          }
        }
      }
      if( ! isset($resultado) ){
        $resultado  = new Host;
        $serverAlias  = array_shift($serverAlias);
        $resultado->serverAlias = json_encode($serverAlias);
      }
      return $resultado;
    }
    function urlToDomain($url) {
         if ( substr($url, 0, 8) == 'https://' ) {
            $url = substr($url, 8);
         }
         if ( substr($url, 0, 7) == 'http://' ) {
            $url = substr($url, 7);
         }
         if ( substr($url, 0, 4) == 'www.' ) {
            $url = substr($url, 4);
         }
         if ( strpos($url, '/') !== false ) {
            $explode = explode('/', $url);
            $url     = $explode['0'];
         }
         return $url;
      }
    function buscarHostIdconNombre($nombre = ''){
      $hostObjeto = Host::where('name',$nombre)->get('id')->first();
      return isset($hostObjeto)?$hostObjeto->id:null;
    }
}
