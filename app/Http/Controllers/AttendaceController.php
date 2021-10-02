<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendaceController extends Controller
{
    public function index(Request $request)
    {
        $data = Attendance::when($request->pin, function ($q) use ($request) {
            $q->where('pin', $request->pin);
        })->when($request->keyword, function ($q) use ($request) {
            $q->where('keyword', 'LIKE', "%{$request->keyword}%");
        })->when($request->department, function ($q) use ($request) {
            $q->whereIn('department', $request->department);
        })->whereBetween('date', $request->date)
            ->orderBy($request->sort_prop ?: 'name', $request->sort_order ?: 'asc');

        if ($request->paginated) {
            return $data->paginate($request->pageSize);
        }

        if ($request->action == 'export') {
            return $data->get()->map(function ($item) use ($request) {
                $data = [
                    'Tanggal' => $item->date,
                    'Hari' => $item->hari,
                ];

                if (!$request->pin) {
                    $data = array_merge($data, [
                        'Nama' => $item->name,
                        'NIK' => $item->pin,
                        'Departmen' => $item->department
                    ]);
                }

                return array_merge($data, [
                    'Masuk' => $item->first_in,
                    'Jam Istirahat' => "{$item->rest_start} - {$item->rest_end}",
                    'Lama Istirahat' => $item->rest_duration,
                    'Pulang' => $item->last_out,
                    'Jam Kerja Efektif' => $item->work_duration,
                    'Persentase' => $item->prosentase
                ]);
            });
        }

        return $data->get();
    }

    public function summary(Request $request)
    {
        // TODO
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
