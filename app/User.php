<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Carbon\Carbon;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'firstname', 'lastname', 'address', 'phone', 'is_valid'
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

    // ROLE
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

    public function isAdmin()
    {
        return $this->hasRole('admin');
    }

    // MUTATORS
    public function setPasswordAttribute($pass){

        $this->attributes['password'] = bcrypt($pass);

    }

    // QUERY SCOPES
    //------------------------
    public function scopeValid($query) 
    {
        $query->where('is_valid',1);
    }

    public function scopeOwners($query) 
    {
        //$query->whereRole('owner');

        $query->whereHas('roles', function ($q) {
            $q->where('name','owner');
        });
    }

    public function scopeGardeners($query) 
    {
        //$query->whereRole('owner');

        $query->whereHas('roles', function ($q) {
            $q->where('name','gardener');
        });
    }

    // METHODS
    public function hasPotager() 
    {
        return $this->potagers->count() > 0;
    }

    public function updatedFromNow() 
    {
        return $this->updated_at->diffForHumans(Carbon::now());
    }


}
