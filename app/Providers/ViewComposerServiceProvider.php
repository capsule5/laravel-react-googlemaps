<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use \App\Potager;

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->composeUserForm();
    }

    /**
     * Register the application services.
     *
     * @return void
     */

    private function composeUserForm()
    {
        // THIS IS BAD!
        $potagers = Potager::withCount('gardeners', 'owners')->get();
        $potagersAvailables = $potagers->filter(function($potager, $key){
            return $potager->nb_users_max > $potager->gardeners_count;
        });
        $potagersWithNoOwner = $potagers->filter(function($potager, $key){
            return $potager->owners_count === 0;
        });

        view()->composer('admin.users.partials.form', function($view) use($potagersAvailables, $potagersWithNoOwner){
            $view
            ->with('potagers',Potager::latest())
            ->with('potagersAvailables',$potagersAvailables)
            ->with('potagersWithNoOwner',$potagersWithNoOwner);
        });
    }
}
