<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Attendance;

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

    public function update(Attendance $attendance, Request $request)
    {
        $attendance->update($request->all());
        return $attendance;
    }
}
