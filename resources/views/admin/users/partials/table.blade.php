<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Potager</th>
        <th>Mis à jour</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      @foreach($users as $user)
      <tr>
        <td>{{ $user->id }}</td>
        <td>{{ $user->name }}</td>
        <td>{{ $user->email }}</td>
        <td>{{ $user->phone }}</td>
        <td>{{ $user->address }}</td>
        <td>
          @if($user->hasPotager())
          @php ($potager = $user->potagers->first())
          <a href="{{ route('admin.potagers.edit', array($potager->id)) }}">{{$potager->name}}</a>
          @endif
        </td>
        <td>{{ $user->created_at }}</td>
        <td>
          {!! link_to_route('admin.users.edit', 'update', array($user->id,'role'=>$user->roles->first()->name), array('class' => 'btn btn-warning btn-block')) !!}
        </td>
        <td>
          {!! Form::open(array('method' => 'DELETE', 'route' => array('admin.users.destroy', $user->id))) !!}
						{!! Form::submit('delete', array('class' => 'btn btn-danger btn-block', 'onclick' => 'return confirm(\'Sure?\')')) !!}
					{!! Form::close() !!}
        </td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>