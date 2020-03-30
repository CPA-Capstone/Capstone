<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\Errors;
use Illuminate\Console\ConfirmableTrait;

class DataController extends Controller
{
	
	public function load(Request $request)
    {
		
    	$files = glob(public_path() . '/data/*');
		foreach($files as $f)
		{
		  if(is_file($f))
		    unlink($f);
		}
        $sql = $request->get('sql');
        $dbName = $request->get('DBname');

        $myPDO = new \PDO('sqlite:' . public_path() . '/data/' . $dbName . '.sqlite');

        $myPDO->exec($sql);

        $PDOerror = $myPDO->errorInfo()[2];

        if($myPDO->errorInfo()[0] == "00000")
        {
        	//dd($myPDO->errorInfo());

	        $file = public_path() . "/data/" . $dbName . ".sqlite";

		    header('Content-Description: File Transfer');
		    header('Content-Type: application/sqlite');
		    header('Content-Disposition: attachment; filename="'.basename($file).'"');
		    header('Expires: 0');
		    header('Cache-Control: must-revalidate');
		    header('Pragma: public');
		    header('Content-Length: ' . filesize($file));

		    readfile($file);
	    }
	    else
	    {
	    	return view('error', compact(['sql', 'PDOerror']));
	    }
    }

    public function store(Request $request)
    {
    	$error = new \App\Error;

    	$error->errorSQL = ' ';
    	$error->errorMessage = $request->get('error');
    	$error->errorStatus = 'u';
    	$error->timestamps = false;
    	$error->save();

    	//Send email here

    	return view('success');
    }
}
