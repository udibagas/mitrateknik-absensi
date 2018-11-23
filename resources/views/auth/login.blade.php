@extends('layouts.login')

@section('content')
<div class="row justify-content-center" style="margin-top:200px;">
    <div class="col-md-4 text-center">
        <img src="{{asset('img/logo.jpeg')}}" alt="" style="height:40px"><br>
        <span style="font-size:30px;">MITRA TEKNIK</span>
        <form method="POST" action="{{ route('login') }}" style="margin-top:30px;">
            @csrf

            <div class="form-group">
                <input id="email" type="text" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>

                @if ($errors->has('email'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif
            </div>

            <div class="form-group">
                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

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
            <div class="text-muted">&copy; {{date('Y')}} - MitraTeknik</div>
        </form>
    </div>
</div>
@endsection
