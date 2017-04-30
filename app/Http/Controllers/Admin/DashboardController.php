<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use App\Potager;

class DashboardController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('potagers')
        ->orderBy('id', 'desc')
		->paginate(100);

        $owners = User::owners()->get();
        $gardeners = User::gardeners()->get();

        $potagers = Potager::all();		

        return view('admin.dashboard.index',  compact('users', 'potagers', 'owners', 'gardeners'));


        // return User::join('role_user', 'role_user.user_id', '=', 'users.id')->get();
        // return Potager::with('gardeners', 'owners')->get();
        // return Potager::withCount(['users' => function($query) {
        //             $query->whereHas('roles', function ($q) {
        //                 $q->where('name', '=', 'gardener');
        //             });
        //         }])
        //         ->where('nb_users_max', '>', 'users_count');

        //return Potager::withCount('gardeners')->where('nb_users_max', '>', 'gardeners_count')->get();

        // $locations = Potager::withCount('gardeners')->get();
        // return $locations->filter(function($location, $key){
        //     return $location->nb_users_max > $location->gardeners_count;
        // });

    }
}
