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
        <th>Propriétaire</th>
        <th>Jardiniers</th>
        <th>Créé le</th>
      </tr>
    </thead>
    <tbody>
      @foreach($potagers as $potager)
      <tr>
        <td>{{ $potager->id }}</td>
        <td>{{ $potager->name }}</td>
        <td>{{ $potager->surface }}</td>
        <td>{{ $potager->address }}</td>
        <td>
          @foreach($potager->owners()->get() as $owner)
            <a href="{{ route('admin.owners') }}">{{$owner->name}}</a>
          @endforeach
        </td>
        <td>
          <ul>
          @foreach($potager->gardeners()->get() as $gardener)
            <li><a href="{{ route('admin.gardeners') }}">{{$gardener->name}}</a></li>
          @endforeach
          </ul>
        </td>
        <td>{{ $potager->created_at }}</td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>

@endsection
