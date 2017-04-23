<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        return view('users.create');
    }

    /**
     * Store a newly created resource in storage.
     * 
     */
    /*public function store(ItemRequest $request)
    {
        $input = $request->all();
        $input['choices'] = 'oui,non';

        //upload image
        if($request->file('file')) $input['img_url'] = $this->processImage($request->file('file'));

        //is ip
        $input['is_ip'] = ($input['is_ip'] == '1') ? 1 : 0;

        //create item
        //$item = new Item($input);
        //Auth::user()->items()->save($item);
        $item = Auth::user()->items()->create($input); //user_id automatically set :)
        
        //sync tags
        $this->syncTags($item,$request->input('tag_list'));

        return response()->json(array('success' => true, 'redirect' => action('ItemController@show', [$item->slug]) ));
        //return redirect('debats');
    }*/
	
	/**
     * Show the form for editing the specified resource.
     * 
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);  

        return view('users.edit',compact('user'));
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
        ->orderBy('id', 'desc')
        ->paginate(100);

        return view('admin.owners',  compact('users'));
    }

    public function gardeners(){
        $users = User::with('potagers')
        ->gardeners()
        ->orderBy('id', 'desc')
        ->paginate(100);

        return view('admin.gardeners',  compact('users'));
    }

    
}
