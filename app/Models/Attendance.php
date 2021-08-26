<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'att_transaction';

    protected $fillable = [
        'id', 'dept_id', 'dept_no', 'dept_name',
        'person_pin', 'person_name', 'person_last_name',
        'area_id', 'area_no', 'area_name',
        'device_id', 'device_sn',
        'att_datetime', 'att_date', 'att_time', 'att_state', 'att_verify', 'mark'
    ];

    protected $with = ['gate'];

    public $timestamps = false;

    public function gate()
    {
        return $this->belongsTo(Gate::class, 'device_id');
    }
}
