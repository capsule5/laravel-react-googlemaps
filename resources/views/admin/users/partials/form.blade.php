



<div class="form-group">
  {!! Form::label('description',null,['class' => 'control-label col-md-4']) !!}
  <div class="col-md-6">{!! Form::textarea('description',null,['class' => 'form-control','id' => 'description']) !!}</div>
</div>


<div class="col-sm-2"></div><div class="col-sm-10"><small class="text-danger">{{ $errors->first('name') }}</small></div>
<div class="form-group">
    <label class="control-label col-md-4" for="name">Name:</label>
    <div class="col-md-6">
      {!! Form::text('name', null, array('class' => 'form-control', 'placeholder' => 'Enter name')) !!}
    </div>
</div>

<div class="col-md-6 col-md-offset-4">{!! Form::submit($submitButtonText,['class' => 'btn btn-primary']) !!}</div>





