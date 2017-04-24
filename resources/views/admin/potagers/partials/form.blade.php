<div class="form-group">
    <label class="control-label col-md-4" for="status">ONLINE:</label>
    <div class="col-md-6">
        <label class="radio-inline">{!! Form::radio('is_valid', 1, ($potager->is_valid==1) ? true : false, array('class' => '')) !!} YES</label>
    <label class="radio-inline">{!! Form::radio('is_valid', 0, ($potager->is_valid==0) ? true : false, array('class' => '')) !!} NO</label>
    </div>
</div>

<div class="col-md-8 col-md-offset-4"><small class="text-danger">{{ $errors->first('name') }}</small></div>
<div class="form-group">
    {!! Form::label('name:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::text('name', null, array('class' => 'form-control', 'placeholder' => 'Enter name')) !!}
    </div>
</div>

<div class="col-md-8 col-md-offset-4"><small class="text-danger">{{ $errors->first('description') }}</small></div>
<div class="form-group">
    {!! Form::label('description:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::textarea('description',null,['class' => 'form-control','id' => 'description', 'placeholder' => 'Enter description']) !!}
    </div>
</div>



<div class="col-md-8 col-md-offset-4"><small class="text-danger">{{ $errors->first('surface') }}</small></div>
<div class="form-group">
    {!! Form::label('surface (m²):',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::text('surface', null, array('class' => 'form-control', 'placeholder' => 'Enter surface')) !!}
    </div>
</div>

<div class="col-md-8 col-md-offset-4"><small class="text-danger">{{ $errors->first('nb_users_max') }}</small></div>
<div class="form-group">
    {!! Form::label('Jardiniers max:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      {!! Form::select('nb_users_max', [0,1,2,3,4,5,6,7,8,9,10], 3, array('class' => 'form-control')) !!}
    </div>
</div>

@include('admin.partials.address_locator')

<div class="form-group"></div>
<div class="form-group">
  <div class="col-md-6 col-md-offset-4">{!! Form::submit($submitButtonText,['class' => 'btn btn-primary']) !!}</div>
</div>


