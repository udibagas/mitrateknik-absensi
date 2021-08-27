<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TimeSlot;
use App\Http\Requests\TimeSlotRequest;

class TimeSlotController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TimeSlot::orderBy('day', 'ASC')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TimeSlotRequest $request)
    {
        return TimeSlot::create($request->all());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TimeSlotRequest $request, TimeSlot $timeSlot)
    {
        $timeSlot->update($request->all());
        return TimeSlot::orderBy('day', 'ASC')->get();
    }
}
