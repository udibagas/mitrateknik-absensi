<?php

namespace App\Console\Commands;

use App\Events\AttendanceEvent;
use App\Models\AttTransaction;
use Carbon\Carbon;
use Illuminate\Console\Command;

class GetAttendanceLog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'attendance:get';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get attendance';

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
        while (true) {
            // cukup yg di gate in aja
            $logs = AttTransaction::distinct('device_id')
                ->whereHas('person')
                ->where('att_date', date('Y-m-d'))
                ->whereIn('device_id', [3, 14, 16])
                ->get()
                ->filter(function ($item) {
                    return (new Carbon(now()))->diffInSeconds(new Carbon($item->att_datetime)) < 3;
                });

            foreach ($logs as $log) {
                $this->line("Send {$log->person_name} info to device {$log->device_id}");
                // kalau id-nya sudah pernah tampil gak perlu di broadcast
                AttendanceEvent::dispatch($log);
            }
        }
    }
}
