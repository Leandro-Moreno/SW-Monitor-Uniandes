@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Todos los casos abiertos')])

@section('content')
<header class="masthead text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">Casos abiertos de Servicios Web Uniandes</h1>
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
            <div class="card">
              <div class="card-header card-header-black">
                <h4 class="card-title ">{{ __('Casos Servicios Web') }}</h4>
                <p class="card-category"> {{ __('Casos abiertos') }}</p>
              </div>
              <div class="card-body">
                @if (session('status'))
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="alert alert-success">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <i class="material-icons">close</i>
                        </button>
                        <span>{{ session('status') }}</span>
                      </div>
                    </div>
                  </div>
                @endif
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead class=" text-primary">
                      <th>
                          {{ __('Sitio web') }}
                      </th>
                      <th>
                          {{ __('Asunto') }}
                      </th>
                      <th>
                        {{ __('Descripción') }}
                      </th>
                      <th>
                        {{ __('Fecha creación') }}
                      </th>
                      <th class="text-right">
                        {{ __('Acciones') }}
                      </th>
                    </thead>
                    <tbody>
                      @foreach($casos as $caso)
                        <tr>
                          <td>
                            {{ $caso->host->name }}
                          </td>
                          <td>
                            {{ $caso->asunto }}
                          </td>
                          <td>
                            {{ $caso->descripcion }}
                          </td>
                          <td>
                            {{ $caso->created_at }}
                          </td>
                          <td class="td-actions text-right">
                            <a rel="tooltip" class="btn btn-success btn-link" href="{{ route('caso.show', $caso) }}" data-original-title="{{ __('Ver Detalle del caso') }}" title="">
                                {{ __('Detalle') }}<i class="material-icons">search</i>
                                <div class="ripple-container"></div>
                              </a>
                              <a rel="tooltip" class="btn btn-success btn-link" href="{{ route('caso.edit', $caso) }}" data-original-title="{{ __('Modificar estado del caso') }}" title="">
                                  {{ __('Modificar') }}<i class="material-icons">search</i>
                                  <div class="ripple-container"></div>
                                </a>
                          </td>
                        </tr>
                      @endforeach
                    </tbody>
                  </table>
                </div>
                {{ $casos->links() }}
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
@endsection
