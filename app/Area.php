<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'base_area';

    protected $visible = ['id', 'name', 'code'];
}
