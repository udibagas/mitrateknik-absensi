<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1');
    }

    public function index(Request $request)
    {
        return User::when($request->keyword, function ($q) use ($request) {
            $q->where('name', 'LIKE', '%' . $request->keyword . '%')
                ->orWhere('email', 'LIKE', '%' . $request->keyword . '%');
        })->orderBy($request->sort_prop ?: 'name', $request->sort_order ?: 'asc')->paginate($request->pageSize);
    }

    public function store(UserRequest $request)
    {
        $input = $request->all();
        $input['password'] = bcrypt($request->password);
        $input['api_token'] = str_random(60);
        User::create($input);
        return ['message' => 'Data telah disimpan'];
    }

    public function update(User $user, UserRequest $request)
    {
        $input = $request->all();
        $input['api_token'] = str_random(60);

        if ($request->password) {
            $input['password'] = bcrypt($request->password);
        }

        $user->update($input);
        return ['message' => 'Data telah disimpan'];
    }

    public function destroy(User $user)
    {
        $user->delete();
        return ['message' => 'Data telah dihapus'];
    }
}
