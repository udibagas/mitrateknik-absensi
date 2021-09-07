<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Person extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'pers_person';

    protected $with = ['department'];

    protected $visible = ['id', 'pin', 'name', 'last_name', 'gender', 'department', 'photo_path', 'dept_id'];

    public $timestamps = false;

    public function department()
    {
        return $this->belongsTo(Department::class, 'dept_id');
    }

    public function getPhotoPathAttribute($value)
    {
        return url(env('SERVER_ADDR', '10.4.21.111'), $this->photo_path);
    }
}
