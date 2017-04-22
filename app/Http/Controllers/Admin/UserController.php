<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use App\Potager;

class UserController extends Controller
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

        return view('admin.dashboard',  compact('users', 'potagers', 'owners', 'gardeners'));
    }

    public function owners(){
        $users = User::with('potagers')
        ->owners()
        ->orderBy('id', 'desc')
        ->paginate(100);

        return view('admin.owners',  compact('users'));
    }

    public function gardeners(){
        $users = User::with('potagers')
        ->gardeners()
        ->orderBy('id', 'desc')
        ->paginate(100);

        return view('admin.gardeners',  compact('users'));
    }

    
}
