@extends('layouts.app', ['activePage' => 'eventos', 'titlePage' => __('Eventos')])

@section('content')

<header class="masthead text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">Añadir Hosts</h1>
      </div>
    </div>
    <div class="bg-circle-1 bg-circle"></div>
    <div class="bg-circle-2 bg-circle"></div>
    <div class="bg-circle-3 bg-circle"></div>
    <div class="bg-circle-4 bg-circle"></div>
<a href="{{ route('hosts') }}" class="btn btn-sm btn-secondary">{{ __('Volver a la lista') }}</a>
  </header>


  <section>
<div class="card-body">
            <form action="{{ route('import') }}" method="POST" enctype="multipart/form-data">

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
              $table->longText("serverAlias")->nullable();
              // $table->biginteger('unidad_id')->unsigned()->nullable();
              // $table->foreign('unidad_id')->references('id')->on('unidads');
              $table->biginteger('tipo_id')->unsigned()->default(1)->nullable();
              $table->biginteger('servidor_bd')->unsigned()->nullable();
              $table->foreign('tipo_id')->references('id')->on('host_type');
              $table->foreign('servidor_bd')->references('id')->on('hosts');
              $table->biginteger('servidor')->unsigned()->nullable();
              $table->foreign('servidor')->references('id')->on('hosts');
              $table->string("analytics")->nullable();
              $table->longText('description')->nullable();
              $table->dateTime("creacion")->nullable(); -->
                @csrf

                <div class="card ">
              <div class="card-header card-header-primary">
                <h4 class="card-title">{{ __('Añadir Servidor') }}</h4>
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
                  <label class="col-sm-2 col-form-label">{{ __('name') }}</label>
                  <div class="col-sm-7">
                    <div class="form-group{{ $errors->has('name') ? ' has-danger' : '' }}">
                      <input class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" id="input-name" type="text" placeholder="{{ __('name') }}" value="{{ old('name') }}" required="true" aria-required="true"/>
                      @if ($errors->has('name'))
                        <span id="name-error" class="error text-danger" for="input-name">{{ $errors->first('name') }}</span>
                      @endif
                    </div>
                  </div>
                </div>
                <input type="file" name="file" class="form-control">
                <br>

                <button class="btn btn-success">Import User Data</button>
              </div>
            </form>
        </div>
</section>
@endsection
