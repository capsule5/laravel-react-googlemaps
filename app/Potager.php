<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

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

    protected $appends = ['is_full', 'remaining_gardeners', 'gardeners_count'];

    // RELATIONS
    //------------------------

    public function users() 
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

    public function owners() 
    {
        return $this->users()->owners();
    }

    public function gardeners() 
    {
        return $this->users()->gardeners();
    }

    public function gardenersCount()
    {
        return $this->belongsToMany('App\User')
            ->whereHas('roles', function ($q) {
                $q->where('name','gardener');
            })
            ->selectRaw('count(users.id) as nb_gardeners')
            ->groupBy('pivot_potager_id');
    }

    // QUERY SCOPES
    //------------------------

    public function scopeValid($query) 
    {
        $query->where('is_valid',1);
    }
    
    //METHODS
    //------------------------

    public function getIsFullAttribute()
    {
        return $this->attributes['name'] = $this->remainingGardeners() <= 0;
    }

    public function getRemainingGardenersAttribute()
    {
        return $this->attributes['name'] = $this->remainingGardeners();
    }

    public function getGardenersCountAttribute()
    {
        return $this->attributes['name'] = $this->nbValidGardeners();
    }


    // nb de jardiniers
    public function nbGardeners() 
    {
        return $this->gardeners()->count();
    }
    public function nbValidGardeners() 
    {
        return $this->gardeners()->valid()->count();
    }

    //places de jardiniers restantes
    public function remainingGardeners() 
    {
        return $this->nb_users_max - $this->nbValidGardeners();
    }

    // places de jardiniers restantes en texte
    public function remainingGardenersText($format) 
    {
        $count = $this->remainingGardeners();

        if($count<=0){
            return 'COMPLET';
        } else if($count===1 && $format !== 'short'){
            return '1 place disponible';
        } 
        
       return ($format==='short') ? $count.' pl. disp.' : $count.' places disponibles';
    }

    // mis à jour depuis x en texte
    public function updatedFromNow() 
    {
        return $this->updated_at->diffForHumans(Carbon::now());
    }

}
