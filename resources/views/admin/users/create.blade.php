
@extends('template')

@section('title'){{ trans('app.add_debate') }} @stop
@section('description'){{ trans('app.add_debate') }} @stop
@section('keywords')keywords @stop
@section('image')img/logo.png @stop

@section('content')
  <div class="page container-fluid" zum-waypoint="waypoints" down="wp_container.down" up="wp_container.up" ng-class="{fixednav : waypoints.wp_container.down}">  
    <div class="row" ng-controller="ItemFormCtrl">
      <div class="col-md-8 col-md-offset-2 xs-pdin-lr-0">
        <div class="panel panel-default">
          <div class="panel-heading">{{ trans('app.add_debate') }}</div>
          <div class="panel-body">
            {!! Form::model($item = new \App\Item, ['url' => 'debats','class' => 'form-horizontal','files' => true, 'id' => 'itemform']) !!}
            
              @include('items.partials.form', ['submitButtonText' => trans('app.add')])

            {!! Form::close() !!}

            @include('errors.list')
          </div>  
        </div>
      </div>
    </div>
  </div>
@stop

