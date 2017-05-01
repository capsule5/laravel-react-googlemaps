<?php

use Illuminate\Database\Seeder;

use App\User;
use App\Role;
use App\Potager;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        
        // create roles
        $admin = Role::create(['name' => 'admin']);
        $owner = Role::create(['name' => 'owner']);
        $gardener = Role::create(['name' => 'gardener']);

        // create admin
        $admin = User::create([
            'email' => 'boutchaboutch@gmail.com',
            'name' => 'admin',
            'password' => bcrypt('pdmpa74chx')
        ]);
        $admin->assignRole('admin');
        
        // create owner
        $owner = User::create([
            'email' => 'owner@test.com',
            'name' => 'owner',
            'password' => bcrypt('pass')
        ]);
        $owner->assignRole('owner');

        // create potager
        $potager = Potager::create([
            'name' => 'potager1',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'is_valid' => 1,
            'latitude' => 45.9440912,
            'longitude' => 6.8939581,
            'address' => '83 Chemin des Mogeons, 74400 Chamonix-Mont-Blanc, France',
            'type_address' => 'street_address',
            'city' => 'Chamonix-Mont-Blanc',
            'country' => 'France',
            'postal_code' => '74400',
            'surface' => 30,
            'nb_users_max' => 3
        ]);

        $owner->potagers()->sync($potager);

        // create gardeners
        $gardener1 = User::create([
            'email' => 'gardener1@test.com',
            'name' => 'gardener1',
            'password' => bcrypt('pass')
        ]);
        $gardener1->assignRole('gardener');
        $gardener1->potagers()->sync($potager);

        $gardener2 = User::create([
            'email' => 'gardener2@test.com',
            'name' => 'gardener2',
            'password' => bcrypt('pass')
        ]);
        $gardener2->assignRole('gardener');
        $gardener2->potagers()->attach($potager);
    }
}
