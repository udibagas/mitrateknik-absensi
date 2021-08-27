<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Area;

class AreaController extends Controller
{
    public function index()
    {
        return Area::orderBy('name', 'ASC')->get();
    }
}
