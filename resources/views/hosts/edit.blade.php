@extends('layouts.app', ['activePage' => 'eventos', 'titlePage' => __('Eventos')])

@section('content')
<header class="masthead text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">Estatus {{$host["name"] }}</h1>
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
    <form method="post" action="{{ route('host.update', $host) }}" autocomplete="off" class="form-horizontal" enctype="multipart/form-data">
        @csrf
        @method('put')
        <div class="card ">
          <div class="card-header card-header-primary">
            <h4 class="card-title">{{ __('Añadir firma') }}</h4>
            <p class="card-category"></p>
          </div>
          <div class="card-body ">
            <div class="row">
              <div class="col-md-12 text-right">
                  <a href="{{ route('hosts') }}" class="btn btn-sm btn-primary">{{ __('Volver a la lista') }}</a>
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
              <label class="col-sm-2 col-form-label">{{ __('Nombre') }}</label>
              <div class="col-sm-7">
                <div class="form-group{{ $errors->has('nombre') ? ' has-danger' : '' }}">
                  <input class="form-control{{ $errors->has('nombre') ? ' is-invalid' : '' }}" name="nombre" id="input-nombre" type="text" placeholder="{{ __('Nombre') }}" value="{{ old('nombre', $host->name) }}" required="true" aria-required="true"/>
                  @if ($errors->has('nombre'))
                    <span id="nombre-error" class="error text-danger" for="input-nombre">{{ $errors->first('nombre') }}</span>
                  @endif
                </div>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">{{ __('Area') }}</label>
              <div class="col-sm-7">
                <div class="form-group{{ $errors->has('area') ? ' has-danger' : '' }}">
                     <input class="form-control{{ $errors->has('area') ? ' is-invalid' : '' }}" input type="text" name="area" id="input-area" placeholder="{{ __('Area') }}" value="{{ old('area', $host->description) }}"  required/>
                  @if ($errors->has('area'))
                    <span id="area-error" class="error text-danger" for="input-area">{{ $errors->first('area') }}</span>
                  @endif
                </div>
              </div>
            </div>
            <div class="row">
                  <label class="col-sm-2 col-form-label">{{ __('Estado') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('estado') ? ' has-danger' : '' }}">
                      <div class="togglebutton">
                        <label>
                          <input id="estadoTogg" name="estado" type="checkbox" {{ $host->mostrar==0 ? ' checked' : '' }}  value="{{ old('mostrar', 1) }}">
                          <span class="toggle"></span>
                          <span id="toggContenido">{{ $host->mostrar==0?"Activo":"No activo" }}</span>
                        </label>
                      </div>
                      @if ($errors->has('estado'))
                      <span id="estado-error" class="error text-danger" for="input-estado">{{ $errors->first('estado') }}</span>
                      @endif
                    </div>
                  </div>
                </div>

            </div>
          <div class="card-footer ml-auto mr-auto">
            <button type="submit" class="btn btn-primary">{{ __('Actualizar firma') }}</button>
          </div>
        </div>
      </form>
  </div>
</div>
</section>
  @push('js')
  <script type="text/javascript">

  $(".toggle").click(function(e){
    if($("#estadoTogg").prop( "checked" )){

    }
      $("#estadoTogg").prop( "checked" )?$( "#toggContenido" ).text("No activo"):$( "#toggContenido" ).text("Activo");

      });

  </script>
  @endpush
@endsection
