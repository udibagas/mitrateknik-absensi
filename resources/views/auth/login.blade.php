@extends('layouts.login')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-4 text-center" style="margin-top:120px;background-color:rgba(0, 0, 0, 0.7);padding:20px;">
        <form method="POST" action="{{ route('login') }}">
            <img src="{{asset('img/logo-kai.png')}}" alt="" style="height:120px"><br>
            <span style="font-size:25px;color:#fff;">UPT BALAI YASA TEGAL</span>
            <br><br>
            @csrf

            <div class="form-group">
                <input id="email" type="text" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus placeholder="Username">

                @if ($errors->has('email'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif
            </div>

            <div class="form-group">
                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required placeholder="Password">

                @if ($errors->has('password'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>
            <input type="hidden" name="remember" value="1">

            <div class="form-group mb-0">
                <button type="submit" class="btn btn-primary" style="width:100%">
                    LOGIN
                </button>
            </div>
            <br><br>
            <div class="text-muted">&copy; {{date('Y')}} - <a href="http://www.mitrateknik.co.id/">MitraTeknik</a></div>
        </form>
    </div>
</div>
@endsection
