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
}
