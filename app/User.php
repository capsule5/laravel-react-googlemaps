<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'firstname', 'lastname', 'address'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function roles()
    {
        return $this->belongsToMany('App\Role')->withTimestamps();
    }

    public function potagers() 
    {
        return $this->belongsToMany('App\Potager')->withTimestamps();
    }



    public function assignRole($role)
    {
        return $this->roles()->save(
            \App\Role::whereName($role)->firstOrFail()
        );  
    }

    public function hasRole($role)
    {
        return $this->roles->contains('name', $role);
    }


    public function scopeOwners($query) 
    {
        //$query->whereRole('owner');

        $query->whereHas('roles', function ($q) {
            $q->where('name','owner');
        });
    }
}
