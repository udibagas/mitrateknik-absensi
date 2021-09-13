<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TimeSlot;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AbsensiController extends Controller
{
    public function index(Request $request)
    {
        $sql = <<<SQL
            SELECT
                att_date,
                MIN(att_time) AS first_in,
                MAX(att_time) AS last_out,
                EXTRACT(DOW FROM att_date) AS day,
                (SELECT MIN(att_time) FROM log_akses
                    WHERE pin = a.pin
                        AND att_date = a.att_date
                        AND gate ILIKE '%IN'
                        AND att_time BETWEEN '11:30' AND '12:55'
                ) AS rest_start,
                (SELECT MIN(att_time) FROM log_akses
                    WHERE pin = a.pin
                        AND att_date = a.att_date
                        AND gate ILIKE '%IN'
                        AND att_time BETWEEN '12:30' AND '13:30'
                ) AS rest_end,
                fullname,
                pin,
                dept_name
            FROM log_akses a
            WHERE att_date BETWEEN :att_date_start AND :att_date_end
        SQL;

        if ($request->pin) {
            $sql .= " AND pin = '{$request->pin}'";
        }

        $sql .= " GROUP BY att_date, fullname, pin, dept_name";

        $data = DB::connection('pgsql')->select($sql, [
            ':att_date_start' => $request->date[0],
            ':att_date_end' => $request->date[1]
        ]);

        $slot = [];
        $timeSlot = TimeSlot::all();

        foreach ($timeSlot as $ts) {
            $slot[$ts->day] = $ts;
        }

        $data = array_map(function ($item) use ($slot) {
            $slot = $slot[$item->day];

            if (!$item->rest_start) {
                $item->rest_start = $slot->rest_start;
            }

            if (!$item->rest_end) {
                $item->rest_end = $slot->rest_end;
            }

            if ($item->first_in && $item->last_out) {
                $slot_in            = new Carbon($slot->in);
                $slot_out           = new Carbon($slot->out);
                $slot_rest_start    = new Carbon($slot->rest_start);
                $slot_rest_end      = new Carbon($slot->rest_end);

                $first_in   = new Carbon($item->first_in);
                $last_out   = new Carbon($item->last_out);
                $rest_start = new Carbon($item->rest_start);
                $rest_end   = new Carbon($item->rest_end);

                $jamMasukEfektif            = $first_in > $slot_in ? $first_in : $slot_in;
                $jamKeluarEfektif           = $last_out < $slot_out ? $last_out : $slot_out;
                $jamMulaiIstirahatEfektif   = $rest_start < $slot_rest_start ? $rest_start : $slot_rest_start;
                $jamSelesaiIstirahatEfektif = $rest_end > $slot_rest_end ? $rest_end : $slot_rest_end;

                $restDuration = $jamSelesaiIstirahatEfektif->diffInSeconds($jamMulaiIstirahatEfektif);
                $workDuration = $jamKeluarEfektif->diffInSeconds($jamMasukEfektif);

                $item->rest_duration = static::secToTime($restDuration);
                // TODO: harusnya kalau start kerja > jam istirahat keluar gak dikurangi
                $item->work_duration = static::secToTime($workDuration - $restDuration);
                $item->percentage    = ($workDuration - $restDuration) / ($slot->jam_kerja_max * 36);
            }

            // $item->rest_start       = substr($item->rest_start, 0, 5);
            // $item->rest_end         = substr($item->rest_end, 0, 5);
            // $item->first_in         = substr($item->first_in, 0, 5);
            // $item->last_out         = substr($item->last_out, 0, 5);
            // $item->rest_duration    = substr($item->rest_duration, 0, 5);
            // $item->work_duration    = substr($item->work_duration, 0, 5);

            return $item;
        }, $data);

        if ($request->action == 'export') {
            return array_map(function ($item) {
                $days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', "JUM'AT", 'SABTU'];

                return [
                    'Tanggal' => $item->att_date,
                    'Hari' => $days[$item->day],
                    'Masuk' => $item->first_in,
                    'Jam Istirahat' => "{$item->rest_start} - {$item->rest_end}",
                    'Lama Istirahat' => $item->rest_duration,
                    'Pulang' => $item->last_out,
                    'Jam Kerja Efektif' => $item->work_duration,
                    'Persentase' => round($item->percentage, 2),
                ];
            }, $data);
        }

        return $data;
    }

    protected static function secToTime($seconds)
    {
        $h = floor($seconds / 3600);
        $m = floor(($seconds % 3600) / 60);
        $s = $seconds % 60;

        return str_pad($h, 2, '0', STR_PAD_LEFT) . ':'
            . str_pad($m, 2, '0', STR_PAD_LEFT) . ':'
            . str_pad($s, 2, '0', STR_PAD_LEFT);
    }
}
