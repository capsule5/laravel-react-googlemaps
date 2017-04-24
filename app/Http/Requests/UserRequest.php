<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\Rule;

use Auth;
use App\User;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        //dd($this->route('user'));
        switch($this->method())
        {
            case 'POST':
            {
                return [
                    'name' => 'required|min:3|max:20',
                    'phone' => 'required',
                    'address' => 'required',
                    'email' => 'required|email|unique:users',
                ];
            }
            case 'PATCH':
            {
                return [
                    'name' => 'required|min:3|max:20',
                    'phone' => 'required',
                    'address' => 'required',
                    'email' => ['required','email',Rule::unique('users')->ignore($this->route('user'))],
                ];
            }
            default:break;
        }
    }
}
