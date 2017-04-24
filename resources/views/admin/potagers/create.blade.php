@extends('admin.layout')

@section('content')

<h1 class="page-header">
  Ajouter un Potager
</h1>

<div class="container-fluid">  
  <div class="row ">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel panel-default">
       
        <div class="panel-body">
          {!! Form::model($potager = new \App\Potager, ['url' => 'admin/potagers','class' => 'form-horizontal','files' => true, 'id' => 'potagerform']) !!}
          
            @include('admin.potagers.partials.form', ['submitButtonText' => 'Ajouter'])

          {!! Form::close() !!}

          @include('errors.list')
        </div>  
      </div>
    </div>
  </div>
</div>

@endsection

