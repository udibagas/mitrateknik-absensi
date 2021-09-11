<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'acc_device';

    protected $visible = ['id', 'sn', 'dev_alias', 'device_name', 'area'];

    protected $with = ['area'];

    public function area()
    {
        return $this->belongsTo(Area::class, 'auth_area_id');
    }

    /**
     * Get the value indicating whether the IDs are incrementing.
     *
     * @return bool
     */
    public function getIncrementing()
    {
        return false;
    }

    /**
     * Get the auto-incrementing key type.
     *
     * @return string
     */
    public function getKeyType()
    {
        return 'string';
    }
}
