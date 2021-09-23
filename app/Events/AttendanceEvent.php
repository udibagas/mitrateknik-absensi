<?php

namespace App\Events;

use App\Models\Access;
use App\Models\AttTransaction;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AttendanceEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $access;

    public $percentage;

    public $late;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Access $access)
    {
        $this->access = $access;

        // TODO: passing prosentase jika > jam 17.00
        // $this->percentage = compact('hour', 'percent');
        // passing terlambat berapa menit jika pertama kali absen
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('log');
    }

    public function broadcastAs()
    {
        return 'log';
    }
}
