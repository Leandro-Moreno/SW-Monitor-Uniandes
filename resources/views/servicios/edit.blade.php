@extends('layouts.app', ['activePage' => 'eventos', 'titlePage' => __('Editar Información del servicio')])

@section('content')
<header class="masthead masthead-min text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">Estatus {{$servicio["name"] }}</h1>
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
    <div class="col-lg-12">
    <form method="post" action="{{ route('servicio.update', $servicio) }}" autocomplete="off" class="form-horizontal" enctype="multipart/form-data">
        @csrf
        @method('put')
        <div class="card ">
          <div class="card-header card-header-black">
            <h4 class="card-title">{{ __('Editar Información del servicio') }}</h4>
            <p class="card-category"></p>
          </div>
          <div class="card-body ">
            <div class="row">
              <div class="col-md-12 text-right">
                  <a href="{{ route('servicio.show', $servicio->name) }}" class="btn btn-sm btn-primary">{{ __('Volver') }}</a>
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
              <label class="col-sm-2 col-form-label">{{ __('Mostrar Servicio') }}</label>
              <div class="col-sm-4">
                 <div class="form-group{{ $errors->has('mostrar') ? ' has-danger' : '' }}">
                    <div class="form-check">
                       <label class="form-check-label" id="lb-mostrar">
                          <input  class="form-check-input"  aria-expanded="false" aria-controls="collapse" data-toggle="collapse" name="mostrar" type="checkbox" value="1" {{ $servicio->mostrar ==  "1" ? 'checked' : '' }}></input>
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
            <div class="row">
              <label class="col-sm-2 col-form-label">{{ __('Nombre') }}</label>
              <div class="col-sm-7">
                <div class="form-group{{ $errors->has('name') ? ' has-danger' : '' }}">
                  <input class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" id="input-name" type="text" placeholder="{{ __('name') }}" value="{{ old('name', $servicio->name) }}" required="true" aria-required="true"/>
                  @if ($errors->has('name'))
                    <span id="name-error" class="error text-danger" for="input-name">{{ $errors->first('name') }}</span>
                  @endif
                </div>
              </div>
            </div>
            <div class="row">
                  <label class="col-sm-2 col-form-label">{{ __('Descripción') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('description') ? ' has-danger' : '' }}">
                       <textarea class="form-control{{ $errors->has('description') ? ' is-invalid' : '' }}" name="description" id="input-description" type="" placeholder="{{ __('Descripción') }}" value="{{ old('description', $servicio->description) }}" rows="3">{{ old('description', $servicio->description) }}</textarea>
                      @if ($errors->has('descripcion'))
                        <span id="description-error" class="error text-danger" for="input-description">{{ $errors->first('description') }}</span>
                      @endif
                    </div>
                  </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">{{ __('Dirección web') }}</label>
              <div class="col-sm-7">
                <div class="form-group{{ $errors->has('address') ? ' has-danger' : '' }}">
                  <input class="form-control{{ $errors->has('address') ? ' is-invalid' : '' }}" name="address" id="input-address" type="text" placeholder="{{ __('address') }}" value="{{ old('address', $servicio->address) }}" required="true" aria-required="true"/>
                  @if ($errors->has('address'))
                    <span id="address-error" class="error text-danger" for="input-address">{{ $errors->first('address') }}</span>
                  @endif
                </div>
              </div>
            </div>
            <div class="row">
                  <label class="col-sm-2 col-form-label">{{ __('Estado') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('manual_state') ? ' has-danger' : '' }}">

                      <select class="form-control{{ $errors->has('manual_state') ? ' is-invalid' : '' }}" id="input-manual_state" name="manual_state">
                        @isset($servicio->manual_state)
                        <option value="{{ $servicio->estadoMonitorManual->id}}">{{$servicio->estadoMonitorManual->name}}</option>
                        @endisset
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
            @if($typos->count()< 1)
            <div class="row">
                  <label class="col-sm-2 col-form-label">{{ __('Tipo de Servicio') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('tipo') ? ' has-danger' : '' }}">

                      <select id="tipoServicio" class="form-control{{ $errors->has('tipo') ? ' is-invalid' : '' }}" id="input-tipo" required="true" aria-required="true" name="tipo">
                        <option value="{{ $servicio->tipo_id}}">{{$servicio->tipodatos->name}}</option>

                        @foreach($typos as $tipo )
                        <option value="{{ $tipo->id }}">{{ $tipo->name }}</option>
                        @endforeach
                      </select>
                      @if ($errors->has('tipo'))
                        <span id="firma-error" class="error text-danger" for="input-tipo">{{ $errors->first('tipo') }}</span>
                      @endif
                    </div>
                  </div>
                </div>
            @else
            <input type="hidden" value="{{$typos->first()->id}}" name="tipo">
            @endif

            <div class="row">
                    <label class="col-sm-2 col-form-label" >{{ __('Imagen Servicio') }}</label>
                      <div class="col-sm-7">
                        <div class="fileinput fileinput-new" data-provides="fileinput">
                        <div class="fileinput-new img-thumbnail" style="width: 200px; height: 150px;">
                          <img width="200px" src="{{ asset('storage/servicios/'.$servicio->imagen) }}"  alt="{{$servicio->imagen}}">
                        </div>
                        <div class="fileinput-preview fileinput-exists img-thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                        <div>
                          <span class="btn btn-raised btn-round btn-default btn-file"><span class="fileinput-new">Seleccionar imagen Servicio </span><span class="fileinput-exists">Modificar</span>
                          <input type="file" class="form-control-file" name="imagen"  id="input-imagen" value="{{ old('imagen', $servicio->imagen) }}" ></span>
                          <a href="#" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i> Remover</a>
                        </div>
                      </div>
                  </div>
                </div>
                <div id="datosWeb" style="display: {{$servicio->tipodatos->id==5?'none':'block'}};">
                <div class="row">
                  <label class="col-sm-2 col-form-label">{{ __('Google Analytics') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('analytics') ? ' has-danger' : '' }}">
                      <input class="form-control{{ $errors->has('analytics') ? ' is-invalid' : '' }}" name="analytics" id="input-name" type="text" placeholder="{{ __('analytics') }}" value="{{ old('name', $servicio->analytics) }}" />
                      @if ($errors->has('analytics'))
                        <span id="name-error" class="error text-danger" for="input-name">{{ $errors->first('analytics') }}</span>
                      @endif
                    </div>
                  </div>
                </div>
                <div class="row">
                  <label class="col-sm-2 col-form-label">{{ __('Servidor') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('servidor') ? ' has-danger' : '' }}">
                      <select class="form-control{{ $errors->has('firma') ? ' is-invalid' : '' }}" id="input-servidor" name="servidor">
                        @if ( ! empty($servicio->servidor) )
                        <option value="{{ $servicio->servidor}}">{{$servicio->servidorDatos->name}}</option>
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
                        @if ( ! empty($servicio->servidor_bd) )
                        <option value="{{ $servicio->servidor_bd}}">{{$servicio->servidorBDDatos->name}}</option>
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
                @for($i = 1; $i<=2;$i++)
                <div class="row" id="responsable{{ $i }}">
                  <label class="col-sm-2 col-form-label">{{ __('Responsable '.$i) }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('responsable'.$i) ? ' has-danger' : '' }}">

                      <select class="form-control{{ $errors->has('responsable'.$i) ? ' is-invalid' : '' }}" id="input-responsable{{ $i }}" name="responsable{{ $i }}">
                        @if(isset($responsables[$i]))
                        <option value="{{ $responsables[$i]->user_id}}">{{ $responsables[$i]->responsable->name }}</option>
                        @endif
                        <option value="">Ninguno</option>
                        @foreach($users as $user )
                        <option value="{{ $user->id }}">{{ $user->name }}</option>
                        @endforeach
                      </select>
                      @if ($errors->has('responsable{{ $i }}'))
                      <span id="responsable{{ $i }}-error" class="error text-danger" for="input-responsable{{ $i }}">{{ $errors->first('responsable'.$i) }}</span>
                      @endif
                    </div>
                  </div>
                </div>
                @endfor
              </div>
            </div>
          <div class="card-footer ml-auto mr-auto">
            <button type="submit" class="btn btn-primary">{{ __('Actualizar') }} {{$servicio["name"] }}</button>
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
    $(document).ready(function(){
      $('#tipoServicio').change(function () {
        var seleccion =  $('#tipoServicio').val();
        console.log(seleccion);
        if(seleccion === '5' ){
          $("#datosWeb").hide();
        }
        else{
          $("#datosWeb").show()
        }
      });
    });
  </script>
  @endpush
@endsection
