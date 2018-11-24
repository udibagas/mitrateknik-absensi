<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'att_transaction';

    protected $fillable = ['att_time', 'att_datetime'];

    public $timestamps = false;

}
