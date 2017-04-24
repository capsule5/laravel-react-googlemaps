{!! Form::hidden('role',$role) !!}

<div class="col-md-8 col-md-offset-4"><small class="text-danger">{{ $errors->first('name') }}</small></div>
<div class="form-group">
    {!! Form::label('*name:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::text('name', null, array('class' => 'form-control', 'placeholder' => 'Enter name')) !!}
    </div>
</div>

<div class="col-md-8 col-md-offset-4"><small class="text-danger">{{ $errors->first('email') }}</small></div>
<div class="form-group">
    {!! Form::label('*email:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::text('email', null, array('class' => 'form-control', 'placeholder' => 'Enter email')) !!}
    </div>
</div>

<div class="col-md-8 col-md-offset-4"><small class="text-danger">{{ $errors->first('phone') }}</small></div>
<div class="form-group">
    {!! Form::label('*phone:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::text('phone', null, array('class' => 'form-control', 'placeholder' => 'Enter phone')) !!}
    </div>
</div>

<div class="col-md-8 col-md-offset-4"><small class="text-danger">{{ $errors->first('address') }}</small></div>
<div class="form-group">
    {!! Form::label('*address:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::text('address', null, array('class' => 'form-control', 'placeholder' => 'Enter address')) !!}
    </div>
</div>

<div class="col-md-8 col-md-offset-4"><small class="text-danger">{{ $errors->first('firstname') }}</small></div>
<div class="form-group">
    {!! Form::label('firstname:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::text('firstname', null, array('class' => 'form-control', 'placeholder' => 'Enter firstname')) !!}
    </div>
</div>

<div class="col-md-8 col-md-offset-4"><small class="text-danger">{{ $errors->first('lastname') }}</small></div>
<div class="form-group">
    {!! Form::label('lastname:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::text('lastname', null, array('class' => 'form-control', 'placeholder' => 'Enter lastname')) !!}
    </div>
</div>



<div class="form-group" style='margin-top:30px'>
    {!! Form::label('Potager:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::select('potager_id', array('0' => 'Please Select') + $potagers->toArray(), ! empty($user) && $user->hasPotager() ? $user->potagers->first()->id : null, array('class' => 'form-control')) !!}
    </div>
</div>

<div class="form-group">
  <div class="col-md-6 col-md-offset-4">{!! Form::submit($submitButtonText,['class' => 'btn btn-primary']) !!}</div>
</div>




