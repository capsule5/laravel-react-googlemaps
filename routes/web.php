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



Route::get('/', function () {
    // return Response::json(compact('roles', 'users', 'potagers', 'owners', 'gardeners', 'potager_owner', 'potager_gardener', 'potagerRemaining'));
    // return Response::json(compact('roles', 'users'));
    
    return view('welcome');
});

Auth::routes();


// Route::get('/home', 'HomeController@index');
Route::get('/admin', function () {
    return redirect('admin/dashboard');
});

Route::group(array('prefix' => 'admin', 'as' => 'admin.', 'middleware' => ['auth', 'admin']), function() {	
    Route::resource('users', 'Admin\UserController');
    Route::resource('potagers', 'Admin\PotagerController');
	Route::get('dashboard', 'Admin\DashboardController@index')->name('dashboard.index');
    Route::get('gardeners', 'Admin\UserController@gardeners')->name('users.gardeners');
    Route::get('owners', 'Admin\UserController@owners')->name('users.owners');
});