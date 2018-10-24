<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class AbsensiController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->date ? $request->date : date('Y-m-d');
        $sql = "SELECT DISTINCT(person_pin) AS nik_var,
            CONCAT(person_name, ' ', person_last_name) AS name_var,
            att_date AS absence_date,
            (SELECT att_time
                FROM att_transaction
                WHERE person_pin = a.person_pin AND att_date = :att_date
                ORDER BY att_time ASC LIMIT 1) AS first_in,
            (SELECT att_time
                FROM att_transaction
                WHERE person_pin = a.person_pin AND att_date = :att_date
                ORDER BY att_time DESC LIMIT 1) AS last_out
        FROM att_transaction a WHERE att_date = :att_date";

        return DB::connection('pgsql')->select($sql, [':att_date' => $date]);
    }
}