<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->sort ? $request->sort : 'name';
        $order = $request->order == 'ascending' ? 'asc' : 'desc';

        return User::when($request->keyword, function($q) use ($request) {
                return $q->where('name', 'LIKE', '%'.$request->keyword.'%')
                    ->orWhere('email', 'LIKE', '%'.$request->keyword.'%');
            })->orderBy($sort, $order)->paginate($request->pageSize);
    }

    public function store(UserRequest $request)
    {
        $input = $request->all();
        $input['password'] = bcrypt($request->password);
        return User::create($input);
    }

    public function update(User $user, UserRequest $request)
    {
        $input = $request->all();

        if ($request->password) {
            $input['password'] = bcrypt($request->password);
        }

        $user->update($input);
        return $user;
    }

    public function destroy(User $user)
    {
        return ['status' => $user->delete()];
    }
}
