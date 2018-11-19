<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'att_transaction';

}
