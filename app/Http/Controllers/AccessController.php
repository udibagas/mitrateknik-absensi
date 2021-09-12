<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AccessRequest;
use App\Models\Access;
use App\Models\AccReader;
use App\Models\Department;
use App\Models\Gate;
use App\Models\Person;
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
            ->when($request->dept_name, function ($q) use ($request) {
                $q->whereIn('dept_name', $request->dept_name);
            })->when($request->keyword, function ($q) use ($request) {
                $q->where(function ($q) use ($request) {
                    $q->where('pin', 'ILIKE', "%{$request->keyword}%")
                        ->orWhere('name', 'ILIKE', "%{$request->keyword}%")
                        ->orWhere('last_name', 'ILIKE', "%{$request->keyword}%");
                });
            })->orderBy($request->sort_prop ?: 'create_time', $request->sort_order ?: 'desc');

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

    public function store(AccessRequest $request)
    {
        $person     = Person::wherePin($request->pin)->first();
        $department = Department::find($person->auth_dept_id);
        $gate       = Gate::find($request->event_point_id);
        $device     = $gate->device;
        $area       = $device->area;
        $reader     = AccReader::where('door_id', $gate->id)->first();

        $logId      = Access::orderBy('log_id', 'desc')->first()->log_id + 1;
        $eventTime  = "{$request->event_time_date} {$request->event_time_time}";
        $uniqueKey  = "{$device->sn}_{$logId}_{$eventTime}";

        $input = [
            // 'acc_zone' => '',
            // 'acc_zone_code' => '',
            'area_name' => $area->name,
            // 'card_no' => '',
            'dept_code' => $department->code,
            'dept_name' => $department->name,
            'dev_alias' => $device->dev_alias,
            'dev_id' => $device->id,
            'dev_sn' => $device->sn,
            'event_addr' => 1,
            'event_name' => 'acc_newEventNo_0',
            'event_no' => 0,
            'event_point_id' => $request->event_point_id,
            'event_point_name' => $gate->name,
            'event_point_type' => 0,
            'event_time' => $eventTime,
            'name' => $person->name,
            'last_name' => $person->last_name,
            'pin' => $person->pin,
            'log_id' => $logId,
            'reader_name' => $reader->name,
            'reader_state' => $reader->reader_state,
            // 'temperature' => '',
            'unique_key' => $uniqueKey,
            'verify_mode_name' => 'common_verifyMode_other',
            'verify_mode_no' => 200,
        ];

        $data = Access::create($input);
        return ['message' => 'Data telah disimpan', 'data' => $data];
    }

    public function update(Access $access, AccessRequest $request)
    {
        // hanya untuk update jamnya saja
        $access->update(['event_time' => "{$request->event_time_date} {$request->event_time_time}"]);
        return ['message' => 'Data telah disimpan', 'data' => $access];
    }
}
