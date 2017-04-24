<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Admin</title>

    <!-- Styles -->
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">

    
    <!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>

    
</head>
<body>
    <!--<div id="app">
        
        <div class="container-fluid">
            <nav class="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
                @include('admin.partials.sidebar')
            </nav>
            <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                @yield('content')
            </main>
        </div>
    </div>-->
    
    @include('admin.partials.nav')
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
            @include('admin.partials.sidebar')
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            @yield('content')
        </div>
      </div>
    </div>

    <!-- Scripts -->
    <!--<script src="{{ asset('js/app.js') }}"></script>-->
    
</body>
</html>
