<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Libraries\ZKLibrary;

class TestMesinAbsen extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'absen:test {ip}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test ambil data log mesin absen';

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
        $ip = $this->argument('ip');
        $this->info($ip);

        $zk = new ZKLibrary($ip, 4370);
        $zk->connect();
        $logs = $zk->getAttendance();
        $this->line(json_encode($logs));
        $zk->disconnect();
    }
}
