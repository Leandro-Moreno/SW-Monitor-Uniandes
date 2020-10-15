@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Estatus servicios uniandes')])

@section('content')
<header class="masthead masthead-min text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">Estado de Servicios Uniandes</h1>
      </div>
    </div>
    <div class="bg-circle-1 bg-circle"></div>
    <div class="bg-circle-2 bg-circle"></div>
    <div class="bg-circle-3 bg-circle"></div>
    <div class="bg-circle-4 bg-circle"></div>
    @can('create', 'App\Model\Servicio')
    <a class="btn btn-success" href="{{ route('servicio.create')}}">
      Crear Servicio
    </a>
    @endcan
  </header>


  <section>
<div class="container" style="height: auto;">
  <div class="row mt-1 mx-auto col-md-12 alert">
    <span class="mx-1 badge badge-success">Bien<span class="material-icons">
    check_circle
    </span></span>
    <span class="mx-1 badge badge-info">Información<span class="material-icons">
    info
    </span></span>
    <span class="mx-1 badge badge-warning">Advertencia<span class="material-icons">
    warning
    </span></span>
    <span class="mx-1 badge badge-danger">Crítico<span class="material-icons">
    bug_report
    </span></span>
</div>
  <div class="row justify-content-center">

      @foreach($servicios as $servicio)
        <div class="col-lg-4" >
          <a href="{{ route('servicio.show', $servicio ) }}" >
          <div class="card">
            <div class="card-header card-header-{{ isset($servicio->estadoMonitorManual)?$servicio->estadoMonitorManual->class:$servicio->estadoMonitor->class}}">
              <h3 class="card-title">{{$servicio->name }} <span class="material-icons">
              {{ $servicio->icono()}}
              </span>
              @if ( isset($servicio->id_nagios)  )
              <span class="material-icons">
                remove_red_eye
              </span>
              @endif
            </h3>

              <p class="card-category"></p>
            </div>
            <div class="card-body row">
              <div class="col-sm-3">
                @if(isset($servicio->imagen))
                  <picture>
                   <source srcset="{{ asset('storage/servicios/'.$servicio->rutaImagen()) }}" media="(max-width: 575px)">
                   <img width="100%" srcset="{{ asset('storage/servicios-300/'.$servicio->rutaImagen()) }}" alt="{{$servicio->imagen}}">
                 </picture>
                @endif



              </div>
              <div class="col-sm-9">
                @isset($servicio->id_nagios)
                  @if ( $servicio->current_state==1 )
                  <p>Funcionando correctamente desde {{ Carbon\Carbon::parse($servicio["last_time_down"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
                  @else
                  <p>Host caido hace {{ Carbon\Carbon::parse($servicio["last_time_up"])->diff(Carbon\Carbon::now())->format('%M mes(es), %D día(s), %I minuto(s)  ') }}</p>
                  @endif
                @else
                  <p>{{Str::limit($servicio->description, 160, ' (...)')}}</p>
                @endisset
              </div>
          </div>
        </div>
      </a>
        </div>
      @endforeach
  </div>
  {{ $servicios->links() }}
</div>
</section>
@endsection
