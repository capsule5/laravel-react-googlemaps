<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests\PotagerRequest;

use App\User;
use App\Potager;

class PotagerController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $potagers = Potager::with('users')
        ->orderBy('id', 'desc')
        ->paginate(100);;

        return view('admin.potagers.index',  compact('potagers'));
    }

    /**
     * Show the form for creating a new resource.
     * 
     */
    public function create()
    {   
        return view('admin.potagers.create');
    }

    /**
     * Store a newly created resource in storage.
     * 
     */
    public function store(PotagerRequest $request)
    {
        $input = $request->all();

        $potager = potager::create($input);

        return redirect('admin/potagers'); // ->withInput();
    }
	
	/**
     * Show the form for editing the specified resource.
     * 
     */
    public function edit($id)
    {
        $potager = Potager::findOrFail($id);  

        return view('admin.potagers.edit',compact('potager'));
    }

    /**
     * Update the specified resource in storage.
     * 
     */
    public function update(PotagerRequest $request, $id)
    {   
        $input = $request->all();
        $potager = Potager::findOrFail($id);
        $potager->update($input);

        return redirect('admin/potagers');
    }

    /**
     * Remove the specified resource from storage.
     * 
     */
    public function destroy($id)
    {
        $potager = Potager::findOrFail($id);
       
        $potager->delete();

        return back()->withInput();
    }
}
