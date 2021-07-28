<?php

use App\Http\Controllers\Api\AbsensiController;
use App\Http\Controllers\Api\AreaController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\DeviceController;
use App\Http\Controllers\Api\GateController;
use App\Http\Controllers\Api\PersonController;
use App\Http\Controllers\Api\TimeSlotController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('area', [AreaController::class, 'index']);
Route::get('department', [DepartmentController::class, 'index']);
Route::get('absensi', [AbsensiController::class, 'index']);
Route::get('person', [PersonController::class, 'index']);
Route::get('device', [DeviceController::class, 'index']);
Route::get('gate', [GateController::class, 'index']);

Route::apiResources([
    'attendance' => AttendanceController::class,
    'user' => UserController::class,
    'timeSlot' => TimeSlotController::class
]);

// Route::resource('attendance', 'Api\AttendanceController')->only(['index', 'store', 'update']);
// Route::resource('user', 'Api\UserController')->only(['index', 'store', 'update', 'destroy']);
// Route::resource('timeSlot', 'Api\TimeSlotController')->only(['index', 'store', 'update']);
