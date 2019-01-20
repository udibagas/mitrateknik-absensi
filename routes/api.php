<?php

use Illuminate\Http\Request;

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

Route::get('area', 'Api\AreaController@index');
Route::get('department', 'Api\DepartmentController@index');
Route::get('absensi', 'Api\AbsensiController@index');
Route::get('person', 'Api\PersonController@index');
Route::get('device', 'Api\DeviceController@index');
Route::get('gate', 'Api\GateController@index');
Route::resource('attendance', 'Api\AttendanceController')->only(['index', 'store', 'update']);
Route::resource('user', 'Api\UserController')->only(['index', 'store', 'update', 'destroy']);
Route::resource('timeSlot', 'Api\TimeSlotController')->only(['index', 'store', 'update']);
