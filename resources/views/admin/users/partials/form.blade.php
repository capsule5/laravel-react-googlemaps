

@if($item->date_start->year < 1)
<div class="form-group">
  {!! Form::label(trans('app.title'),null,['class' => 'control-label col-md-3']) !!}
  <div class="col-md-7">{!! Form::text('title',null,['class' => 'form-control','maxlength' => '140']) !!}</div>
</div>
@else
<div class="form-group">
  <div class="col-md-7 col-md-offset-3">{!! Form::hidden('title',null) !!} <strong class="largetext">{{$item->title}}</strong></div>
</div>
@endif

<div class="form-group">
  {!! Form::label(trans('app.description'),null,['class' => 'control-label col-md-3']) !!}
  <div class="col-md-7">{!! Form::textarea('description',null,['class' => 'form-control','id' => 'description']) !!}</div>
</div>
<script>
    CKEDITOR.replace( 'description' );
</script>

{{-- <div class="form-group">
  {!! Form::label('date_start',null,['class' => 'control-label col-md-3']) !!}
  <div class="col-md-7">{!! Form::date('date_start',$item->date_start,['class' => 'form-control']) !!}</div>
</div>

 <div class="form-group">
  {!! Form::label('date_end',null,['class' => 'control-label col-md-3']) !!}
  <div class="col-md-7">{!! Form::date('date_end',null,['class' => 'form-control']) !!}</div>
</div> --}}

<div class="form-group">
  {!! Form::label('tag_list','Tags',['class' => 'control-label col-md-3']) !!}
  <div class="col-md-7">{!! Form::select('tag_list[]',$tags,null,['id' => 'taglist', 'class' => 'form-control', 'multiple']) !!}</div>
</div>

<!-- FILE SEND BASIC
<div class="form-group">
  {!! Form::label('img_url','Image',['class' => 'control-label col-md-3']) !!}
  <div class="col-md-7">
    @if($item->img_url != '')<img src="{{URL::to('/')}}/images/{{$item->img_url}}" alt="" width="100%"> @endif
    {!! Form::file('img_url',null,['class' => 'form-control']) !!}
  </div>
</div>
-->

<!-- FILE SEND ANGULAR AJAX -->
<div class="form-group" ng-init="@if($item->img_url != '') form.file_preview = '{{URL::to('/')}}/images/{{$item->img_url}}' @endif">
  {!! Form::label('img_url','Image',['class' => 'control-label col-md-3']) !!}
  <div class="col-md-7">
    <div class="drop-box" ngf-drop ngf-select ng-model="form.fields.file" ngf-change = "generatePreview(form.fields.file)" ngf-keep="false"
      ngf-drag-over-class="{accept:'dragover', reject:'dragover-err', delay:100}" ngf-multiple="false" ngf-allow-dir="true" accept="image/" >
      <div ng-show="!form.file_preview" class="txt">{!! trans('app.drop_image') !!}</div>
      <div ng-if="form.file_preview" class="img" ng-style="{ 'background-image' : 'url('+form.file_preview+')' }"></div>
    </div>
  </div>
</div>


{{--<div class="form-group">
  <div class="col-md-3"></div>
  <div class="col-md-7">
    <div class="table">
      <div class="table-row">
        <div class="table-cell">{!! Form::checkbox('is_ip',null,null) !!}</div>
        <div class="table-cell">
          <div class="pdin-l-10">Cocher si vous souhaitez que les utilisateurs aient la possibilité de voter sans s'inscrire au site. </div>
        </div>
      </div>
    </div>
  </div>
</div>--}}


<div class="form-group mgin-t-30 @if($item->date_start->year > 1) hidden @endif">
  <label class="control-label col-md-3">{!! trans('app.vote_system') !!}</label>
  <div class="col-md-7">
    <div class="table  mgin-b-10">
      <div class="table-row">
        <div class="table-cell" style="width:20px">{!! Form::radio('is_ip',0,true) !!}</div>
        <div class="table-cell">
          <div class="pdin-l-10">{!! trans('app.vote_by_mail') !!}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-3"></div>
  <div class="col-md-7">
    <div class="table ">
      <div class="table-row">
        <div class="table-cell" style="width:20px">{!! Form::radio('is_ip',1,null) !!}</div>
        <div class="table-cell">
          <div class="pdin-l-10"><!-- <i class="fa fa-bolt"></i> --> {!! trans('app.vote_by_ip') !!}</div>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="form-group">
  <div class="col-md-7 col-md-offset-3">
    <a href="" class="btn btn-primary" ng-click="form.send()">{{$submitButtonText}}</a>

    <div class="callback mgin-t-20">
      <span ng-bind-html="form.callback_message" class="smalltext"></span>
      <span ng-bind-html="form.progress"></span>{{-- --}}
      <div class="box-progress" ng-show="form.progress != ''">
        <div class="progress-bar" ng-style="{'width':form.progress}"></div>
      </div>
    </div>

  </div>
  <!--<div class="col-md-7 col-md-offset-3">{!! Form::submit($submitButtonText,['class' => 'btn btn-primary']) !!}</div>-->
</div>



@section('footer')
	@parent
	
	<script>
		$('#taglist').select2({
			placeholder:'Choose a tag',
			tags : true
		});
	</script>

@endsection