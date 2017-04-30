@extends('admin.layout')

@section('content')

<h1 class="page-header">Potagers</h1>

<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Surface</th>
        <th>Address</th>
        <th>City</th>
        <th>Propriétaire</th>
        <th>Jardiniers</th>
        <th>Status</th>
        <th>Online</th>
        <th>Mis à jour</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      @foreach($potagers as $potager)
      <tr>
        <td>{{ $potager->id }}</td>
        <td>{{ $potager->name }}</td>
        <td>{{ $potager->surface }}</td>
        <td>{{ str_limit($potager->address, $limit = 30, $end = '...') }}</td>
        <td>{{ $potager->city }}</td>
        
        <td>
          @foreach($potager->owners()->get() as $owner)
            <a href="{{ route('admin.users.edit', array($owner->id,'role'=>$owner->roles->first()->name)) }}">{{$owner->name}}</a>
          @endforeach
        </td>
        <td>
          <ul>
          @foreach($potager->gardeners()->get() as $gardener)
            <li><a href="{{ route('admin.users.edit', array($gardener->id,'role'=>$gardener->roles->first()->name)) }}">{{$gardener->name}}</a></li>
          @endforeach
          </ul>
        </td>
        
        <td>{{ $potager->remainingGardenersText('short') }} ({{ $potager->nbGardeners() }}/{{ $potager->nb_users_max }})</td>
        <td>
          @if($potager->is_valid)
            <div class="status-circle green"></div>
          @else
            <div class="status-circle orange"></div>
          @endif
        </td>
        <td>{{ $potager->updatedFromNow() }}</td>
        <td>
          {!! link_to_route('admin.potagers.edit', 'update', array($potager->id), array('class' => 'btn btn-warning btn-block')) !!}
        </td>
        <td>
          {!! Form::open(array('method' => 'DELETE', 'route' => array('admin.potagers.destroy', $potager->id))) !!}
						{!! Form::submit('delete', array('class' => 'btn btn-danger btn-block', 'onclick' => 'return confirm(\'Sure?\')')) !!}
					{!! Form::close() !!}
        </td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>

@endsection
