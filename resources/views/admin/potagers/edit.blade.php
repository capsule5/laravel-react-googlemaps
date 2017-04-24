@extends('admin.layout')

@section('content')

<h1 class="page-header">
  Editer un Potager
</h1>

<div class="container-fluid">  
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel panel-default">
        <div class="panel-heading">{{ $potager->name }}</div>
        <div class="panel-body">
          {!! Form::model($potager, ['method' => 'PATCH','action' => ['Admin\PotagerController@update',$potager->id],'class' => 'form-horizontal','files' => true, 'id' => 'potagerform']) !!}
          
            @include('admin.potagers.partials.form', ['submitButtonText' => 'Valider'])

          {!! Form::close() !!}

          @include('errors.list')
        </div>  
      </div>
    </div>
  </div>
</div>

@endsection

