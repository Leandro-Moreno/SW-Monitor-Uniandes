@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Material Dashboard')])

@section('content')
<header class="masthead text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">Estatus Servicios Web Uniandes</h1>
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
      @foreach($hosts as $host)
        <div class="col-lg-6" style="color:{{ ($host["current_state"]==0)? 'green' : 'red'}}">
          <a href="{{ route('hosts') }}/host/{{$host["id"]}}" style="color:{{ ($host["current_state"]==0)? 'green' : 'red'}}" target="_blank" >
          <h3>{{$host["name"] }}</h3>
          <span class="material-icons">
          {{ ($host["current_state"]==0)? 'check_circle' : 'error'}}
          </span>
          @if (($host["current_state"])==0)
            <p>Funcionando correctamente desde {{ Carbon\Carbon::parse($host["last_time_down"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
          @else
            <p>Host caido hace {{ Carbon\Carbon::parse($host["last_time_up"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
          @endif

        </div>
      @endforeach
  </div>
</div>
</section>
@endsection
