<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Access extends Model
{
    const CREATED_AT = 'create_time';

    const UPDATED_AT = 'update_time';

    protected $connection = 'pgsql';

    protected $table = 'acc_transaction';

    protected $fillable = [
        'id',
        'acc_zone', // ambil dari acc_zone
        'acc_zone_code', // ambil dari acc_zone
        'area_name', // ambil dari auth_area
        'card_no', // nomor kartu
        'dept_code', // ambil dari auth_department
        'dept_name', // ambil dari auth_department
        'dev_alias', // ambil dari acc_device
        'dev_id', // ambil dari acc_device
        'dev_sn', // ambil dari acc_device
        'event_addr', // 1 ?
        'event_name', // acc_newEventNo_0 ?
        'event_no', // 0 ?
        'event_point_id', // gate id (door)
        'event_point_name', // gate name (door)
        'event_point_type', // 0
        'event_time', // waktu access 2021-09-08 12:05:02
        'name', // nama pegawai
        'last_name', // nama pegawai
        'pin', // nip pegawai
        'log_id', // increment
        'reader_name', // ambil dari acc_reader
        'reader_state', // ambil dari acc_reader
        'temperature', // suhu tubuh
        'unique_key', // CLWS211960023_157_2021-09-07 12:03:31, => [dev_sn]_[log_id]_[event_time]
        'verify_mode_name', // common_verifyMode_other
        'verify_mode_no', // 200
        'vid_linkage_handle', // snapshot wajah
    ];

    protected $visible = [
        'id',
        'dept_name',
        'event_point_id',
        'event_point_name',
        'event_time',
        'name',
        'last_name',
        'pin',
        'temperature',
        'vid_linkage_hanlde',
        'event_time_date',
        'event_time_time',
        'vid_linkage_handle',
        'photo_path',
        'attendance'
    ];

    protected $appends = [
        'event_time_date',
        'event_time_time',
        'photo_path',
        'attendance',
        'gate'
    ];

    public function person()
    {
        return $this->belongsTo(Person::class, 'pin', 'pin');
    }

    public function gate()
    {
        return $this->belongsTo(Gate::class, 'event_point_id');
    }

    public function getEventTimeDateAttribute()
    {
        return (new Carbon($this->event_time))->format('Y-m-d');
    }

    public function getEventTimeTimeAttribute()
    {
        return (new Carbon($this->event_time))->format('H:i:s');
    }

    public function getPhotoPathAttribute()
    {
        if (!$this->vid_linkage_handle) {
            if ($this->person) {
                return $this->person->photo_path;
            }

            return null;
        }

        return env('SERVER_ABSENSI', 'http://10.4.21.111:8098') . $this->vid_linkage_handle;
    }

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = str_replace('-', '', Str::uuid()->toString());
        });
    }

    public function getAttendanceAttribute()
    {
        $data = Attendance::where('pin', $this->pin)
            ->where('date', $this->event_time_date)
            ->first();

        return [
            'prosentase' => $data ? $data->prosentase : 0,
            'work_duration' => $data ? $data->work_duration : '00:00:00',
        ];
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

    public function getGateAttribute()
    {
        return strtoupper(substr($this->event_point_name, -2));
    }
}
