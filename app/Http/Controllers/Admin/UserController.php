<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests\UserRequest;

use App\User;
use App\Potager;

use \Redirect;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     */
    public function index()
    {
        // $users = User::with('potagers')
        // ->orderBy('id', 'desc')
		// ->paginate(100);

        // $owners = User::owners()->get();
        // $gardeners = User::gardeners()->get();
        // $potagers = Potager::all();		

        // return view('admin.dashboard',  compact('users', 'potagers', 'owners', 'gardeners'));
    }

    /**
     * Show the form for creating a new resource.
     * 
     */
    public function create()
    {   
        return view('admin.users.create');
    }

    /**
     * Store a newly created resource in storage.
     * 
     */
    public function store(UserRequest $request)
    {
        $input = $request->all();

        $user = User::create($input);
        $user->assignRole($request->input('role'));

        if($request->input('potager_id') && $request->input('potager_id') !==''){
            $user->potagers()->sync($request->input('potager_id'));
        }
        // $user->potagers()->sync($request->input('potager_id'));


        $route = 'admin/'.$request->input('role').'s';
        return redirect($route); //->with('ok', $input); // ->withInput();
    }
	
	/**
     * Show the form for editing the specified resource.
     * 
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);  

        return view('admin.users.edit',compact('user'));
    }

    /**
     * Update the specified resource in storage.
     * 
     */
    public function update(UserRequest $request, $id)
    {   
        $input = $request->all();
        $user = User::findOrFail($id);
        $user->update($input);
        
        $user->potagers()->detach();
        if($request->input('potager_id')){
            $user->potagers()->sync($request->input('potager_id'));
        }
        

        //return redirect()->action('UserController@show', [$item->slug]);
        $route = 'admin/'.$request->input('role').'s';
        return redirect($route);
    }

    /**
     * Remove the specified resource from storage.
     * 
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
       
        $user->delete();

        return back()->withInput();
    }


    /**
     * Admin list views for owners and gardeners
     * 
     */
    public function owners(){
        $users = User::with('potagers')
        ->owners()
        ->orderBy('updated_at', 'desc')
        ->paginate(100);

        return view('admin.users.owners',  compact('users'));
    }

    public function gardeners(){
        $users = User::with('potagers')
        ->gardeners()
        ->orderBy('updated_at', 'desc')
        ->paginate(100);

        return view('admin.users.gardeners',  compact('users'));
    }

    
}
