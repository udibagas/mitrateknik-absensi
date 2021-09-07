<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttRecord extends Model
{
    use HasFactory;

    protected $connection = 'pgsql';

    protected $table = 'att_record';

    protected $appends = ['day'];

    public $timestamps = false;

    public function department()
    {
        return $this->belongsTo(Department::class, 'dept_id');
    }

    public function person()
    {
        return $this->belongsTo(Person::class, 'pin', 'pin');
    }

    public function getDayAttribute()
    {
        $days = [
            'MINGGU',
            'SENIN',
            'SELASA',
            'RABU',
            'KAMIS',
            'JUMAT',
            'SABTU'
        ];

        return $days[$this->week];
    }

    public function getCardValidDataAttribute($value)
    {
        // hari jumat beda shift
        $defaultShift   = $this->week == 5 ? ['07:00', '15:30'] : ['08:00', '17:00'];
        $shift          = $this->shift_time_data ? explode('-', $this->shift_time_data) : $defaultShift;
        $data           = $value ? explode('-', $value) : ['[', ']'];

        // tidak masuk
        if ($data == ['[', ']']) {
            return null;
        }

        // jika tidak absen masuk set absen masuk sesuai awal shift
        if ($data[0] == '[') {
            $data[0] = $shift[0];
        }

        // jika tidak absen pulang set absen pulang sesuai akhir shift
        if ($data[1] == ']') {
            $data[1] = $shift[1];
        }

        return implode('-', $data);
    }

    public function getActualMinuteAttribute($value)
    {
        if ($value) {
            return $value;
        }

        if (!$this->card_valid_data) {
            return 0;
        }

        // TODO: return diff in minutes card_valid_data
    }

    public function getStartRestAttribute()
    {
        // ambil data att_transaction, yg di gate out, antara jam 11.30 - 12.55
    }

    public function getEndRestAttribute()
    {
        // ambil data att_transaction, yg di gate in, antara jam 12.30 - 13.30
    }

    public function getEarlyRestAttribute()
    {
        // jika
    }

    public function getValidMinuteAttribute($value)
    {
        // TODO: dikurangi late & early istirahat
        // return $value - $lateRest - $earlyRest;
    }

    public function getPercentageAttribute()
    {
        return $this->valid_minute / $this->should_minute  * 100;
    }
}
