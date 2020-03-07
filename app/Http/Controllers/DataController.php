<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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

        if($myPDO->exec($sql))
        {

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
	    	//Query Fails
	    }
    }    
}
