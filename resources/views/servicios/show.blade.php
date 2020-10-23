@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => $servicio->name . __('- Detalles servicio') ])

@section('content')
<header class="masthead masthead-min text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">Estado de {{$servicio->name }}</h1>
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

        <div class="card col-lg-4">
          <a href="{{$servicio["address"]}}" target="_blank" >
            <h3 class="card-header card-header-{{ isset($servicio->estadoMonitorManual)?$servicio->estadoMonitorManual->class:$servicio->estadoMonitor->class}}">{{$servicio["name"] }} <span class="material-icons">
            {{ ($servicio["current_state"] == 1)? 'check_circle' : 'error'}}
            </span></h3>
          </a>
          @can('update', $servicio)
          <a rel="tooltip" class="btn btn-success btm-sm" href="{{ route('servicio.edit', $servicio) }}" data-original-title="" title="">
                                  EDITAR<i class="material-icons">search</i>
                                  <div class="ripple-container"></div>
                                </a>
          @endcan
          <h4>{{$servicio["address"] }}</h4>

          @if($servicio->tipodatos->id != 5)
            @if (($servicio["current_state"])==1)
              <p>Funcionando correctamente desde {{ Carbon\Carbon::parse($servicio["last_time_down"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
            @else
              <p>Host caido hace {{ Carbon\Carbon::parse($servicio["last_time_up"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
            @endif
            <p>Google Analytics {{ $servicio->analytics }}</p>
          @endif
            <p>{{ $servicio->description }}</p>
            @if (isset($servicio->servidorDatos))
            <p>Servidor: {{ $servicio->servidorDatos->name }}</p>
            @endif
            @if (isset($servicio->servidorBDDatos))
            <p>Servidor Base de Datos: {{ $servicio->servidorBDDatos->name }}</p>
            @endif
            <p>Tipo: {{ $servicio->tipodatos->name }}</p>
          <p></p>

        @if(isset($servicio->imagen))
          @include('servicios.mod.show-imagen')
        @endif
        </div>
        <div class="col-lg-8">
          @if(!$servicio->alertas->isEmpty() || Auth::user() && Auth::user()->can('create', 'App\Model\Alert'))
            @include('servicios.mod.show-alertas')
          @endif
          @if($servicio["tipo_id"]!=1)
            @if(!$servicios->isEmpty())
              @include('servicios.mod.show-servicio')
            @endif
          @endif
        </div>
  </div>
</div>
</section>
@endsection
