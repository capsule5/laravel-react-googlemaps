@extends('admin.layout')

@section('content')

<h1 class="page-header">Dashboard</h1>

<div class="row placeholders">
  <div class="col-xs-6 col-sm-3 placeholder">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
    <h4>Label</h4>
    <span class="text-muted">Something else</span>
  </div>
  <div class="col-xs-6 col-sm-3 placeholder">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
    <h4>Label</h4>
    <span class="text-muted">Something else</span>
  </div>
  <div class="col-xs-6 col-sm-3 placeholder">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
    <h4>Label</h4>
    <span class="text-muted">Something else</span>
  </div>
  <div class="col-xs-6 col-sm-3 placeholder">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
    <h4>Label</h4>
    <span class="text-muted">Something else</span>
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
        <td>{{ $user->created_at }}</td>
        <td></td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>

@endsection
