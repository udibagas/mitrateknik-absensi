<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Access;
use Carbon\Carbon;

class AccessController extends Controller
{
    public function index(Request $request)
    {
        $request->validate(['date' => 'required|date']);

        $data = Access::whereDate('event_time', $request->date)
            ->whereNotNull('pin')
            ->whereNotNull('name')
            ->where('pin', '!=', '')
            ->where('name', '!=', '')
            ->when($request->keyword, function ($q) use ($request) {
                $q->where(function ($q) use ($request) {
                    $q->where('pin', 'ILIKE', "%{$request->keyword}%")
                        ->orWhere('name', 'ILIKE', "%{$request->keyword}%")
                        ->orWhere('last_name', 'ILIKE', "%{$request->keyword}%");
                });
            })
            ->orderBy($request->sort_prop ?: 'create_time', $request->sort_order ?: 'desc');

        if ($request->action == 'export') {
            return $data->get()->map(function ($item, $index) {
                $eventTime = new Carbon($item->event_time);
                return [
                    'No.' => $index + 1,
                    'Tanggal' => $eventTime->format('Y-m-d'),
                    'NIK' => $item->pin,
                    'Nama' => "{$item->name} {$item->last_name}",
                    'Departemen' => $item->dept_name,
                    'Jam' => $eventTime->format('H:i:s'),
                    'Gate' => $item->event_point_name
                ];
            });
        }

        return $data->paginate($request->pageSize);
    }

    public function store(Request $request)
    {
        $request->validate([
            'person_pin' => 'required',
            'device_id' => 'required',
            'att_date' => 'required|date',
            'att_time' => 'required'
        ]);

        $data = Access::create($request->all());
        return ['message' => 'Data telah disimpan', 'data' => $data];
    }

    public function update(Access $access, Request $request)
    {
        $access->update($request->all());
        return ['message' => 'Data telah disimpan', 'data' => $access];
    }
}
