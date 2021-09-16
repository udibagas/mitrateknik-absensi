<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Person extends Model
{
    protected $connection = 'pgsql';

    protected $table = 'pers_person';

    protected $with = ['department'];

    protected $visible = [
        'id',
        'pin',
        'id_card',
        'name',
        'last_name',
        'gender',
        'department',
        'photo_path',
        'auth_dept_id',
        'initial_name'
    ];

    protected $appends = ['initial_name'];

    public $timestamps = false;

    public function department()
    {
        return $this->belongsTo(Department::class, 'auth_dept_id');
    }

    public function getPhotoPathAttribute($value)
    {
        if (!$value) {
            return url("/images/user-" . strtolower($this->gender) . ".png");
        }

        return env('SERVER_ABSENSI', 'http://10.4.21.111:8098') . $value;
    }

    public function getInitialNameAttribute()
    {
        $firstInitial = substr($this->name, 0, 1);

        if (!$this->last_name) {
            return $firstInitial;
        }

        return $firstInitial . substr($this->last_name, 0, 1);
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
