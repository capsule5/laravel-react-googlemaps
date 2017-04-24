<ul class="nav nav-sidebar">
  <li><a href="{{route('admin.users.create', ['role' => 'owner'])}}">Ajouter un propriétaire</a></li>
  <li><a href="{{route('admin.users.create', ['role' => 'gardener'])}}">Ajouter un jardinier</a></li>
  <li><a href="{{route('admin.potagers.create')}}">Ajouter un potager</a></li>
</ul>
