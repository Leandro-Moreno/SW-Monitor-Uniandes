@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Material Dashboard')])

@section('content')
<header class="masthead masthead-min text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">Estatus {{$host["name"] }}</h1>
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
            <p>Tipo: {{ $host->tipodatos->nombre }}</p>
          <p></p>
        </a>
        <a rel="tooltip" class="btn btn-inverse" href="{{ route('host.edit', $host->name) }}" data-original-title="" title="">
                                EDITAR<i class="material-icons">search</i>
                                <div class="ripple-container"></div>
                              </a>
        </div>
        <div class="col-lg-8">
          <p>.</p>
        </div>
  </div>
</div>
</section>
@endsection
