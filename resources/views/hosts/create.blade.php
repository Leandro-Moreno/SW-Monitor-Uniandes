@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Material Dashboard')])

@section('content')
    <header class="masthead text-center text-white"
            {{--            TODO: Agregar en los estilos SASS--}}
            style="padding-top: calc(5rem + 55px);padding-bottom: 5rem;">
        <div class="masthead-content">
            <div class="container">
                <h1 class="masthead-heading mb-0">Agregar Servicio Web</h1>
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
                    <form method="post" action="{{ route('host.store') }}" autocomplete="on" class="form-horizontal" enctype="multipart/form-data">
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
                                    <div class="col-md-6 col-xl-6">
                                        <label class="col-md-4 col-xl-4 col-form-label">{{ __('Nombre Servicio Web:') }}</label>
                                        <div class="col-md-7  col-xl-7">
                                            <div class="form-group{{ $errors->has('nombre') ? ' has-danger' : '' }}">
                                                <input class="form-control{{ $errors->has('nombre') ? ' is-invalid' : '' }}" name="nombre" id="input-nombre" type="text" placeholder="{{ __('Nombre') }}" value="{{ old('nombre') }}" required="true" aria-required="true"/>
                                                @if ($errors->has('nombre'))
                                                    <span id="nombre-error" class="error text-danger" for="input-nombre">{{ $errors->first('nombre') }}</span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-xl-6">
                                        <label class="col-md-4 col-xl-4 col-form-label">{{ __('Dirección Servicio Web:') }}</label>
                                        <div class="col-md-8  col-xl-8">
                                            <div class="form-group{{ $errors->has('address') ? ' has-danger' : '' }}">
                                                <input class="form-control{{ $errors->has('address') ? ' is-invalid' : '' }}" name="address" id="input-address" type="url" placeholder="{{ __('address') }}" value="{{ old('address') }}" required="true" aria-required="true"/>
                                                @if ($errors->has('address'))
                                                    <span id="address-error" class="error text-danger" for="input-address">{{ $errors->first('address') }}</span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
