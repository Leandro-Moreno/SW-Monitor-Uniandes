@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Crear caso de host')])

@section('content')
<header class="masthead masthead-min text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">{{__('Creación de caso a')}}{{$host->name }}</h1>
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
                  <form method="post" action="{{ route('caso.store') }}" autocomplete="on" class="form-horizontal" enctype="multipart/form-data">
                      @csrf
                      @method('post')
                      <div class="card ">
                          {{--            <div class="card-header card-header-primary">--}}
                          {{--                <h4 class="card-title">{{ __('Añadir asistentes') }}</h4>--}}
                          {{--                <p class="card-category"></p>--}}
                          {{--            </div>--}}
                          <div class="card-body ">
                              <div class="row">
                                  <div class="col-md-12 text-right">
                                      <a href="{{ route('host.show', $host) }}" class="btn btn-sm btn-primary">{{ __('Regresar a información del host') }}</a>
                                  </div>
                              </div>
                              @if ($errors->any())
                                  <div class="row">
                                      <div class="col-sm-12">
                                          <div class="alert alert-danger">
                                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                  <i class="material-icons">close</i>
                                              </button>
                                              @foreach ($errors->all() as $error)
                                                  <span>{{ $error }}</span>
                                              @endforeach
                                          </div>
                                      </div>
                                  </div>
                              @endif
                              <div class="row">
                                <div class="col-md-4 col-xl-4">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Asunto') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        <div class="form-group{{ $errors->has('asunto') ? ' has-danger' : '' }}">
                                            <input class="form-control{{ $errors->has('asunto') ? ' is-invalid' : '' }}" name="asunto" id="input-asunto" type="text" placeholder="{{ __('Ingrese el asunto') }}" value="{{ old('asunto') }}" required="true" aria-required="true"/>
                                            @if ($errors->has('asunto'))
                                                <span id="asunto-error" class="error text-danger" for="input-asunto">{{ $errors->first('asunto') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-8 col-xl-8">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Descripción') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                        <div class="form-group{{ $errors->has('descripcion') ? ' has-danger' : '' }}">
                                            <textarea class="form-control{{ $errors->has('descripcion') ? ' is-invalid' : '' }}" name="descripcion" id="input-descripcion" type="url" placeholder="{{ __('Ingrese la descripcion del problema o solicitud') }}" value="{{ old('descripcion') }}" rows="5" required aria-required="true">{{ old('descripcion') }}</textarea>
                                            @if ($errors->has('descripcion'))
                                                <span id="descripcion-error" class="error text-danger" for="input-descripcion">{{ $errors->first('descripcion') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>

                              </div>
                              <input type="hidden" value="{{$host->id}}" name="host_id">
                              <button class="btn btn-success">Crear Caso</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
</section>
@endsection
