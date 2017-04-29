<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests\UserRequest;

use App\User;

class UserController extends Controller
{

    /**
     * Store a newly created resource in storage.
     * 
     */
    public function store(UserRequest $request)
    {
        $input = $request->all();
        $user = User::create($input);
        $user->assignRole($request->input('role'));

        if($request->input('potager_id') && $request->input('potager_id') !==''){
            $user->potagers()->sync($request->input('potager_id'));
        }
        
        return response()->json(['success' => true, 'user_id' => $user->id]);
        // return response()->json(['success' => true]);
    }
}
