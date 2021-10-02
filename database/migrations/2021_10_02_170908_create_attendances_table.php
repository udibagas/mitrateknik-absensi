<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('date');
            $table->string('name')->comment('fullname');
            $table->string('department')->comment('department name');
            $table->string('pin');
            $table->time('first_in');
            $table->time('last_out')->nullable();
            $table->time('rest_start')->nullable();
            $table->time('rest_end')->nullable();
            $table->tinyInteger('day')->comment('0 = minggu, 6 = sabtu');
            // slot related
            $table->time('sign_in_time')->default('08:00:00');
            $table->time('sign_off_time')->default('17:00:00');
            $table->time('rest_start_time')->default('12:00:00');
            $table->time('rest_end_time')->default('13:00:00');
            $table->float('jam_kerja_max')->default(8);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attendances');
    }
}
