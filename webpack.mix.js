const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/material-dashboard.scss', 'public/material/css')
    .options({
        autoprefixer: {
            options: {
                browsers: [
                    'last 2 versions',
                ]
            }
        }
   })
    .version();
mix.combine(['public/material/js/core/popper.min.js',
'public/material/js/plugins/perfect-scrollbar.jquery.min.js',
'public/material/js/core/popper.min.js',
'public/material/js/plugins/moment.min.js',
'public/material/js/plugins/jquery.validate.min.js',
'public/material/js/plugins/bootstrap-selectpicker.js',
'public/material/js/plugins/bootstrap-datetimepicker.min.js',
'public/material/js/plugins/jquery.dataTables.min.js',
'public/material/js/plugins/bootstrap-tagsinput.js',
'public/material/js/plugins/jasny-bootstrap.min.js',
'public/material/js/plugins/fullcalendar.min.js',
'public/material/js/plugins/jquery-jvectormap.js',
'public/material/js/plugins/nouislider.min.js',
'public/material/js/plugins/arrive.min.js',
'public/material/js/plugins/chartist.min.js',
'public/material/js/plugins/bootstrap-notify.js',
'public/material/js/plugins/sweetalert2.js'],
'public/js/merged.js');
mix.minify('public/material/js/material-dashboard.js');
mix.browserSync('materia.test');
