<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests\UserRequest;

use App\User;
use App\Http\Controllers\Traits\UserTrait;

class UserController extends Controller
{
    use UserTrait;

    /**
     * Store a newly created resource in storage.
     * 
     */
    public function store(UserRequest $request)
    {
        $user = $this->storeUser($request);
        
        return response()->json(['success' => true, 'user_id' => $user->id]);
        // return response()->json(['success' => true]);
    }
}
