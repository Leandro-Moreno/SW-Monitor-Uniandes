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
        <div class="col-lg-4" >
          <a href="{{ route('host.show', $host ) }}" >
          <div class="card">
            <div class="card-header card-header-{{ isset($host->estadoMonitorManual)?$host->estadoMonitorManual->class:$host->estadoMonitor->class}}">
              <h3 class="card-title">{{$host->name }} <span class="material-icons">
              {{ ($host->current_state==1)? 'check_circle' : 'error'}}
              </span>
              @if ( isset($host->id_nagios)  )
              <span class="material-icons">
                remove_red_eye
              </span>
              @endif
            </h3>

              <p class="card-category"></p>
            </div>
            <div class="card-body ">
              @isset($host->id_nagios)
                @if ( $host->current_state==1 )
                <p>Funcionando correctamente desde {{ Carbon\Carbon::parse($host["last_time_down"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
                @else
                <p>Host caido hace {{ Carbon\Carbon::parse($host["last_time_up"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
                @endif
              @else
                <p>Este host no es monitoreado</p>
              @endisset
          </div>
        </div>
      </a>
        </div>
      @endforeach
  </div>
  {{ $hosts->links() }}
</div>
</section>
@endsection
