@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Alerta')])

@section('content')
<header class="masthead masthead-min text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">{{__('Alerta #')}}{{$alerta->id }}</h1>
        <h2 class="masthead-heading mb-0">{{$alerta->asunto }}</h2>
      </div>
    </div>
    <div class="bg-circle-1 bg-circle"></div>
    <div class="bg-circle-2 bg-circle"></div>
    <div class="bg-circle-3 bg-circle"></div>
    <div class="bg-circle-4 bg-circle"></div>
</header>
<section>
  <div class="content">
      <div class="container-fluid">
          <div class="row">
              <div class="col-md-12">

                      <div class="card ">

                          <div class="card-body ">
                              <div class="row">
                                  <div class="col-md-12 text-right">
                                    @can('update', $alerta)
                                      <a href="{{ route('alert.edit', $alerta) }}" class="btn btn-sm btn-primary">{{ __('Editar Alerta') }}</a>
                                      @endcan
                                      <a href="{{ route('servicio.show', $alerta->servicio) }}" class="btn btn-sm btn-black">{{ __('Ver Detalle del Servicio Web') }}</a>
                                      <a href="{{ route('alert.index') }}" class="btn btn-sm btn-black">{{ __('Ver Todas las alertas') }}</a>
                                  </div>
                              </div>
                              <div class="row">
                                <div class="col-md-8 col-xl-8">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Descripción') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        {{$alerta->descripcion}}
                                    </div>
                                </div>
                                <div class="col-md-4 col-xl-4">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Servicio') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        {{$alerta->servicio->name}}
                                    </div>
                                </div>
                                <div class="col-md-4 col-xl-4">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Fecha inicio') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        {{$alerta->fechaInicio}}
                                    </div>
                                </div>
                                <div class="col-md-4 col-xl-4">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Fecha final') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        {{isset($alerta->fechaFin)?$alerta->fechaFin:__('Sin fecha estimada.')}}
                                    </div>
                                </div>
                                <div class="col-md-4 col-xl-4">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Usuario creador de la Alerta') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        {{$alerta->usuarioSolicitante->name}} {{$alerta->usuarioSolicitante->surname}} ({{$alerta->usuarioSolicitante->email}})
                                    </div>
                                </div>
                              </div>
                          </div>
                      </div>
              </div>
          </div>
      </div>
  </div>
</section>
@endsection
