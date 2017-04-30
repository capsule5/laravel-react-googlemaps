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

    protected $appends = ['is_full', 'remaining_gardeners'];

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


    // potagers avec capacité supérieure au nb de jardiniers
    public function scopeAvailables($query) 
    {
        //$query->where('nb_users_max','>',$this->nbGardeners());
        // $query->whereHas('gardeners', function($q) {
        //     $q->where('nb_users_max','>',$q->gardeners()->count());
        // });
        //$query->has('gardeners', '<', 'nb_users_max');
        $query->withCount('gardeners')->where('nb_users_max', '>', 'gardeners_count');
    }

    public function getAvailables()
    {
        $potagers = $this->withCount('gardeners')->get();
        return $potagers->filter(function($potager, $key){
            return $potager->nb_users_max > $potager->gardeners_count;
        });
    }

    // nb de jardiniers
    public function nbGardeners() 
    {
        return $this->gardeners()->count();
    }

    //places de jardiniers restantes
    public function remainingGardeners() 
    {
        return $this->nb_users_max - $this->nbGardeners();
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
