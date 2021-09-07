<?php

namespace App\Events;

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

    public $attTransaction;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(AttTransaction $attTransaction)
    {
        $this->attTransaction = $attTransaction->load(['person']);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('attendance.' . $this->attTransaction->device_id);
    }

    public function broadcastAs()
    {
        return 'log';
    }
}
