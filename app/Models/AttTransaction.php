<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttTransaction extends Model
{
    use HasFactory;

    protected $connection = 'pgsql';

    protected $table = 'att_transaction';

    public $timestamps = false;

    public function device()
    {
        return $this->belongsTo(Device::class);
    }

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_pin', 'pin');
    }
}
