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
        view()->composer('admin.users.partials.form', function($view){
            $view->with('potagers',Potager::pluck('name','id'));
        });
    }
}
