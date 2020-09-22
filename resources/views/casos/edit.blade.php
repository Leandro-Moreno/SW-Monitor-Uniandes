@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Crear caso de host')])

@section('content')
<header class="masthead masthead-min text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">{{__('Editar caso')}}{{$caso->id}} - {{$caso->host->name }}</h1>
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
                  <form method="post" action="{{ route('caso.update', $caso) }}" autocomplete="on" class="form-horizontal" enctype="multipart/form-data">
                      @csrf
                      @method('put')
                      <div class="card ">
                          <div class="card-body ">
                              <div class="row">
                                  <div class="col-md-4  text-right">
                                    <div class="col-sm-12">
                                      <div class="form-group{{ $errors->has('estado') ? ' has-danger' : '' }}">
                                        <select class="form-control{{ $errors->has('estado') ? ' is-invalid' : '' }}" id="input-servidor" name="estado">
                                          @if ( $caso->estado == 1 )
                                          <option selected value="{{ $caso->estado}}">{{ __('Caso Activo') }}</option>
                                          <option value="2">{{ __('Caso Cerrado') }}</option>
                                          @else
                                          <option value="1">{{ __('Caso Activo') }}</option>
                                          <option selected value="{{ $caso->estado}}">{{ __('Caso Cerrado') }}</option>
                                          @endif
                                        </select>
                                        @if ($errors->has('servidor'))
                                        <span id="servidor-error" class="error text-danger" for="input-servidor">{{ $errors->first('servidor') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4 text-right">
                                      <a href="{{ route('host.show', $caso->host) }}" class="btn btn-sm btn-primary">{{ __('Regresar a información del host') }}</a>
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
                                <div class="col-md-4">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Edite el asunto') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                      <div class="form-group{{ $errors->has('asunto') ? ' has-danger' : '' }}">
                                        <input class="form-control{{ $errors->has('asunto') ? ' is-invalid' : '' }}" name="asunto" id="input-asunto" type="text" placeholder="{{ __('Edite el asunto') }}" value="{{ $caso->asunto }}" required="true" aria-required="true"/>
                                        @if ($errors->has('asunto'))
                                        <span id="asunto-error" class="error text-danger" for="input-asunto">{{ $errors->first('asunto') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Edite la descripción') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                      <div class="form-group{{ $errors->has('descripcion') ? ' has-danger' : '' }}">
                                        <textarea class="form-control{{ $errors->has('descripcion') ? ' is-invalid' : '' }}" name="descripcion" id="input-descripcion" placeholder="{{ __('Ingrese la descripcion del problema o solicitud') }}" value="{{ $caso->descripcion }}" rows="5" required aria-required="true">{{ $caso->descripcion }}</textarea>
                                        @if ($errors->has('descripcion'))
                                        <span id="descripcion-error" class="error text-danger" for="input-descripcion">{{ $errors->first('descripcion') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                  <div class="row">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Acción ejecutada') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                      <div class="form-group{{ $errors->has('accion') ? ' has-danger' : '' }}">
                                        <textarea class="form-control{{ $errors->has('accion') ? ' is-invalid' : '' }}" name="accion" id="input-accion" placeholder="{{ __('Ingrese la acción') }}" value="{{ $caso->accion }}" rows="5" required aria-required="true">{{ $caso->accion }}</textarea>
                                        @if ($errors->has('accion'))
                                        <span id="accion-error" class="error text-danger" for="input-accion">{{ $errors->first('accion') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                  </div>
                                </div>


                              </div>
                              <button class="btn btn-success">Actualizar Caso</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
</section>
@endsection
