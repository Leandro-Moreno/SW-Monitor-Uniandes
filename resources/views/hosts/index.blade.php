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
          <h3>{{$host["address"] }}</h3>
        </div>
      @endforeach
  </div>
</div>
</section>
@endsection
