<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\Rule;

use Auth;

class PotagerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // return Auth::user()->isAdmin();
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        //'name', 'description', 'is_validate', 'latitude', 'longitude', 'address', 'surface', 'nb_users_max'
        switch($this->method())
        {
            case 'POST':
            {
                return [
                    'name' => 'required|min:3|max:20',
                    'address' => 'required|unique:potagers',
                    'city' => 'required',
                    'country' => 'required',
                    'postal_code' => 'required',
                    'type_address' => ['required', Rule::in(['street_address'])],
                    'latitude' => 'required',
                    'longitude' => 'required',
                    'surface' => 'required|integer',
                    'nb_users_max' => 'required|integer',
                ];
            }
            case 'PATCH':
            {
                return [
                    'name' => 'required|min:3|max:20',
                    'address' => ['required',Rule::unique('potagers')->ignore($this->route('potager'))],
                    'city' => 'required',
                    'country' => 'required',
                    'postal_code' => 'required',
                    'type_address' => ['required', Rule::in(['street_address'])],
                    'latitude' => 'required',
                    'longitude' => 'required',
                    'surface' => 'required|integer',
                    'nb_users_max' => 'required|integer',
                ];
            }
            default:break;
        }
        
    }
}
