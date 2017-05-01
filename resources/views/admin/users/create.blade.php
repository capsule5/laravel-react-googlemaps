@extends('admin.layout')

@section('content')

<h1 class="page-header">
  Ajouter un
  @php ($role = app('request')->input('role'))
  @if ($role === 'owner')
      propriétaire
  @elseif ($role === 'gardener')
      jardinier
  @else
      ?
  @endif
</h1>

<div class="container-fluid">  
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel panel-default">
       
        <div class="panel-body">
          {!! Form::model($user = new \App\User, ['url' => 'admin/users','class' => 'form-horizontal','files' => true, 'id' => 'userform']) !!}
          
            @include('admin.users.partials.form', ['submitButtonText' => 'Ajouter', 'role'])

          {!! Form::close() !!}

          @include('errors.list')
        </div>  
      </div>
    </div>
  </div>
</div>

@endsection

