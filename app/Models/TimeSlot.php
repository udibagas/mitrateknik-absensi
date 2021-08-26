<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    protected $fillable = ['day', 'in', 'out', 'rest_start', 'rest_end', 'jam_kerja_max'];
}
