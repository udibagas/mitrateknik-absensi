<?php

namespace App\Console\Commands;

use App\Events\AttendanceEvent;
use App\Models\Access;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Console\Command;
use stdClass;

class GetAttendanceLog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'log:get';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get log';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $lastData = new stdClass();
        $lastData->id = '0';
        $lastData->event_time = null;
        $lastData->event_point_name = null;

        while (true) {
            try {
                $log = Access::whereNotNull('pin')
                    ->whereNotNull('name')
                    ->where('pin', '!=', '')
                    ->where('name', '!=', '')
                    ->whereRaw('LENGTH(pin)=5')
                    ->where('id', '!=', $lastData->id) // kalau id-nya sudah pernah tampil gak perlu di broadcast
                    // ->whereDate('event_time', date('Y-m-d')) // biar lebih spesifik
                    ->when($lastData->event_time, function ($q) use ($lastData) {
                        $q->where('event_time', '>', $lastData->event_time);
                    })
                    ->when($lastData->event_point_name, function ($q) use ($lastData) {
                        $q->where('event_point_name', '!=', $lastData->event_point_name);
                    })
                    ->orderBy('event_time', 'asc')->first();

                if ($log) {
                    // ambil data attendace untuk user & tanggal terkait
                    $attendance = Attendance::where('pin', $log->pin)->where('date', $log->event_time_date)->first();
                    $gate = strtoupper(substr($log->event_point_name, -2));

                    // kalau gak ada anggap aja sebagai first_in
                    if (!$attendance) {
                        $first_in = true;
                        $attendance = Attendance::create([
                            'date' => $log->event_time_date,
                            'pin' => $log->pin,
                            'name' => "{$log->name} {$log->last_name}",
                            'department' => $log->dept_name,
                            'first_in' => $log->event_time_time
                        ]);
                    } else {
                        $first_in = false;
                        // jika lewat gate out
                        if ($gate == 'UT') {
                            $data = ['last_out' => $log->event_time_time];

                            // jika di range waktu istirahat
                            if ((new Carbon($log->event_time))->between(
                                new Carbon("{$log->event_time_date} 11:30:00"),
                                new Carbon("{$log->event_time_date} 12:55:00"),
                            )) {
                                $data['rest_start'] = $log->event_time_time;
                            }

                            $attendance->update($data);
                        }

                        // jika lewat gate in
                        if ($gate == 'IN') {
                            if ((new Carbon($log->event_time))->between(
                                new Carbon("{$log->event_time_date} 12:30:00"),
                                new Carbon("{$log->event_time_date} 13:30:00"),
                            )) {
                                $attendance->update(['rest_end' => $log->event_time_time]);
                            }
                        }
                    }

                    if ((new Carbon(now()))->diffInSeconds(new Carbon($log->event_time)) <= 60) {
                        // set new value
                        $lastData = $log;
                        // $this->line($log);
                        $this->line("Name = {$log->name}");
                        $this->line("Time = {$log->event_time}");
                        $this->line("Temp = {$log->temperature}");
                        $this->line($gate == 'IN' ? 'Gate = IN' : 'Gate = OUT');
                        $this->line("Pros = {$attendance->prosentase}%");
                        $this->line("Late = {$attendance->late} menit");
                        $this->line('--------------------------------------');
                        AttendanceEvent::dispatch($log, $gate == 'IN' ? 'IN' : 'OUT', $attendance->prosentase, $attendance->late, $first_in);
                    }
                } else {
                    $this->line('No new data');
                }

                usleep(0.2 * 1000000); //0.2 sec
            } catch (\Exception $e) {
                $this->error($e->getMessage());
                $lastData = new stdClass();
                $lastData->id = '0';
                $lastData->event_time = null;
                $lastData->event_point_name = null;
                continue;
            }
        }
    }
}
