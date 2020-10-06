<div class="row">
<p>Se encontraron {{$servicios->count()}} servicios. </p>
<p>{{$servicio->nagios['si']}} están monitoreados por Nagios. </p>
<p>{{$servicio->nagios['no']}} no están monitoreados por Nagios. </p>
</div>
<div class="row">
  @foreach($servicios as $servicio)
    <div class="col-md-4 col-lg-4" style="color:{{ ( (  $servicio->current_state==1 ) && ( $servicio["mostrar"]==0 ) )? 'green' : 'red'}}">
      <a href="{{ route('servicio.show', $servicio) }}" >
      <div class="card">
        <div class="card-header card-header-{{ $servicio->estadoMonitor->class}}">
          <h3 class="card-title">{{$servicio["name"] }} <span class="material-icons">
          {{ ($servicio["current_state"]==1)? 'check_circle' : 'error'}}
          </span>
          @if ( isset($servicio->id_nagios)  )
          <span class="material-icons">
            remove_red_eye
          </span>
          @endif

        </h3>

          <p class="card-category"></p>
        </div>
        <div class="card-body ">
          @if ( isset($servicio->id_nagios)  )
            @if ( $servicio["current_state"]==1 )
              <p>Funcionando correctamente desde {{ Carbon\Carbon::parse($servicio["last_time_down"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
            @else
              <p>Servicio caido hace {{ Carbon\Carbon::parse($servicio["last_time_up"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
            @endif
          @else
            <p>Este Servicio no es monitoreado</p>
          @endif
      </div>
    </div>
    </a>
    </div>
  @endforeach
</div>
