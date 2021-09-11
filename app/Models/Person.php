<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Person extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'pers_person';

    protected $with = ['department'];

    protected $visible = ['id', 'pin', 'id_card', 'name', 'last_name', 'gender', 'department', 'photo_path', 'auth_dept_id'];

    public $timestamps = false;

    public function department()
    {
        return $this->belongsTo(Department::class, 'auth_dept_id');
    }

    public function getPhotoPathAttribute($value)
    {
        return url(env('SERVER_ADDR', '10.4.21.111'), $value);
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
