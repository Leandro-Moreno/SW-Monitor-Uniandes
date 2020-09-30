@extends('layouts.app', ['class' => 'off-canvas-sidebar', 'activePage' => 'home', 'title' => __('Todas las alertas abiertos')])

@section('content')
<header class="masthead text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <h1 class="masthead-heading mb-0">Alertas de Servicios Web Uniandes</h1>
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
                <h4 class="card-title ">{{ __('Alertas Servicios Web') }}</h4>
                <div class="card-category row">
                  <p class="col-md-4">
                  {{ __('Alertas') }}
                </p>
                <a rel="tooltip" class="btn btn-sm btn-danger" href="{{ route('alert.index') }}" data-original-title="{{ __('Todos las Alertas') }}" title="">
                  {{ __('Alertas activas') }}
                </a>
                <a rel="tooltip" class="btn btn-sm btn-black" href="{{ route('alerta-semana') }}" data-original-title="{{ __('Alertas de la semana') }}" title="">
                  {{ __('Alertas de la semana') }}
                </a>
                <a rel="tooltip" class="btn btn-sm btn-black" href="{{ route('alerta-mes') }}" data-original-title="{{ __('Alertas del mes') }}" title="">
                  {{ __('Alertas del mes') }}
                </a>
                </div>
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
                      <th>
                        {{ __('Fecha Fin') }}
                      </th>
                      <th class="text-right">
                        {{ __('Acciones') }}
                      </th>
                    </thead>
                    <tbody>
                      @foreach($alertas as $alerta)
                        <tr>
                          <td>
                            <a rel="tooltip" class="btn btn-link" href="{{route('servicio.show',$alerta->servicio)}}">
                            {{ $alerta->servicio->name }}
                          </a>
                          </td>
                          <td>
                            {{ $alerta->asunto }}
                          </td>
                          <td>
                            {{ $alerta->descripcion }}
                          </td>
                          <td>
                            {{ $alerta->fechaInicio }}
                          </td>
                          <td>
                            {{ $alerta->fechaFin }}
                          </td>
                          <td class="td-actions text-right">
                            <a rel="tooltip" class="btn btn-success btn-link" href="{{ route('alert.show', $alerta->id) }}" data-original-title="{{ __('Ver Detalle de la alerta') }}" title="">
                                {{ __('Detalle') }}<i class="material-icons">search</i>
                                <div class="ripple-container"></div>
                              </a>
                              @can('update', $alerta)
                              <a rel="tooltip" class="btn btn-success btn-link" href="{{ route('alert.edit', $alerta->id) }}" data-original-title="{{ __('Modificar estado de la alerta') }}" title="">
                                  {{ __('Modificar') }}<i class="material-icons">search</i>
                                  <div class="ripple-container"></div>
                                </a>
                              @endcan
                          </td>
                        </tr>
                      @endforeach
                    </tbody>
                  </table>
                </div>
                {{ $alertas->links() }}
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
@endsection
