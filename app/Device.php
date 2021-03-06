<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'acc_device';

    protected $visible = ['id', 'sn', 'dev_alias', 'area'];

    protected $with = ['area'];

    public function area() {
        return $this->belongsTo(Area::class, 'area_id');
    }
}
