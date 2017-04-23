<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use App\Potager;

class PotagerController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $potagers = Potager::with('users')
        ->orderBy('id', 'desc')
        ->paginate(100);;

        return view('admin.potagers.index',  compact('potagers'));
    }
}
