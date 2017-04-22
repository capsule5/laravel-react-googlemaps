@extends('admin.layout')

@section('content')

<h1 class="page-header">Propriétaires</h1>

<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
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
        <td>{{ $user->hasPotager() ? $user->potagers->first()->name : '' }}</td>
        <td>{{ $user->created_at }}</td>
        <td></td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>

@endsection
