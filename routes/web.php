<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\User;
use App\Role;
use App\Potager;

Route::get('/', function () {

    // create roles
    $admin = Role::create(['name' => 'admin']);
    $owner = Role::create(['name' => 'owner']);
    $gardener = Role::create(['name' => 'gardener']);

    // create owner
    $owner = User::create([
        'email' => 'owner@test.com',
        'name' => 'owner',
        'password' => bcrypt('pass')
    ]);

    $owner->assignRole('owner');

    // create potager
    $potager = Potager::create([
        'name' => 'potager1',
        'description' => 'desc',
        'is_validate' => 1,
        'latitude' => 40,
        'longitude' => 45,
        'address' => '123 rue de Passy',
        'surface' => 30,
        'nb_users_max' => 1
    ]);

    $owner->potagers()->attach($potager);


    $users = User::with('roles', 'potagers')->get();
    $roles = Role::all();
    $owners = User::owners()->get();

    // return response(view('welcome',array('roles'=>$roles)),200, ['Content-TYpe' => 'application/json']);
    return Response::json(compact('users', 'roles', 'owners'));
    
    return view('welcome', compact('users', 'roles'));
});

Auth::routes();

Route::get('/home', 'HomeController@index');

Route::group(array('prefix' => 'admin', 'middleware' => ['auth', 'admin']), function() {	
	Route::get('dashboard', 'Admin\DashboardController@index');
});