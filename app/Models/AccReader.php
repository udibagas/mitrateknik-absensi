<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccReader extends Model
{
    use HasFactory;

    protected $connection = 'pgsql';

    protected $table = 'acc_reader';

    protected $visible = ['id', 'name', 'reader_no', 'reader_state'];

    public function door()
    {
        return $this->belongsTo(Gate::class, 'door_id');
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
