<?php

namespace App\Console\Commands;

use App\Events\AttendanceEvent;
use App\Models\Access;
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

        while (true) {
            try {
                $log = Access::whereNotNull('pin')
                    ->whereNotNull('name')
                    ->where('pin', '!=', '')
                    ->where('name', '!=', '')
                    ->whereRaw('LENGTH(pin)=5')
                    ->where('id', '!=', $lastData->id) // kalau id-nya sudah pernah tampil gak perlu di broadcast
                    ->whereDate('event_time', date('Y-m-d')) // biar lebih spesifik
                    ->when($lastData->event_time, function ($q) use ($lastData) {
                        $q->where('event_time', '>', $lastData->event_time);
                    })
                    ->orderBy('event_time', 'desc')->first();

                if ($log && (new Carbon(now()))->diffInSeconds(new Carbon($log->event_time)) <= 5) {
                    // set new value
                    $lastData = $log;
                    $this->line("Send {$log->name} info to screen {$log->event_time}");
                    AttendanceEvent::dispatch($log);
                    usleep(200000); //0.2 sec
                } else {
                    $this->line('No new data');
                    usleep(200000); //0.2 sec
                }
            } catch (\Exception $e) {
                $this->error($e->getMessage());
                $lastData = new stdClass();
                $lastData->id = '0';
                $lastData->event_time = null;
                continue;
            }
        }
    }
}
