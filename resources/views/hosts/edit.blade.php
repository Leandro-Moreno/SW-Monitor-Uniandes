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
          <div class="card-header card-header-black">
            <h4 class="card-title">{{ __('Editar Información del host') }}</h4>
            <p class="card-category"></p>
          </div>
          <div class="card-body ">
            <div class="row">
              <div class="col-md-12 text-right">
                  <a href="{{ route('host.show', $host->name) }}" class="btn btn-sm btn-primary">{{ __('Volver') }}</a>
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
                  <input class="form-control{{ $errors->has('analytics') ? ' is-invalid' : '' }}" name="analytics" id="input-nombre" type="text" placeholder="{{ __('analytics') }}" value="{{ old('nombre', $host->analytics) }}" />
                  @if ($errors->has('analytics'))
                    <span id="nombre-error" class="error text-danger" for="input-nombre">{{ $errors->first('analytics') }}</span>
                  @endif
                </div>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">{{ __('Servidor') }}</label>
              <div class="col-sm-7">
                <div class="form-group{{ $errors->has('servidor') ? ' has-danger' : '' }}">
                  <select class="form-control{{ $errors->has('firma') ? ' is-invalid' : '' }}" id="input-servidor" name="servidor">
                    @if ( ! empty($host->servidor) )
                    <option value="{{ $host->servidor}}">{{$host->servidorDatos->name}}</option>
                    @else
                    <option value=""></option>
                    @endif
                    @foreach($servidores as $servidor )
                    <option value="{{ $servidor->id }}">{{ $servidor->name }}</option>
                    @endforeach
                  </select>
                  @if ($errors->has('servidor'))
                  <span id="servidor-error" class="error text-danger" for="input-servidor">{{ $errors->first('servidor') }}</span>
                  @endif
                </div>
              </div>
            </div>
            <!--  -->
            <div class="row">
              <label class="col-sm-2 col-form-label">{{ __('Servidor Base de datos') }}</label>
              <div class="col-sm-7">
                <div class="form-group{{ $errors->has('firma') ? ' has-danger' : '' }}">
                  <select class="form-control{{ $errors->has('servidor_bd') ? ' is-invalid' : '' }}" id="input-servidor_bd" name="servidor_bd">
                    @if ( ! empty($host->servidor_bd) )
                    <option value="{{ $host->servidor_bd}}">{{$host->servidorBDDatos->name}}</option>
                    @else
                    <option value=""></option>
                    @endif
                    @foreach($servidoresBD as $servidor )
                    <option value="{{ $servidor->id }}">{{ $servidor->name }}</option>
                    @endforeach
                  </select>
                  @if ($errors->has('servidor_bd'))
                  <span id="servidor_bd-error" class="error text-danger" for="input-servidor_bd">{{ $errors->first('servidor_bd') }}</span>
                  @endif
                </div>
              </div>
            </div>
            <div class="row">
                  <label class="col-sm-2 col-form-label">{{ __('Estado Manual') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('manual_state') ? ' has-danger' : '' }}">

                      <select class="form-control{{ $errors->has('manual_state') ? ' is-invalid' : '' }}" id="input-manual_state" name="manual_state">
                        @isset($host->manual_state)
                        <option value="{{ $host->estadoMonitorManual->name}}">{{$host->estadoMonitorManual->name}}</option>
                        @endisset
                        <option value="">Vacio</option>
                        @foreach($states as $state )
                        <option value="{{ $state->id }}">{{ $state->name }}</option>
                        @endforeach
                      </select>
                      @if ($errors->has('manual_state'))
                        <span id="manual_state-error" class="error text-danger" for="input-manual_state">{{ $errors->first('manual_state') }}</span>
                      @endif
                  </div>
                </div>
            </div>
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
                @for($i = 1; $i<=2;$i++)
                <div class="row" id="responsable{{ $i }}">
                  <label class="col-sm-2 col-form-label">{{ __('Responsable '.$i) }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('responsable'.$i) ? ' has-danger' : '' }}">

                      <select class="form-control{{ $errors->has('responsable'.$i) ? ' is-invalid' : '' }}" id="input-responsable{{ $i }}" name="responsable{{ $i }}">
                        @if(isset($responsables[$i]))
                        <option value="{{ $responsables[$i]->user_id}}">{{ $responsables[$i]->usuario->name }} {{ $responsables[$i]->usuario->surname }} - {{$responsables[$i]->usuario->email}}</option>
                        @endif
                        <option value="0">Ninguno</option>
                        @foreach($users as $user )
                        <option value="{{ $user->id }}">{{ $user->name }} {{ $user->surname }} - {{$user->email}}</option>
                        @endforeach
                      </select>
                      @if ($errors->has('responsable{{ $i }}'))
                      <span id="responsable{{ $i }}-error" class="error text-danger" for="input-responsable{{ $i }}">{{ $errors->first('responsable'.$i) }}</span>
                      @endif
                    </div>
                  </div>
                </div>
                @endfor

                <div class="row">
                  <label class="col-sm-2 col-form-label">{{ __('Mostrar Host') }}</label>
                  <div class="col-sm-4">
                     <div class="form-group{{ $errors->has('mostrar') ? ' has-danger' : '' }}">
                        <div class="form-check">
                           <label class="form-check-label" id="lb-mostrar">
                              <input  class="form-check-input"  aria-expanded="false" aria-controls="collapse" data-toggle="collapse" name="mostrar" type="checkbox" value="1" {{ $host->mostrar ==  "1" ? 'checked' : '' }}></input>
                              <span class="form-check-sign">
                                    <span class="check"></span>
                              </span>
                           </label>
                        </div>
                        @if ($errors->has('mostrar'))
                        <span id="mostrar-error" class="error text-danger" for="input-mostrar" >{{ $errors->first('mostrar') }}</span>
                        @endif
                     </div>
                  </div>
                </div>

            </div>
          <div class="card-footer ml-auto mr-auto">
            <button type="submit" class="btn btn-primary">{{ __('Actualizar') }} {{$host["name"] }}</button>
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
      var hiddenField = $('#mostrarTogg'),
        val = hiddenField.val();
        hiddenField.trigger('click');
      $("#mostrarTogg").prop( "checked" )?$( "#toggContenido" ).text("No activo"):$( "#toggContenido" ).text("Activo");

      });
      /*Este codigo necesita refactorización init*/
      if ($("#input-responsable1").val() !== "0") {
        $("#responsable2").show();
      }
      else{
        $("#responsable2").hide();
      }
      $("#input-responsable1").click(function(e){

        if ($("#input-responsable1").val() !== "0") {
          $("#responsable2").show();
        }
        else{
          $("#responsable2").hide();
        }
        });
          /*Este codigo necesita refactorización End*/
  </script>
  @endpush
@endsection
