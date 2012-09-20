<?php
	function sanitiseForFileSystem($input)
	{
		//sanitise a filename
		// no subfolders, no special chars except underscore, no spaces, can't be less than one character or over 50 chars
		$test="/^[A-Za-z0-9_\-]{1,50}/";
		//return "test:$test input:$input matches:".preg_match($test, $input);
		
		if(preg_match($test, $input) > 0)
			return $input;
		else
			return "fail";
		
	}
	
	function verifySessionTicket($ticket)
	{
		//TODO: verify tickets!
		// until then, always return test as the user
		return "test";
	}
?>