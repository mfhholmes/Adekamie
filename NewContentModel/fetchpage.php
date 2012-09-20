<?php
	include_once("utility.php");
	// always returns valid XML
	header('Content-type: text/xml');
	// parameters are session ticket and page
	if(isset($_GET['page']))
	{
		// sanitise returns 'fail' if the page is badly formed, so make sure there's a 'fail' xml file for it to return.
		$page=sanitiseForFileSystem($_GET['page']);
	}
	else
	{
		$page='default';
	}
	
	//validate the session ticket and return the user name
	if(isset($_GET['session']))
	{
		$user=verifySessionTicket($_GET['session']);
		if($user == '')
		{
			// session didn't validate, so quit
			exit("<error>bad session ticket</error>");
		}
	}
	else
	{
		//fudging the URLs is bad! alert and quit
		exit("<error>missing session ticket</error>");
	}
	
	// pages are stored in xml file by user and page
	$path="UserContent/$user/$page.xml";
	//exit("<debug>$path</debug>");
	
	// check if there's a file there to open
	if(!file_exists($path))
	{
		// check if the base content exists
		$basepath = "BaseContent/$page.xml";
		if(!file_exists($basepath))
		{
			// nope, file doesn't exist
			exit("<error>$page doesn't exists</error>");
		}
		// copy the base content to the user's path
		copy($basepath,$path);
	}
	// we could read it in bit by bit and validate it, but...nah let's just bung the whole thing at the output :)
	// spot of debugging here though: wrap the file contents in the filename so we can spot buggered file references from the client
	echo "<file name='$path'>";
	echo file_get_contents($path);
	echo "</file>";
	
?>
