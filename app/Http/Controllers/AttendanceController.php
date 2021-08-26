<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        return Attendance::where('att_date', $request->date)
            ->where('person_pin', '!=', null)
            ->orderBy('id', 'DESC')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'person_pin' => 'required',
            'device_id' => 'required',
            'att_date' => 'required|date',
            'att_time' => 'required'
        ]);

        $lastId = DB::connection('pgsql')->table('att_transaction')->max('id');
        $input = $request->all();
        $input['id'] = $lastId + 1;
        return Attendance::create($input);
    }

    public function update(Attendance $attendance, Request $request)
    {
        $attendance->update($request->all());
        return $attendance;
    }
}
