<?php

namespace App\Models;

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
        'vid_linkage_hanlde' // snapshot wajah

    ];

    // id: 8a84 95ef 7bbe 88f3 017b bf3b 2a1f 0709 created : 2021-09-07 14:48:50.845, event_time: 2021-09-07 12:03:31, 0x47cdb684f50d9d
    // id: 8a8495ef7bbe88f3017bbf3b2a 5d070b created : 2021-09-07 14:48:50.909, event_time: 2021-09-07 12:03:33
    // id: 8a8495ef7bbf4e30017bbf62ec 28001b created : 2021-09-07 15:32:16.423, event_time: 2021-09-07 15:32:06

    public $timestamps = false;

    public function gate()
    {
        return $this->belongsTo(Gate::class, 'event_point_id');
    }

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid()->toString();
        });
    }
}
