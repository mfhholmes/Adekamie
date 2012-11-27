<?php
namespace BrightSparksLabs\Adekamie;
require '/Slim/Slim/Slim.php';
require '/Adekamie_general.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->post('/register/:email/:hashvalue/:sig', function ($email, $hashvalue, $sig) use($app) {
    //TODO: validate the signature against known values
    // interesting, we don't know their password so we can't send it back to them
    $regcode = ""; // generate this randomly, not from their user id
    $message = "welcome to Adekamie \n Your email address has been registered with Adekamie.com \n To confirm your registration please visit this url: http://demo.adekamie.com/confirm.php?$regcode \n Thanks for playing! \n The Adekamie Team";
    mail($email,"Adekamie registration details",$message);
});

$app->get('/login/:email/:hashvalue/:sig', function ($email, $hashvalue, $sig) use ($app){
    //login and return the session id as a cookie
    $sessionTicket = 'DEBUG_COOKIE_VALUE';
    
    $app->setCookie('AdekamieSessionTicket', $sessionTicket, '1 day');
});

$app->post('/logout/', function () use($app) {
    //end the session for this session
    $sessionId = $app.getCookie('AdekamieSessionTicket');
    // find the session id in the database
    closeSession($sessionId);
    // mark the session as completed
});
?>
