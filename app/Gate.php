<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gate extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'acc_door';

    protected $visible = ['id', 'name', 'device'];

    protected $with = ['device'];

    public function device() {
        return $this->belongsTo(Device::class, 'dev_id');
    }
}
