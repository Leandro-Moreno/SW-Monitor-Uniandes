@extends('layouts.app', ['activePage' => 'eventos', 'titlePage' => __('Eventos')])

@section('content')
  
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
