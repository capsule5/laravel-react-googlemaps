<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('phone');
            $table->string('address');
            $table->timestamps();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('role_user', function (Blueprint $table) {
            
            // role belongsToMany users and user belongsToMany roles

            $table->integer('role_id')->unsigned()->index();
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');

            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
            $table->primary(['role_id', 'user_id']);
        });

        Schema::create('potagers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->longText('description')->nullable();
            $table->integer('is_valid')->default(0);
            $table->string('latitude',100);
            $table->string('longitude',100);
            $table->string('address',255);
            $table->string('city',100);
            $table->string('country',100);
            $table->string('postal_code',20);
            $table->string('type_address',100);
            $table->integer('surface');
            $table->integer('nb_users_max')->default(3);
            $table->timestamps();
        });

        Schema::create('potager_user', function (Blueprint $table) {
            
            // potager belongsToMany users and user belongsToMany potagers

            $table->integer('potager_id')->nullable()->unsigned();
            $table->foreign('potager_id')->references('id')->on('potagers');

            // potager belongsTo user with a role of 'owner'
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); 
            // if we delete the user, delete related items on cascade

            $table->timestamps();
            $table->primary(['potager_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('role_user');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('potager_user');
        Schema::dropIfExists('users');
        Schema::dropIfExists('potagers');
    }
}
