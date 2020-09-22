@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Caso')])

@section('content')
<header class="masthead masthead-min text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">{{__('Caso #')}}{{$caso->id }}</h1>
        <h2 class="masthead-heading mb-0">{{$caso->asunto }}</h2>
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
                                      <a href="{{ route('host.show', $caso->host) }}" class="btn btn-sm btn-primary">{{ __('Ver Detalle del Servicio Web') }}</a>
                                      <a href="{{ route('caso.index') }}" class="btn btn-sm btn-black">{{ __('Ver Todos los casos') }}</a>
                                  </div>
                              </div>
                              <div class="row">
                                <div class="col-md-4 col-xl-4">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Asunto') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        {{$caso->asunto}}
                                    </div>
                                </div>
                                <div class="col-md-8 col-xl-8">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Descripción') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        {{$caso->descripcion}}
                                    </div>
                                </div>
                                <div class="col-md-4 col-xl-4">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Solicitante') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        {{$caso->usuarioSolicitante->name}} {{$caso->usuarioSolicitante->surname}}
                                    </div>
                                </div>
                                <div class="col-md-4 col-xl-4">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Fecha Creación') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        {{$caso->created_at}}
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
