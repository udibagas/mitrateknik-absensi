<?php

namespace App\Events;

use App\Models\Access;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AttendanceEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $access;

    public $message;

    public $productivity;

    public $gate;

    public $late;

    public $first_in;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Access $access, $gate, $productivity = 0, $late = null, $first_in = false)
    {
        $this->access = $access;
        $this->productivity = $productivity;
        $this->gate = $gate;
        $this->late = $late;
        $this->first_in = $first_in;
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
