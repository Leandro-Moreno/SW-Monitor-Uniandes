<!-- Navbar -->
<nav id="app" class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white">
  <div class="container">
    <div class="navbar-wrapper">
      <a class="navbar-brand" href="{{ route('hosts') }}"><img width="120px" style="fill:white;" src='{{ asset('material') }}/img/logoUniandes.svg' /></a>
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
      <span class="sr-only">Toggle navigation</span>
      <span class="navbar-toggler-icon icon-bar"></span>
      <span class="navbar-toggler-icon icon-bar"></span>
      <span class="navbar-toggler-icon icon-bar"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="{{ route('sitios-web') }}" class="nav-link">
            <i class="material-icons">dashboard</i> {{ __('Sitios Web') }}
          </a>
        </li>
        <li class="nav-item">
          <a href="{{ route('servidores') }}" class="nav-link">
            <i class="material-icons">dashboard</i> {{ __('Servidores') }}
          </a>
        </li>
        <li class="nav-item">
          <a href="{{ route('database') }}" class="nav-link">
            <i class="material-icons">dashboard</i> {{ __('Bases de Datos') }}
          </a>
        </li>
          <li class="nav-item">
              <buscar-component></buscar-component>
          </li>
        <li class="nav-item{{ $activePage == 'register' ? ' active' : '' }}">
          <a href="{{ route('register') }}" class="nav-link">
            <i class="material-icons">person_add</i> {{ __('Registro') }}
          </a>
        </li>
        <li class="nav-item{{ $activePage == 'login' ? ' active' : '' }}">
          <a href="{{ route('login') }}" class="nav-link">
            <i class="material-icons">fingerprint</i> {{ __('Ingresar') }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<!-- End Navbar -->
