<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccessRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'pin' => 'required',
            'event_time_date' => 'required|date',
            'event_time_time' => 'required',
            'event_point_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'pin.required' => 'Mohon pilih pegawai',
            'pin.exists' => 'Pegawai tidak terdaftar',
            'event_time_date.required' => 'Tanggal harus diisi',
            'event_time_date.date' => 'Tanggal tidak valid',
            'event_time_time.required' => 'Jam harus diisi',
            'event_time_time.time' => 'Waktu tidak valid',
            'event_point_id.required' => 'Gate harus diisi',
            'event_point_id.exists' => 'Gate tidak terdaftar'
        ];
    }
}
