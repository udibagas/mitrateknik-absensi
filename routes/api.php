<?php

use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\AccessController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\GateController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\TimeSlotController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
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

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('area', [AreaController::class, 'index']);
    Route::get('department', [DepartmentController::class, 'index']);
    Route::get('attendance', [AttendanceController::class, 'index']);
    Route::get('person', [PersonController::class, 'index']);
    Route::get('person/{pin}', [PersonController::class, 'getByPin']);
    Route::get('device', [DeviceController::class, 'index']);
    Route::get('gate', [GateController::class, 'index']);

    Route::apiResources([
        'access' => AccessController::class,
        'user' => UserController::class,
        'timeSlot' => TimeSlotController::class
    ], ['except' => 'show']);
});
