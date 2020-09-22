@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Material Dashboard')])

@section('content')
<header class="masthead masthead-min text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">Estatus {{$host->name }}</h1>
      </div>
    </div>
    <div class="bg-circle-1 bg-circle"></div>
    <div class="bg-circle-2 bg-circle"></div>
    <div class="bg-circle-3 bg-circle"></div>
    <div class="bg-circle-4 bg-circle"></div>
  </header>


  <section>
<div class="container" style="height: auto;">
  <div class="row justify-content-center">


        <div class="col-lg-4" style="color:{{ ($host["current_state"] == 1)? 'green' : 'red'}}">
          <a href="https://{{$host["address"]}}" style="color:{{ ($host["current_state"] == 1)? 'green' : 'red'}}" target="_blank" >
          <h3>{{$host["name"] }}</h3>
          <h4>{{$host["address"] }}</h4>
          <span class="material-icons">
          {{ ($host["current_state"] == 1)? 'check_circle' : 'error'}}
          </span>
          @if (($host["current_state"])==1)
            <p>Funcionando correctamente desde {{ Carbon\Carbon::parse($host["last_time_down"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
          @else
            <p>Host caido hace {{ Carbon\Carbon::parse($host["last_time_up"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
          @endif
            <p>Google Analytics {{ $host->analytics }}</p>
            <p>{{ $host->description }}</p>
            @if (isset($host->servidorDatos))
            <p>Servidor: {{ $host->servidorDatos->name }}</p>
            @endif
            @if (isset($host->servidorBDDatos))
            <p>Servidor Base de Datos: {{ $host->servidorBDDatos->name }}</p>
            @endif
            <p>Tipo: {{ $host->tipodatos->name }}</p>
          <p></p>
        </a>
        @can('update', $host)
        <a rel="tooltip" class="btn btn-inverse" href="{{ route('host.edit', $host) }}" data-original-title="" title="">
                                EDITAR<i class="material-icons">search</i>
                                <div class="ripple-container"></div>
                              </a>
        @endcan
        </div>
        <div class="col-lg-8">
          <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header card-header-black">
                    <h3 class="card-title">Casos del Servicio Web</h3>
                    <p class="card-category">Este servicio web tiene x casos activos.</p><a class="btn btn-outline-warning" href="{{ route('agregarCasoHost', $host) }}">Crear Caso</a>
                  </div>
                  <div class="card-body row">
                    @foreach($host->casos as $caso)
                    <div class="card col-md-4 col-lg-4">
                      <a href="{{route('caso.show', $caso )}}">
                      <div class="card-header card-header-success">
                        <h3 class="card-title">{{$caso->asunto }} </h3>
                        <p class="card-category">Caso #{{$caso->id}}. Creado el {{$caso->created_at}}</p>
                      </div>
                      <div class="card-body ">
                        {{Str::of($caso->descripcion)->words(5, ' ...')}}
                      </div>
                    </a>
                    </div>
                  @endforeach
                </div>
                </div>
              </div>
            </div>
          @if($host["tipo_id"]!=1)
            @if(isset($servicios))
            <div class="row">
            <p>Se encontraron {{$servicios->count()}} servicios. </p>
            <p>{{$host->nagios['si']}} están monitoreados por Nagios. </p>
            <p>{{$host->nagios['no']}} no están monitoreados por Nagios. </p>
            </div>
            <div class="row">
              @foreach($servicios as $servicio)
                <div class="col-md-4 col-lg-4" style="color:{{ ( (  $servicio->current_state==1 ) && ( $servicio["mostrar"]==0 ) )? 'green' : 'red'}}">
                  <a href="{{ route('host.show', $servicio) }}" >
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
                          <p>Host caido hace {{ Carbon\Carbon::parse($servicio["last_time_up"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
                        @endif
                      @else
                        <p>Este host no es monitoreado</p>
                      @endif
                  </div>
                </div>
                </a>
                </div>
              @endforeach
          </div>
            @endif
          @endif
        </div>
  </div>
</div>
</section>
@endsection
