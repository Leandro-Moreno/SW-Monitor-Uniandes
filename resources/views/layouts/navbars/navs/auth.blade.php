<!-- Navbar -->
<nav id="app" class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
    <div class="container">
        <div class="navbar-wrapper">
            <a class="navbar-brand" href="{{ route('home') }}"><img width="120px" style="fill:white;" src='{{ asset('material') }}/img/logoUniandes.svg' /></a>
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
                    <a href="{{ route('hosts') }}" class="nav-link">
                        <i class="material-icons">dashboard</i> {{ __('Inicio') }}
                    </a>
                </li>
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
                    <b-dropdown size="lg"  variant="link" toggle-class="nav-link" no-caret>
                        <template v-slot:button-content class="nav-link">
                            <i class="material-icons">person</i>
                        </template>
                        <b-dropdown-item href="#">Action</b-dropdown-item>
                        <b-dropdown-item href="{{ route('profile.edit') }}">{{ __('Profile') }}</b-dropdown-item>
                        <b-dropdown-item href="#">{{ __('Settings') }}</b-dropdown-item>
                        <div class="dropdown-divider"></div>
                        <b-dropdown-item href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">{{ __('Log out') }}</b-dropdown-item>
                    </b-dropdown>
                </li>

                <li class="nav-item">
                    <div>
                        <buscar-component></buscar-component>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
