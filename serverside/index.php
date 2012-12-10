<?php
namespace BrightSparksLabs\Adekamie;
require '/Slim/Slim/Slim.php';
require './Edulab/DataModel.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

// GET route test function - checks that everything's ticketyboo with the framework
$app->get('/hello/:name', function($name){
    echo "Hello ".$name;
});

$app->get('/templates', function(){
    $result = LessonTemplate::index();
    if($result){
	echo json_encode($result);
    }else{
        echo '{"no result"}';
    }
});
$app->get('/template/:name', function($name){
    if($name != ""){
        $temp = new LessonTemplate($name);
        $result = $temp->ToArray();
    }
    header("Content-Type: application/json");
    if($result){
	echo json_encode($result);
    }else{
        echo '{"no result"}';
    }
});

$app->post('/template/:name', function($name){
    $template = new LessonTemplate($name);
    header("Content-Type: application/json");
    if($template->save()){
        echo json_encode($template->getId());
    }else {
        echo '{"failed"}';
    }
});
$app->get('/lesson/:name', function ($name) use ($app) {
    //TODO: confirm that the user is authorised for this lesson
    //TODO: don't return the default file, but return the user's existing file (or make one)
    $filename= "./Data/Json/".cleanFileRef($name).".json";
    if(file_exists($filename))
    {
        $content = file_get_contents($filename);
    }
    else
    {
        $content= '{"error":"file '.$filename.' not found"}';
    }
    try
    {
        $answr = $app->response();
        $answr['Content-Type'] = 'application/json';
        $answr['X-Powered-By'] = 'BrightSparksLabs';
        $answr->body($content);
    }
    catch(Exception $e)
    {
        echo $e->getMessage();
    }
    
});
// POST route
$app->post('/lesson/:name/:user', function ($name, $username) {
    //TODO: determine the user id and authorisation from the session cookie
    $cookie = $_COOKIE['Adekamie'];
    $currentuser = getUserForSession($cookie, $app->request());
    //TODO: check if the logged-in user has access authorisation for this user
    $permission = checkUserAuthorisationForUser($currentuser, $username);
    if(!$permission)
    {
        $app->response()->status(401);
        return;
    }
    //TODO: check if the user already has a file for this lesson
    
    //TODO: move the existing file to history and add this one
});

$app->get('/:userId/lesson/:name/history', function ($userId, $name) use($app){
    //TODO: determine the user id and authorisation from the session cookie
    
});
// PUT route
$app->put('/put', function () {
    echo 'This is a PUT route';
});

// DELETE route
$app->delete('/delete', function () {
    echo 'This is a DELETE route';
});

$app->notFound(function ()  {
    echo 'your route is not found! rar!';
});

$app->run();
?>