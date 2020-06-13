@extends('layouts.app', ['activePage' => 'eventos', 'titlePage' => __('Eventos')])

@section('content')
<header class="masthead masthead-min text-center text-white">
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
<!--  -->
<!-- $table->bigIncrements('id');
$table->integer('id_nagios')->nullable();
$table->longText('name')->nullable();
$table->string('address')->nullable();
$table->string('tag')->nullable();
$table->integer('current_state')->default(0)->nullable();
$table->dateTime("last_time_up")->nullable();
$table->dateTime("last_time_down")->nullable();
$table->string("check_command")->nullable();
$table->integer("mostrar")->default(0)->nullable();
$table->integer("is_flapping")->default(0)->nullable();
//
$table->biginteger('tipo_id')->unsigned()->default(1)->nullable();
$table->biginteger('servidor')->unsigned()->nullable();
$table->biginteger('servidor_bd')->unsigned()->nullable();
$table->biginteger('responsable1')->unsigned()->nullable();
$table->biginteger('responsable2')->unsigned()->nullable();
$table->foreign('tipo_id')->references('id')->on('host_type');
$table->foreign('servidor')->references('id')->on('hosts');
$table->foreign('servidor_bd')->references('id')->on('hosts');
$table->foreign('responsable1')->references('id')->on('users');
$table->foreign('responsable2')->references('id')->on('users');
$table->string("analytics")->nullable();
$table->longText('description')->nullable();
$table->dateTime("creacion")->nullable(); -->
<!--  -->
  <section>
<div class="container" style="height: auto;">
  <div class="row justify-content-center">
    <div class="col-lg-12">
    <form method="post" action="{{ route('host.update', $host) }}" autocomplete="off" class="form-horizontal" enctype="multipart/form-data">
        @csrf
        @method('put')
        <div class="card ">
          <div class="card-header card-header-success">
            <h4 class="card-title">{{ __('Editar Información del host') }}</h4>
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
                  <label class="col-sm-2 col-form-label">{{ __('descripcion') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('description') ? ' has-danger' : '' }}">
                       <textarea class="form-control{{ $errors->has('description') ? ' is-invalid' : '' }}" name="description" id="input-description" type="" placeholder="{{ __('Descripción') }}" value="{{ old('description', $host->description) }}" rows="3">{{ old('description', $host->description) }}</textarea>
                      @if ($errors->has('descripcion'))
                        <span id="description-error" class="error text-danger" for="input-description">{{ $errors->first('description') }}</span>
                      @endif
                    </div>
                  </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">{{ __('Google Analytics') }}</label>
              <div class="col-sm-7">
                <div class="form-group{{ $errors->has('analytics') ? ' has-danger' : '' }}">
                  <input class="form-control{{ $errors->has('analytics') ? ' is-invalid' : '' }}" name="analytics" id="input-nombre" type="text" placeholder="{{ __('analytics') }}" value="{{ old('nombre', $host->analytics) }}" required="false" aria-required="false"/>
                  @if ($errors->has('analytics'))
                    <span id="nombre-error" class="error text-danger" for="input-nombre">{{ $errors->first('analytics') }}</span>
                  @endif
                </div>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">{{ __('Servidor') }}</label>
              <div class="col-sm-7">
                <div class="form-group{{ $errors->has('firma') ? ' has-danger' : '' }}">
                  <select class="form-control{{ $errors->has('firma') ? ' is-invalid' : '' }}" id="input-firma" required="false" aria-required="false" name="servidor">
                    <option value="{{ $host->servidor}}">{{$host->servidor}}</option>
                    @foreach($servidores as $servidor )
                    <option value="{{ $servidor->id }}">{{ $servidor->name }}</option>
                    @endforeach
                  </select>
                  @if ($errors->has('firma'))
                  <span id="firma-error" class="error text-danger" for="input-firma">{{ $errors->first('firma') }}</span>
                  @endif
                </div>
              </div>
            </div>
            <!--  -->

            <div class="row">
                  <label class="col-sm-2 col-form-label">{{ __('Tipo de Servicio') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('tipo') ? ' has-danger' : '' }}">

                      <select class="form-control{{ $errors->has('tipo') ? ' is-invalid' : '' }}" id="input-tipo" required="true" aria-required="true" name="tipo">
                        <option value="{{ $host->tipo_id}}">{{$host->tipodatos->nombre}}</option>

                        @foreach($typos as $tipo )
                        <option value="{{ $tipo->id }}">{{ $tipo->nombre }}</option>
                        @endforeach
                      </select>
                      @if ($errors->has('tipo'))
                        <span id="firma-error" class="error text-danger" for="input-tipo">{{ $errors->first('tipo') }}</span>
                      @endif
                    </div>
                  </div>
                </div>
                <!--  -->
            <div class="row">
                  <label class="col-sm-2 col-form-label">{{ __('Estado') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('estado') ? ' has-danger' : '' }}">
                      <div class="togglebutton">
                        <label>
                          <input id="estadoTogg" name="mostrar" type="checkbox" {{ $host->mostrar==0 ? ' checked' : '' }}  value="{{ old('mostrar', 1) }}">
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
