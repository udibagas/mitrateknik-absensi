<?php

namespace App\Console\Commands;

use App\Events\AttendanceEvent;
use App\Models\Access;
use Carbon\Carbon;
use Illuminate\Console\Command;

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
        while (true) {
            $log = Access::whereNotNull('pin')
                ->whereNotNull('name')
                ->where('pin', '!=', '')
                ->where('name', '!=', '')
                ->whereDate('event_time', date('Y-m-d')) // biar leboh spesifik
                ->latest()
                ->first();

            if ($log && (new Carbon(now()))->diffInSeconds(new Carbon($log->event_time)) <= 5) {
                $this->line("Send {$log->name} info to screen");
                // kalau id-nya sudah pernah tampil gak perlu di broadcast
                AttendanceEvent::dispatch($log);
                sleep(1);
            } else {
                // sleep 0.1 second
                $this->line('No new data');
                usleep(200000);
            }
        }
    }
}
