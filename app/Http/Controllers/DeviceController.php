<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Device;

class DeviceController extends Controller
{
    public function index()
    {
        return Device::orderBy('dev_alias', 'ASC')->get();
    }
}
