<?php

namespace App\Console\Commands;

use App\Models\Access;
use App\Models\Attendance;
use Illuminate\Console\Command;

class KoreksiAbsensi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'absensi:koreksi {date} {pin?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Koreksi absensi';

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
        $attendances = Attendance::when($this->argument('pin'), function ($q) {
            $q->where('pin', $this->argument('pin'));
        })->where('date', $this->argument('date'))->get();

        if (!$attendances) {
            $this->error('Data absensi tidak ditemukan');
        }

        foreach ($attendances as $attendance) {
            $this->line('INITIAL DATA:');
            $this->table(
                ['Parameter', 'Value'],
                [
                    ['PIN', $attendance->pin],
                    ['Name', $attendance->name],
                    ['First In', $attendance->first_in],
                    ['Last Out', $attendance->last_out],
                    ['Rest Start', $attendance->rest_start],
                    ['Rest end', $attendance->rest_end],
                    ['Rest Duration', $attendance->rest_duration],
                    ['Work Duration', $attendance->work_duration],
                    ['Prosentase', $attendance->prosentase . '%']
                ],
            );

            $access = Access::where('pin', $attendance->pin)
                ->orderBy('event_time', 'asc')
                ->whereDate('event_time', $this->argument('date'))
                ->get()->map(function ($i) {
                    return [$i->event_time_time, $i->event_point_name];
                })->toArray();

            if (count($access) == 0) {
                $this->error('Data akses tidak ditemukan');
                continue;
            }

            $this->line('LOG ACCESS:');
            $this->table(['Time', 'Gate'], $access);

            // TODO: update jam istirahat juga
            $attendance->update([
                'first_in' => $access[0][0],
                'last_out' => count($access) > 0 ? end($access)[0] : null,
            ]);

            $attendance->refresh();

            $this->line('CORRECTIVE DATA:');

            $this->table(
                ['Parameter', 'Value'],
                [
                    ['PIN', $attendance->pin],
                    ['Name', $attendance->name],
                    ['First In', $attendance->first_in],
                    ['Last Out', $attendance->last_out],
                    ['Rest Start', $attendance->rest_start],
                    ['Rest end', $attendance->rest_end],
                    ['Rest Duration', $attendance->rest_duration],
                    ['Work Duration', $attendance->work_duration],
                    ['Prosentase', $attendance->prosentase . '%']
                ],
            );

            $this->info('Data berhasil diupdate');
            $this->line('=============================================');
        }
    }
}
