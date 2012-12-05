<?php
namespace BrightSparksLabs\Adekamie;

require 'Slim/Slim/Slim.php';
require 'Adekamie_general.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/hello/:name', function ($name) {
    echo "Hello, $name";
});

$app->get('/testpage', function () {
    phpinfo();
});

//$app->post('/testpost/:name', function($name) {
//    try{
//        $mysqli = getConnection("localhost","test","testuser","testpassword");
//    }
//    catch(Exception $e){
//        $message = $e->getMessage();
//        echo "<p>error opening database connection: $message</p>";
//        return;
//    }
//    try{
//        $result = $mysqli->query("CALL sp_addNewName($name)");
//    }
//    catch(Exception $e)
//    {
//        $message = $e->getMessage();
//        echo "<p>error sending database query: $message</p>";
//        return;
//    }
//    try{
//        $answer = "bad thing happened";
//        //check if the query was successful
//        //and store the true/false result (rather than the result set which we're about to free before returning)
//        if ($result) {
//            $answer = "'$name' stored in database successfully";
//        }
//        else
//        {
//            $answer = "stored procedure failed to execute";
//        }
//        //free the results (this is why we don't 'return $result')
//        $result->free();
//        clearExcessResults($mysqli);
//        echo $answer;
//    }
//    catch(Exception $e)
//    {
//        $message = $e->getMessage();
//        echo "<p>error building results: $message</p>";
//        return;
//    }    
//});
//
//$app->get('/testpost/:name', function($name){
//    echo "<p>results for Get: $name";
//    try{
//        $mysqli = getConnection("localhost","test","testuser","testpassword");
//    }
//    catch(Exception $e){
//        $message = $e->getMessage();
//        echo "<p>error opening database connection: $message</p>";
//        return;
//    }
//    try{
//        $result = $mysqli->query("SELECT * from test WHERE name = '$name';");
//    }
//    catch(Exception $e)
//    {
//        $message = $e->getMessage();
//        echo "<p>error sending database query: $message</p>";
//        return;
//    }
//    try{
//        // send the results back as a html table
//        echo "<table class='resultsTable'>";
//        echo "<tr><th>ID</th><th>Name</th></tr>";
//        while ($row = $result->fetch_assoc()) {
//            echo "<tr><td>".$row["id"]."</td><td>".$row["name"]."</td></tr>";
//        }
//        echo '</table>';
//        $result->free();
//    }
//    catch(Exception $e)
//    {
//        $message = $e->getMessage();
//        echo "<p>error building results: $message</p>";
//        return;
//    }    
//});