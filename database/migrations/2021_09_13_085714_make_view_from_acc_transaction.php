<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MakeViewFromAccTransaction extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $query = <<<SQL
        CREATE VIEW log_akses AS (
            SELECT CONCAT(name, ' ', last_name) AS fullname,
                pin,
                dept_name,
                event_time::timestamp::date AS att_date,
                event_time::timestamp::time AS att_time,
                vid_linkage_handle as face_snapshot,
                temperature,
                event_point_name AS gate
            FROM acc_transaction
            WHERE LENGTH(pin)=5
                AND LENGTH(name)>0
            GROUP BY fullname, pin, dept_name, att_date, att_time, face_snapshot, temperature, gate
        )
        SQL;

        DB::connection('pgsql')->statement($query);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::connection('pgsql')->statement('DROP VIEW log_akses');
    }
}
