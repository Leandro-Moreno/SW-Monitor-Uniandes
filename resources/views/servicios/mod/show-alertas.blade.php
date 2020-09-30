<div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header card-header-black">
          <h3 class="card-title">Alertas del Servicio</h3>
          @can('create', 'App\Model\Alert')
            <p class="card-category">Este servicio web tiene x alertas activos.</p><a class="btn btn-outline-warning" href="{{ route('agregarAlerta', $servicio) }}">Crear Alerta</a>
          @endcan
        </div>
        <div class="card-body row">
          @foreach($servicio->alertas as $alerta)
          <div class="card col-md-4 col-lg-4">
            <a href="{{route('alert.show', $alerta )}}">
            <div class="card-header card-header-success">
              <h3 class="card-title">{{$alerta->asunto }} </h3>
              <p class="card-category">Caso #{{$alerta->id}}. Creado el {{$alerta->created_at}}</p>
            </div>
            <div class="card-body ">
              {{Str::of($alerta->descripcion)->words(8, ' ...')}}
            </div>
          </a>
          </div>
        @endforeach
      </div>
      </div>
    </div>
  </div>
