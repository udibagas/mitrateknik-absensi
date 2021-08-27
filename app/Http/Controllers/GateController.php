<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Gate;

class GateController extends Controller
{
    public function index()
    {
        return Gate::orderBy('name', 'ASC')->get();
    }
}
