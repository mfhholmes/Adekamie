<?php

	require '/Slim/Slim.php';

	function app()
	{
		static $app;

		if(gettype($app) != 'object'){
			$app = new Slim();
		}

		return $app;
	}

	function test()
	{
		app()->response()->body('hello world');
	}

	app()->get('/', test);
	app()->run();

?>