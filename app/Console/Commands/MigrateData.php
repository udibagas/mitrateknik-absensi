<?php

namespace App\Console\Commands;

use App\Models\Access;
use App\Models\Attendance;
use Illuminate\Console\Command;
use Carbon\Carbon;

class MigrateData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'data:migrate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate data absensi';

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
        Attendance::truncate();

        $logs = Access::whereNotNull('name')
            ->where('name', '!=', '')
            ->whereRaw('LENGTH(pin)=5')
            ->orderBy('event_time', 'asc')->get();

        $total = $logs->count();

        foreach ($logs as $i => $log) {
            // ambil data attendace untuk user & tanggal terkait
            $attendance = Attendance::where('pin', $log->pin)->where('date', $log->event_time_date)->first();
            $gate = strtoupper(substr($log->event_point_name, -2));

            // kalau gak ada anggap aja sebagai first_in
            if (!$attendance) {
                $attendance = Attendance::create([
                    'date' => $log->event_time_date,
                    'pin' => $log->pin,
                    'name' => "{$log->name} {$log->last_name}",
                    'department' => $log->dept_name,
                    'first_in' => $log->event_time_time
                ]);
            } else {
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

            $i++;
            $this->info("[$i/$total] [$log->event_time] $gate - {$log->name}");
        }
    }
}
