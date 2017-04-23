@extends('admin.layout')

@section('content')

<h1 class="page-header">
  Editer un
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
        <div class="panel-heading">{{ $user->name }}</div>
        <div class="panel-body">
          {!! Form::model($user, ['method' => 'PATCH','action' => ['Admin\UserController@update',$user->id],'class' => 'form-horizontal','files' => true, 'id' => 'userform']) !!}
          
            @include('admin.users.partials.form', ['submitButtonText' => 'Valider', 'role'])

          {!! Form::close() !!}

          @include('errors.list')
        </div>  
      </div>
    </div>
  </div>
</div>

@endsection

