@extends('admin.layout')

@section('content')

<h1 class="page-header">Dashboard</h1>

<div class="row placeholders">
  <div class="col-xs-6 col-sm-3 placeholder">
    <img src="http://fakeimg.pl/400x400/?text={{$potagers->count()}}" width="200" height="200" class="img-responsive">
    <h4>Potagers</h4>
  </div>
  <div class="col-xs-6 col-sm-3 placeholder">
    <img src="http://fakeimg.pl/400x400/?text={{$owners->count()}}" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
    <h4>Propriétaires</h4>
  </div>
  <div class="col-xs-6 col-sm-3 placeholder">
    <img src="http://fakeimg.pl/400x400/?text={{$gardeners->count()}}" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
    <h4>Jardiniers</h4>
  </div>
</div>

<h2 class="sub-header">Users</h2>
<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Role</th>
        <th>Potager</th>
        <th>Date</th>
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
        <td>{{ $user->roles->first()->name }}</td>
        <td>{{ $user->hasPotager() ? $user->potagers->first()->name : '' }}</td>
        <td>{{ $user->created_at }}</td>
        <td></td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>

@endsection
