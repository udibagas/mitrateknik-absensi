<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Person;

class PersonController extends Controller
{
    public function index(Request $request)
    {
        return Person::orderBy('name', 'ASC')->get();
    }

    public function getByPin($pin)
    {
        return Person::with('department')->wherePin($pin)->first();
    }
}
