<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'name',
        'department',
        'pin',
        'first_in',
        'last_out',
        'rest_start',
        'rest_end',
        'day',
        'sign_in_time',
        'sign_off_time',
        'rest_start_time',
        'rest_end_time',
        'jam_kerja_max'
    ];

    protected $appends = [
        'day',
        'jam_masuk_efektif',
        'jam_keluar_efektif',
        'jam_mulai_istirahat',
        'jam_selesai_istirahat',
        'durasi_istirahat',
        'jam_kerja_efektif',
        'prosentase'
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid()->toString();

            //  dari hari kita akan tau time slot yang dipakai
            $day = date('w', strtotime($model->date));
            $timeSlot = TimeSlot::where('day', $day)->first();

            // jika ada setingan timeslot isi dengan data timeslot, jika tidak ada biarkan default
            if ($timeSlot) {
                $model->sign_in_time = $timeSlot->in;
                $model->sign_off_time = $timeSlot->out;
                $model->rest_start_time = $timeSlot->rest_start;
                $model->rest_end_time = $timeSlot->rest_end;
                $model->jam_kerja_max = $timeSlot->jam_kerja_max;
            }
        });
    }

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }

    public function getJamMasukEfektif()
    {
        $first_in = new Carbon($this->first_in);
        $slot_in = new Carbon($this->sign_in_time);

        return $first_in > $slot_in ? $first_in : $slot_in;
    }

    public function getJamKeluarEfektif()
    {
        $slot_out = new Carbon($this->sign_off_time);

        if (!$this->last_out) {
            return $slot_out;
        }

        $last_out = new Carbon($this->last_out);
        return $last_out > $slot_out ? $slot_out : $last_out;
    }

    public function getJamMulaiIstirahatEfektif()
    {
        $slot_rest_start = new Carbon($this->rest_start_time);

        if (!$this->rest_start) {
            return $slot_rest_start;
        }

        $rest_start = new Carbon($this->rest_start);
        return $rest_start > $slot_rest_start ? $slot_rest_start : $rest_start;
    }

    public function getJamSelesaiIstirahatEfektif()
    {
        $slot_rest_end = new Carbon($this->rest_end_time);

        if (!$this->rest_end) {
            return $slot_rest_end;
        }

        $rest_end = new Carbon($this->rest_end);
        return $rest_end > $slot_rest_end ? $rest_end : $slot_rest_end;
    }

    public function getDurasiIstirahatAttribute()
    {
        $start = new Carbon($this->jamMulaiIstirahatEfektif);
        $end = new Carbon($this->jamSelesaiIstirahatEfektif);

        return $end->diffInSeconds($start);
    }

    public function getJamKerjaEfektifAttribute()
    {
        $first_in = new Carbon($this->jamMasukEfektif);
        $last_out = new Carbon($this->jamKeluarEfektif);

        $jamKerjaEfektif = $last_out->diffInSeconds($first_in);

        return $jamKerjaEfektif - $this->durasiIstirahat;
    }

    public function getProsentaseAttribute()
    {
        return $this->jam_kerja_efektif / ($this->jam_kerja_max * 36);
    }
}
