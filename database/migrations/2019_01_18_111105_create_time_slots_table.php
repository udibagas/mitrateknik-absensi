<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\TimeSlot;

class CreateTimeSlotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('time_slots', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('day');
            $table->time('in');
            $table->time('out');
            $table->time('rest_start');
            $table->time('rest_end');
            $table->decimal('jam_kerja_max');
            $table->timestamps();
        });

        TimeSlot::insert([
            [
                'day' => 0,
                'in' => '08:00:00',
                'out' => '17:00:00',
                'rest_start' => '12:00:00',
                'rest_end' => '13:00:00',
                'jam_kerja_max' => 8
            ],
            [
                'day' => 1,
                'in' => '08:00:00',
                'out' => '17:00:00',
                'rest_start' => '12:00:00',
                'rest_end' => '13:00:00',
                'jam_kerja_max' => 8
            ],
            [
                'day' => 2,
                'in' => '08:00:00',
                'out' => '17:00:00',
                'rest_start' => '12:00:00',
                'rest_end' => '13:00:00',
                'jam_kerja_max' => 8
            ],
            [
                'day' => 3,
                'in' => '08:00:00',
                'out' => '17:00:00',
                'rest_start' => '12:00:00',
                'rest_end' => '13:00:00',
                'jam_kerja_max' => 8
            ],
            [
                'day' => 4,
                'in' => '08:00:00',
                'out' => '17:00:00',
                'rest_start' => '12:00:00',
                'rest_end' => '13:00:00',
                'jam_kerja_max' => 8
            ],
            [
                'day' => 5,
                'in' => '08:00:00',
                'out' => '16:30:00',
                'rest_start' => '11:30:00',
                'rest_end' => '13:00:00',
                'jam_kerja_max' => 5.5
            ],
            [
                'day' => 6,
                'in' => '08:00:00',
                'out' => '17:00:00',
                'rest_start' => '12:00:00',
                'rest_end' => '13:00:00',
                'jam_kerja_max' => 8
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('time_slots');
    }
}
