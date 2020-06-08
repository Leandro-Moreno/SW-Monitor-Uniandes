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
        <div class="col-lg-6 order-lg-2" style="color:{{ ($host["current_state"]==0)? 'green' : 'red'}}">
          <a href="https://{{$host["address"]}}" style="color:{{ ($host["current_state"]==0)? 'green' : 'red'}}" target="_blank" >
          <h3>{{$host["address"] }}</h3>
          <span class="material-icons">
          {{ ($host["current_state"]==0)? 'check_circle' : 'error'}}
          </span>
          @if (($host["current_state"])==0)
            <p>Funcionando correctamente desde <span id="last_time_down">{{$host["last_time_down"]}}</span></p>
            <p>La ultima vez que se cayo fue {{$host["last_time_up"]}}</p>
          @else
            <p>Host caido desde {{$host["last_time_up"]}}</p>
          @endif
          <p>Creado el {{$host["created_at"]}}</p>
          <p>Actualizado el {{$host["updated_at"]}}</p>
          <p></p>

          
        </div>
        <script>
        const md5 = require ("md5");
const moment = require ("moment");
        // var moment = require('moment');
          var last_time_down = moment(document.getElementById('last_time_down').value, 'YYYY/MM/DD');
        </script>
      @endforeach
  </div>
</div>
</section>
@endsection
