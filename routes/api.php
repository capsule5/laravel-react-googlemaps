<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('potagers', 'Api\PotagerController', array('except' => array('create','edit')));
//Route::post('potagerWithUser', 'Api\PotagerController@storePotagerWithUser')->name('potagers.storeWithUser');
Route::resource('users', 'Api\UserController', array('only' => array('store')));