<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Potager extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'is_validate', 'latitude', 'longitude', 'address', 'surface', 'nb_users_max'
    ];

    public function users() 
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

    public function owner() 
    {
        return $this->users()->owners();
    }

    public function gardeners() 
    {
        return $this->users()->gardeners();
    }

}
