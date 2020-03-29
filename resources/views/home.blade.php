@extends('layouts.layout')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <H3>Errors</H3>
                </div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    <table>
                        <tr>
                          <td><h5>Error ID</h5></td>
                          <td><h5>Error Message</h5></td>
                          <td><h5>Error Status</h5></td>
                        </tr>
                        @foreach ($errors as $errors)
                            <tr>
                            <td>

                                    {{ $errors->errorID }}
                            </td>
                            <td>
                                    {{ $errors->errorMessage }}
                            </td>
                            <td>{{ $errors->errorStatus }}</td>
                            </tr>
                            @endforeach
                    
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
