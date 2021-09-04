<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    use HasFactory;

    protected $fillable = [
        'person_pin',
        'person_name',
        'department',
        'date',
        'first_in',
        'last_out',
        'rest_start',
        'rest_end'
    ];

    public function getDayAttribute()
    {
        return date('w', strtotime($this->date));
    }

    public function getTimeSlotAttribute()
    {
        return TimeSlot::where('day', $this->day)->first();
    }

    public function getJamMasukEfektif()
    {
        $first_in = new Carbon($this->first_in);
        $slot_in = new Carbon($this->time_slot->in);

        return $first_in > $slot_in ? $first_in : $slot_in;
    }

    public function getJamKeluarEfektif()
    {
        $slot_out = new Carbon($this->time_slot->out);

        if (!$this->last_out) {
            return $slot_out;
        }

        $last_out = new Carbon($this->last_out);
        return $last_out > $slot_out ? $slot_out : $last_out;
    }

    public function getJamMulaiIstirahatEfektif()
    {
        $slot_rest_start = new Carbon($this->time_slot->rest_start);

        if (!$this->rest_start) {
            return $slot_rest_start;
        }

        $rest_start = new Carbon($this->rest_start);
        return $rest_start > $slot_rest_start ? $slot_rest_start : $rest_start;
    }

    public function getJamSelesaiIstirahatEfektif()
    {
        $slot_rest_end = new Carbon($this->time_slot->rest_end);

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
        return $this->jam_kerja_efektif / ($this->time_slot->jam_kerja_max * 36);
    }
}
