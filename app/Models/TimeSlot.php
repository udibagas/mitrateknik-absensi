<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'att_timeslot';

    // protected $fillable = ['day', 'in', 'out', 'rest_start', 'rest_end', 'jam_kerja_max'];

    protected $appends = ['hari'];

    public function getHariAttribute()
    {
        $hari = [
            'MINGGU',
            'SENIN',
            'SELASA',
            'RABU',
            'KAMIS',
            'JUMAT',
            'SABTU'
        ];

        return key_exists($this->day, $hari) ? $hari[$this->day] : '';
    }
}
