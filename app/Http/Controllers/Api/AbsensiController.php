<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class AbsensiController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        // Gate 1
        //     IN: 13, OUT: 14
        // Gate 2
        //     IN: 16, OUT: 15
        // Gate 3
        //     IN: 3, OUT: 4

        $date = $request->date ? $request->date : date('Y-m-d');
        $sql = "SELECT DISTINCT(person_pin) AS nik_var,
            CONCAT(person_name, ' ', person_last_name) AS name_var,
            att_date AS absence_date,
            (SELECT att_time
                FROM att_transaction
                WHERE person_pin = a.person_pin AND att_date = :att_date
                    AND device_id IN (3, 13, 16)
                ORDER BY att_time ASC LIMIT 1) AS first_in,
            (SELECT att_time
                FROM att_transaction
                WHERE person_pin = a.person_pin AND att_date = :att_date
                    AND device_id IN (4, 14, 15)
                ORDER BY att_time DESC LIMIT 1) AS last_out,
            (SELECT att_time
                FROM att_transaction
                WHERE person_pin = a.person_pin AND att_date = :att_date
                    AND device_id IN (3, 13, 16)
                    AND att_time BETWEEN '11:30' AND '12:55'
                ORDER BY att_time ASC LIMIT 1) AS rest_start,
            (SELECT att_time
                FROM att_transaction
                WHERE person_pin = a.person_pin AND att_date = :att_date
                    AND device_id IN (4, 14, 15)
                    AND att_time BETWEEN '12:30' AND '13:30'
                ORDER BY att_time ASC LIMIT 1) AS rest_end
        FROM att_transaction a WHERE att_date = :att_date ORDER BY name_var ASC";

        return DB::connection('pgsql')->select($sql, [':att_date' => $date]);
    }
}
