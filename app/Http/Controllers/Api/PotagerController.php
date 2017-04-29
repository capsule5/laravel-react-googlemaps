<?php

namespace App\Http\Controllers\Api;

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
        return Potager::valid()
        ->with('users', 'users.roles')
        ->orderBy('updated_at', 'desc')
        ->get();
    }

    /**
     * Return the specified resource using JSON
     * 
     */
    public function show($id)
	{
		$potager = Potager::findOrFail($id);
        
        return response()->json(['data' => $potager, 'owners' => $potager->owners()->with('roles')->get(), 'gardeners' => $potager->gardeners()->get()]);
	}

    /**
     * Store a newly created resource in storage.
     * 
     */
    public function store(PotagerRequest $request)
    {
        $input = $request->all();
        $potager = potager::create($input);
        
        // return response()->json(['success' => true, 'request' => $request->all()]);
        return response()->json(['success' => true, 'potager_id' => $potager->id]);
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
        return response()->json(['success' => true, 'potager_id' => $potager->id]);
    }

    /**
     * Remove the specified resource from storage.
     * 
     */
    public function destroy($id)
    {
        $potager = Potager::findOrFail($id);
        $potager->users()->detach();
        $potager->delete();
        return response()->json(['success' => true]);
    }
}
