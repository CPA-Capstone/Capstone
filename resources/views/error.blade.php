@extends('layouts.layout')

@section('content')
<div class="container">
    <h2> An error has occured </h2>

    <p>
        Sorry about that... 
        <br>Click the button below to send an error report. 
        <br>(Note that the error report will contain the stucture of your database, as well as the data you have entered)
    </p>
    <form method="POST" action="/report">
      {{ csrf_field() }}
        <input type="hidden" name="sql" value="{{ $sql }}">
        <input type="hidden" name="error" value="{{ $PDOerror }}">

        <input type="submit" class="btn btn-danger" name="report" value="Send Report">
    </form>
</div>
@endsection
