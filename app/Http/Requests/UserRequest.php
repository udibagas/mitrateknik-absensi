<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // return auth()->check();
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = $this->route('user');

        $rules = [
            'name' => [
                'required',
                Rule::unique('users')->ignore($user ? $user->id : 0)
            ],
            'email' => [
                'required', 'email',
                Rule::unique('users')->ignore($user ? $user->id : 0)
            ],
            'admin' => 'required',
            'active' => 'required',
            'password' => 'required|string|min:6|confirmed',
        ];

        if ($user) {
            unset($rules['password']);
        }

        return $rules;
    }

    public function attributes()
    {
        return [
            'name' => 'Name',
            'email' => 'Email',
            'active' => 'Status',
            'admin' => 'Type'
        ];
    }
}
