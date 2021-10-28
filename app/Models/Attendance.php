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
        'hari',
        'jam_masuk_efektif',
        'jam_keluar_efektif',
        'jam_mulai_istirahat_efektif',
        'jam_selesai_istirahat_efektif',
        'durasi_istirahat',
        'jam_kerja_efektif',
        'prosentase',
        'work_duration',
        'rest_duration',
        'late',
        'early'
    ];

    public function person()
    {
        return $this->belongsTo(Person::class, 'pin', 'pin');
    }

    public static function booted()
    {
        static::creating(function ($model) {
            $day = date('w', strtotime($model->date));
            $model->id = Str::uuid()->toString();
            $model->day = $day;

            //  dari hari kita akan tau time slot yang dipakai
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

    public function getJamMasukEfektifAttribute()
    {
        $first_in = new Carbon($this->first_in);
        $slot_in = new Carbon($this->sign_in_time);

        return $first_in > $slot_in ? $first_in : $slot_in;
    }

    public function getJamKeluarEfektifAttribute()
    {
        $slot_out = new Carbon($this->sign_off_time);

        // jika belum keluar set keluar adalah waktu saat ini
        if (!$this->last_out) {
            $now = new Carbon(date('H:i:s'));
            return $now < $slot_out ? $now : $slot_out;
        }

        $last_out = new Carbon($this->last_out);
        return $last_out > $slot_out ? $slot_out : $last_out;
    }

    public function getJamMulaiIstirahatEfektifAttribute()
    {
        $slot_rest_start = new Carbon($this->rest_start_time);

        if (!$this->rest_start) {
            return $slot_rest_start;
        }

        $rest_start = new Carbon($this->rest_start);
        return $rest_start > $slot_rest_start ? $slot_rest_start : $rest_start;
    }

    public function getJamSelesaiIstirahatEfektifAttribute()
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
        $jamKerjaMax = $this->jam_kerja_max ?: 8;
        return round(($this->jam_kerja_efektif / ($jamKerjaMax * 36)), 2);
    }

    public function getWorkDurationAttribute()
    {
        return static::secToTime($this->jam_kerja_efektif);
    }

    public function getRestDurationAttribute()
    {
        return static::secToTime($this->durasi_istirahat);
    }

    public function getLateAttribute()
    {
        $firstIn = new Carbon($this->first_in);
        $signInTime = new Carbon($this->sign_in_time);

        if ($firstIn > $signInTime) {
            return $firstIn->diffInMinutes($signInTime);
        }

        return false;
    }

    public function getEarlyAttribute()
    {
        $lastOut = new Carbon($this->last_out);
        $signOffTime = new Carbon($this->sign_off_time);

        if ($lastOut < $signOffTime) {
            return $lastOut->diffInMinutes($signOffTime);
        }

        return false;
    }

    protected static function secToTime($seconds)
    {
        $h = floor($seconds / 3600);
        $m = floor(($seconds % 3600) / 60);
        $s = $seconds % 60;

        return str_pad($h, 2, '0', STR_PAD_LEFT) . ':'
            . str_pad($m, 2, '0', STR_PAD_LEFT) . ':'
            . str_pad($s, 2, '0', STR_PAD_LEFT);
    }
}
