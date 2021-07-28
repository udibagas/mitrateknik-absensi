<?php

namespace App\Http\Controllers\Api;

use App\Attendance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AbsensiController extends Controller
{
    public function index(Request $request)
    {
        // Gate 1
        //     IN: 14, OUT: 13
        // Gate 2
        //     IN: 16, OUT: 15
        // Gate 3
        //     IN: 3, OUT: 4

        $date_start = $request->date ? $request->date : date('Y-m-d');
        $date_end = $request->date_end ? $request->date_end : date('Y-m-d');
        $pin = $request->person_pin ? "person_pin = '{$request->person_pin}'" : "1 = 1";

        $sql = "SELECT DISTINCT(att_date, person_pin) AS date_pin,
            person_pin AS nik_var,
            dept_name,
            CONCAT(person_name, ' ', person_last_name) AS name_var,
            att_date AS absence_date,
            (SELECT att_time
                FROM att_transaction
                WHERE person_pin = a.person_pin AND att_date = a.att_date
                    AND device_id IN (3, 14, 16)
                ORDER BY att_time ASC LIMIT 1) AS first_in,
            (SELECT att_time
                FROM att_transaction
                WHERE person_pin = a.person_pin AND att_date = a.att_date
                    AND device_id IN (4, 13, 15)
                ORDER BY att_time DESC LIMIT 1) AS last_out,
            (SELECT att_time
                FROM att_transaction
                WHERE person_pin = a.person_pin AND att_date = a.att_date
                    AND device_id IN (4, 13, 15)
                    AND att_time BETWEEN '11:30' AND '12:55'
                ORDER BY att_time ASC LIMIT 1) AS rest_start,
            (SELECT att_time
                FROM att_transaction
                WHERE person_pin = a.person_pin AND att_date = a.att_date
                    AND device_id IN (3, 14, 16)
                    AND att_time BETWEEN '12:30' AND '13:30'
                ORDER BY att_time ASC LIMIT 1) AS rest_end
        FROM att_transaction a
        WHERE att_date BETWEEN :att_date_start AND :att_date_end
            AND person_pin != ''
            AND $pin
        ORDER BY att_date ASC, name_var ASC";

        $data = Attendance::where('person_pin', '!=', '')
            ->when($request->person_pin, function ($q) use ($request) {
                $q->where('person_pin', $request->person_pin);
            })->whereBetween('att_date', [$date_start, $date_end])
            ->orderBy('att_date', 'asc')
            ->orderBy('person_name', 'asc')
            ->get()->map(function ($item) {
                return [
                    'nik_var' => $item->person_pin,
                    'dept_name' => $item->dept_name,
                    'name_var' => $item->person_name . ' ' . $item->person_last_name,
                    'absence_date' => $item->att_date,
                    'device_id' => $item->device_id,
                    'att_time' => $item->att_time
                ];
            });

        return $data->unique(['absence_date', 'nik_var'])->map(function ($item) use ($data) {
            $restStart0 = new Carbon('11:30');
            $restStart1 = new Carbon('12:55');
            $restEnd0 = new Carbon('12:30');
            $restEnd1 = new Carbon('13:30');

            $firstIn = $data->filter(function ($value) use ($item) {
                return $value['nik_var'] == $item['nik_var'] &&
                    in_array($value['device_id'], [3, 14, 16]) &&
                    $value['absence_date'] == $item['absence_date'];
            })->first();

            $lastOut = $data->filter(function ($value) use ($item) {
                return $value['nik_var'] == $item['nik_var'] &&
                    in_array($value['device_id'], [4, 13, 15]) &&
                    $value['absence_date'] == $item['absence_date'];
            })->last();

            $restStart = $data->filter(function ($value) use ($item, $restStart0, $restStart1) {
                $attTime = new Carbon($value['att_time']);
                return $value['nik_var'] == $item['nik_var'] &&
                    in_array($value['device_id'], [4, 13, 15]) &&
                    $value['absence_date'] == $item['absence_date'] &&
                    $attTime->between($restStart0, $restStart1);
            })->last();

            $restEnd = $data->filter(function ($value) use ($item, $restEnd0, $restEnd1) {
                $attTime = new Carbon($value['att_time']);
                return $value['nik_var'] == $item['nik_var'] &&
                    in_array($value['device_id'], [3, 14, 16]) &&
                    $value['absence_date'] == $item['absence_date'] &&
                    $attTime->between($restEnd0, $restEnd1);
            })->last();

            return [
                'nik_var' => $item['nik_var'],
                'dept_name' => $item['dept_name'],
                'name_var' => $item['name_var'],
                'absence_date' => $item['absence_date'],
                'first_in' => $firstIn ? $firstIn['att_time'] : '',
                'last_out' => $lastOut ? $lastOut['att_time'] : '',
                'rest_start' => $restStart ? $restStart['att_time'] : '',
                'rest_end' => $restEnd ? $restEnd['att_time'] : '',
            ];
        })->toArray();

        return DB::connection('pgsql')->select($sql, [
            ':att_date_start' => $date_start,
            ':att_date_end' => $date_end
        ]);
    }
}
