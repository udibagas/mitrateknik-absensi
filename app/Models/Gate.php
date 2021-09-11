<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gate extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'acc_door';

    protected $visible = ['id', 'name', 'device'];

    protected $with = ['device'];

    public function device()
    {
        return $this->belongsTo(Device::class, 'dev_id');
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
