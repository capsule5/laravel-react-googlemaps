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
        'name', 'description', 'is_valid', 'latitude', 'longitude', 'address', 'city', 'country', 'postal_code', 'type_address', 'surface', 'nb_users_max'
    ];

    public function users() 
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

    public function scopeValid($query) 
    {
        $query->where('is_valid',1);
    }

    public function owners() 
    {
        return $this->users()->owners();
    }

    public function gardeners() 
    {
        return $this->users()->gardeners();
    }

    public function nbGardeners() 
    {
        return $this->gardeners()->count();
    }

    public function remainingGardeners() 
    {
        return $this->nb_users_max - $this->nbGardeners();
    }
    public function remainingGardenersText($format) 
    {
        $count = $this->nb_users_max - $this->nbGardeners();

        if($count<=0){
            return 'COMPLET';
        } else if($count===1 && $format !== 'short'){
            return '1 place disponible';
        } 
        
       return ($format==='short') ? $count.' pl. disp.' : $count.' places disponibles';
    }

}
