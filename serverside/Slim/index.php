<?php
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, and `Slim::delete`
 * is an anonymous function.
 */

// test route
$app->get('/hello/:name', function ($name) {
    echo "Hello, $name";
});

// get the file route
$app->get('/lesson/nouser/:name', function ($name) {
	//find the appropriate lesson file in the file system
	//let's make this safe
	if(strpos($name,".") === false){
		$contents = file_get_contents('../Data/Json/'.$name.'.json');
		//no need to parse it to json, we assume it's already valid json
		//bung it in the response
		if($contents === false){
		  echo '{"Error":"File Not Found"}';  
		}else{
		  echo $contents;
		}
	}
});

$app->get('/lesson/:user/:name', function ($user,$name) {
}

// POST route
$app->post('/post', function () {
    echo 'This is a POST route';
});

// PUT route
$app->put('/put', function () {
    echo 'This is a PUT route';
});

// DELETE route
$app->delete('/delete', function () {
    echo 'This is a DELETE route';
});

$app->run();