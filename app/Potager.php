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

    public function user() 
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

}
