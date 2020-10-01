@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Agregar Servicio')])

@section('content')
    <header class="masthead text-center text-white"
            {{--            TODO: Agregar en los estilos SASS--}}
            style="padding-top: calc(5rem + 55px);padding-bottom: 5rem;">
        <div class="masthead-content">
            <div class="container">
                <h1 class="masthead-heading mb-0">Agregar Servicio</h1>
            </div>
        </div>
        <div class="bg-circle-1 bg-circle"></div>
        <div class="bg-circle-2 bg-circle"></div>
        <div class="bg-circle-3 bg-circle"></div>
        <div class="bg-circle-4 bg-circle"></div>

    </header>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <form method="post" action="{{ route('servicio.store') }}" autocomplete="on" class="form-horizontal" enctype="multipart/form-data">
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
                                        <a href="{{ asset('prueba.xlsx') }}" class="btn btn-sm btn-success">{{ __('prueba.XLSX') }}</a>
                                        <a href="{{ route('import') }}" class="btn btn-sm btn-primary">{{ __('Importar Masivamente') }}</a>
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
                                  <label class="col-md-2 col-form-labels">{{ __('Nombre Servicio:') }}</label>
                                  <div class="col-md-12">
                                      <div class="form-group{{ $errors->has('name') ? ' has-danger' : '' }}">
                                          <input class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" id="input-name" type="text" placeholder="{{ __('Ingresar nombre') }}" value="{{ old('name') }}" required="true" aria-required="true"/>
                                          @if ($errors->has('name'))
                                              <span id="name-error" class="error text-danger" for="input-name">{{ $errors->first('name') }}</span>
                                          @endif
                                      </div>
                                  </div>
                                </div>
                                <div class="row">
                                    <label class="col-md-2 col-form-label">{{ __('Descripcion') }}</label>
                                    <div class="col-md-12">
                                      <div class="form-group{{ $errors->has('description') ? ' has-danger' : '' }}">
                                         <textarea class="form-control{{ $errors->has('description') ? ' is-invalid' : '' }}" name="description" id="input-description" type="" placeholder="{{ __('Ingresar descripción') }}" value="" rows="3">{{ old('descripcion') }}</textarea>
                                        @if ($errors->has('descripcion'))
                                          <span id="description-error" class="error text-danger" for="input-description">{{ $errors->first('description') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                </div>
                                <div class="row">
                                  <label class="col-md-2 col-form-labels">{{ __('URL servicio:') }}</label>
                                  <div class="col-md-12">
                                      <div class="form-group{{ $errors->has('address') ? ' has-danger' : '' }}">
                                          <input class="form-control{{ $errors->has('address') ? ' is-invalid' : '' }}" name="address" id="input-address" type="text" placeholder="{{ __('URL del Servicio') }}" value="{{ old('address') }}"/>
                                          @if ($errors->has('address'))
                                              <span id="name-error" class="error text-danger" for="input-address">{{ $errors->first('address') }}</span>
                                          @endif
                                      </div>
                                  </div>
                                </div>

                                <div class="row">
                                  <label class="col-sm-2 col-form-label" for="input-imagen">{{ __('Imagen') }}</label>
                                  <div class="col-sm-7">
                                    <div class="form-control-file">
                                      <input class="form-control-file" name="imagen" id="input-imagen" type="file" value="{{ old('imagen') }}"/>
                                    </div>
                                  </div>
                                </div>
                                @if($typos->count()< 1)
                                <div class="row">
                                  <label class="col-sm-2 col-form-label" for="input-tipo">{{ __('Tipo de Servicio') }}</label>
                                  <div class="col-sm-7">
                                    <div class="form-control-file">
                                      <select class="form-control{{ $errors->has('tipo') ? ' is-invalid' : '' }}" id="input-tipo" name="tipo">
                                        <option value="" disabled>Vacio</option>
                                        @foreach($typos as $typo)
                                        <option value="{{$typo->id}}">{{$typo->name}}</option>
                                        @endforeach
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                @else
                                <input type="hidden" value="5" name="tipo">
                                @endif
                            </div>
                            <div class="card-footer ml-auto mr-auto">
                              <button type="submit" class="btn btn-primary">{{ __('Crear Servicio') }}</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
