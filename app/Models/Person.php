<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'pers_person';

    protected $with = ['department'];

    protected $visible = ['id', 'pin', 'name', 'last_name', 'gender', 'department'];

    public function department()
    {
        return $this->belongsTo(Department::class, 'dept_id');
    }
}
