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

    /*// create roles
    $admin = Role::create(['name' => 'admin']);
    $owner = Role::create(['name' => 'owner']);
    $gardener = Role::create(['name' => 'gardener']);

    // create admin
    $admin = User::create([
        'email' => 'boutchaboutch@gmail.com',
        'name' => 'admin',
        'password' => bcrypt('pdmpa74chx')
    ]);
    $admin->assignRole('admin');

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
        'nb_users_max' => 3
    ]);

    $owner->potagers()->sync($potager);

    // create gardeners
    $gardener1 = User::create([
        'email' => 'gardener1@test.com',
        'name' => 'gardener1',
        'password' => bcrypt('pass')
    ]);
    $gardener1->assignRole('gardener');
    $gardener1->potagers()->sync($potager);

    $gardener2 = User::create([
        'email' => 'gardener2@test.com',
        'name' => 'gardener2',
        'password' => bcrypt('pass')
    ]);
    $gardener2->assignRole('gardener');
    $gardener2->potagers()->attach($potager);
    // $gardener2->potagers()->detach($potager);


    $potager_owner = $potager->owners()->get();
    $potager_gardener = $potager->gardeners()->get();
    $potagerRemaining = $potager->remainingGardeners();


    $roles = Role::all();
    $users = User::with('roles', 'potagers')->get();
    $potagers = Potager::with('users')->get();
    $owners = User::owners()->get();
    $gardeners = User::gardeners()->get();

    return Response::json(compact('roles', 'users', 'potagers', 'owners', 'gardeners', 'potager_owner', 'potager_gardener', 'potagerRemaining'));
    */
    return view('welcome', compact('users', 'roles'));
});

Auth::routes();

Route::get('/home', 'HomeController@index');

Route::group(array('prefix' => 'admin', 'middleware' => ['auth', 'admin']), function() {	
    Route::resource('users', 'Admin\UserController');
    Route::resource('potagers', 'Admin\PotagerController');
	Route::get('dashboard', 'Admin\DashboardController@index')->name('dashboard');
    Route::get('gardeners', 'Admin\UserController@gardeners')->name('gardeners');
    Route::get('owners', 'Admin\UserController@owners')->name('owners');
    
});