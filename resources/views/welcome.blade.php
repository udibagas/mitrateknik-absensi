<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>MITRA TEKNIK</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 80px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>
                    @endauth
                </div>
            @endif

            <div class="content">
                <div class="title m-b-md">
                    <img src="{{asset('img/logo.jpeg')}}" alt="" style="height:60px">
                    MITRA TEKNIK
                </div>
                General Trade & Supplier : Fingerprint Time & Attendance, Access Control, CCTV, Metal Detektor, Guard Tour System

                <div class="links" style="margin-top:100px">
                    <a href="http://www.mitrateknik.co.id/">Home</a>
                    <a href="http://www.mitrateknik.co.id/Table/About/">About</a>
                    <a href="http://www.mitrateknik.co.id/Product/">Product</a>
                    <a href="http://www.mitrateknik.co.id/Table/Services/">Services</a>
                    <a href="http://www.mitrateknik.co.id/Gallery/">Gallery</a>
                    <a href="http://www.mitrateknik.co.id/Website-Owner.html">Contact Us</a>
                </div>
            </div>
        </div>
    </body>
</html>
