<?php

namespace App\Http\Controllers\Traits;
use App\User;

trait UserTrait
{
    protected function storeUser($request)
    {
        $input = $request->all();
        $role = $request->input('role');

        $user = User::create($input);
        $user->assignRole($role);

        if($role === 'owner'){
            // we dont need owner to be validated
            $user->is_valid = 1;
            $user->save();
        }

        if($request->input('potager_id') && $request->input('potager_id') !==''){
            $user->potagers()->sync($request->input('potager_id'));
        }

        return $user;
    }
}
