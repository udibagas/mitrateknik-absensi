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
        $ids = [];

        // harus bisa ambil data langsung beberapa tanpa duplicate

        while (true) {
            try {
                $logs = Access::whereNotNull('name')
                    ->where('name', '!=', '')
                    ->whereRaw('LENGTH(pin)=5')
                    ->when(count($ids) > 0, function ($q) use ($ids) {
                        $q->whereNotIn('id', $ids);
                    })
                    ->whereDate('event_time', date('Y-m-d')) // biar lebih spesifik
                    ->when($lastData->event_time, function ($q) use ($lastData) {
                        $q->where('event_time', '>', $lastData->event_time);
                    })
                    ->orderBy('event_time', 'asc')->get();

                // set value for ids to be excluded on next iteration
                $ids = $logs->pluck('id')->all();

                foreach ($logs as $log) {
                    $lastData = $log;
                    // ambil data attendace untuk user & tanggal terkait
                    $attendance = Attendance::where('pin', $log->pin)->where('date', $log->event_time_date)->first();

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
                        if ($log->gate == 'UT') {
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
                        if ($log->gate == 'IN') {
                            // koreksi jam masuk
                            if (strtotime($log->event_time_time) < strtotime($attendance->first_in)) {
                                $attendance->update(['first_in' => $log->event_time_time]);
                            }

                            // update jam akhir istirahat
                            if ((new Carbon($log->event_time))->between(
                                new Carbon("{$log->event_time_date} 12:30:00"),
                                new Carbon("{$log->event_time_date} 13:30:00"),
                            )) {
                                if (!$attendance->rest_end) {
                                    $attendance->update(['rest_end' => $log->event_time_time]);
                                }
                            }

                            // last out dibikin null lagi
                            $attendance->update(['last_out' => null]);
                        }
                    }

                    if ((new Carbon(now()))->diffInSeconds(new Carbon($log->event_time)) <= 30) {
                        // $this->line($log);
                        $this->line("Name = {$log->name}");
                        $this->line("Time = {$log->event_time}");
                        $this->line("Temp = {$log->temperature}");
                        $this->line($log->gate == 'IN' ? 'Gate = IN' : 'Gate = OUT');
                        $this->line("Pros = {$attendance->prosentase}%");
                        $this->line("Late = {$attendance->late} menit");
                        $this->line('--------------------------------------');
                        AttendanceEvent::dispatch($log, $log->gate == 'IN' ? 'IN' : 'OUT', $attendance->prosentase, $attendance->late, $first_in);
                    }
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
