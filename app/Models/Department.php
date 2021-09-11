<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'auth_department';

    protected $visible = ['id', 'name', 'code'];
}
