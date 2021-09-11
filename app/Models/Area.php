<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'auth_area';

    protected $visible = ['id', 'name', 'code'];
}
