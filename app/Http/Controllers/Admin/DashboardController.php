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
    }
}
