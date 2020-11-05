@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Crear alerta de Servicio')])

@section('content')
<header class="masthead masthead-min text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">{{__('Editar Alerta')}} {{$alerta->id}} - {{$alerta->servicio->name }}</h1>
      </div>
    </div>
    <div class="bg-circle-1 bg-circle"></div>
    <div class="bg-circle-2 bg-circle"></div>
    <div class="bg-circle-3 bg-circle"></div>
    <div class="bg-circle-4 bg-circle"></div>
    <form method="post" action="{{ route('alert.destroy', $alerta) }}">
      @csrf
      @method('DELETE')
      <button type="submit" class="btn btn-primary"><span class="material-icons">warning</span> {{ __('Eliminar Alerta') }} </button>
    </form>
</header>
<section>
  <div class="content">
      <div class="container-fluid">
          <div class="row">
              <div class="col-md-12">
                  <form method="post" action="{{ route('alert.update', $alerta) }}" autocomplete="on" class="form-horizontal" enctype="multipart/form-data">
                      @csrf
                      @method('put')
                      <div class="card ">
                          <div class="card-body ">
                              <div class="row">
                                  <div class="col-md-4  text-right">
                                    <div class="col-sm-12">
                                      <div class="form-group{{ $errors->has('estado') ? ' has-danger' : '' }}">
                                        <select class="form-control{{ $errors->has('estado') ? ' is-invalid' : '' }}" id="input-servidor" name="estado">
                                          @if ( $alerta->estado == 1 )
                                          <option selected value="{{ $alerta->estado}}">{{ __('Alerta Activa') }}</option>
                                          <option value="2">{{ __('Alerta Cerrada') }}</option>
                                          @else
                                          <option value="1">{{ __('Alerta Activa') }}</option>
                                          <option selected value="{{ $alerta->estado}}">{{ __('Alerta Cerrada') }}</option>
                                          @endif
                                        </select>
                                        @if ($errors->has('servidor'))
                                        <span id="servidor-error" class="error text-danger" for="input-servidor">{{ $errors->first('servidor') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4 text-right">
                                      <a href="{{ route('servicio.show', $alerta->servicio) }}" class="btn btn-sm btn-primary">{{ __('Regresar a información del servicio') }}</a>
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
                                <div class="col-md-12">
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Edite el asunto') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                      <div class="form-group{{ $errors->has('asunto') ? ' has-danger' : '' }}">
                                        <input class="form-control{{ $errors->has('asunto') ? ' is-invalid' : '' }}" name="asunto" id="input-asunto" type="text" placeholder="{{ __('Edite el asunto') }}" value="{{ $alerta->asunto }}" required="true" aria-required="true"/>
                                        @if ($errors->has('asunto'))
                                        <span id="asunto-error" class="error text-danger" for="input-asunto">{{ $errors->first('asunto') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                    <label class="col-md-12 col-xl-12 col-form-label">{{ __('Edite la descripción') }}</label>
                                    <div class="col-md-12  col-xl-12">
                                      <div class="form-group{{ $errors->has('descripcion') ? ' has-danger' : '' }}">
                                        <textarea class="form-control{{ $errors->has('descripcion') ? ' is-invalid' : '' }}" name="descripcion" id="input-descripcion" placeholder="{{ __('Ingrese la descripcion del problema o solicitud') }}" value="{{ $alerta->descripcion }}" rows="5" required aria-required="true">{{ $alerta->descripcion }}</textarea>
                                        @if ($errors->has('descripcion'))
                                        <span id="descripcion-error" class="error text-danger" for="input-descripcion">{{ $errors->first('descripcion') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                </div>
                              </div>
                              <div class="row col-sm-12 com-md-6">
                                <label class="col-sm-2 col-form-label" for="input-fecha">{{ __('Fecha Inicial') }}</label>
                                <div class="col-sm-10">
                                  <div class="form-group{{ $errors->has('fechaInicio') ? ' has-danger' : '' }}">
                                    <input class="form-control{{ $errors->has('fechaInicio') ? ' is-invalid' : '' }}" input type="date" name="fechaInicio" id="input-fechaInicio" placeholder="{{ __('fechaInicio') }}" value="{{ old('fechaInicio', $alerta->fechaDeInicio()) }}" />
                                    @if ($errors->has('fechaInicio'))
                                      <span id="name-error" class="error text-danger" for="input-name">{{ $errors->first('fechaInicio') }}</span>
                                    @endif
                                  </div>
                                </div>
                              </div>
                              <div class="row col-sm-12 com-md-6">
                                <label class="col-sm-2 col-form-label" for="input-fecha">{{ __('Fecha Final') }}</label>
                                <div class="col-sm-10">
                                  <div class="form-group{{ $errors->has('fechaFin') ? ' has-danger' : '' }}">
                                    <input class="form-control{{ $errors->has('fechaFin') ? ' is-invalid' : '' }}" input type="date" name="fechaFin" id="input-fechaFin" placeholder="{{ __('fechaFin') }}" value="{{ old('fechaFin', $alerta->fechaFinal()) }}" />
                                    @if ($errors->has('fechaFin'))
                                      <span id="name-error" class="error text-danger" for="input-name">{{ $errors->first('fechaFin') }}</span>
                                    @endif
                                  </div>
                                </div>
                              </div>
                              <button class="btn btn-success">Actualizar Alerta</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
</section>
@endsection
