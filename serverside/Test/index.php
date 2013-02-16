<?php
namespace BrightSparksLabs\Adekamie;

require '../Slim/Slim/Slim.php';
require '../Edulab/DataConnection.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->config('debug', true);

$app->get('/hello/:name', function ($name) {
    echo "Hello, $name";
});

$app->get('/testpage', function () {
    phpinfo();
});

$app->post('/testpost/:name', function($name) {
    try{
        $mysqli = getConnection("mysql:dbname=test;host=localhost","testuser","testpassword");
    }
    catch(Exception $e){
        $message = $e->getMessage();
        echo "<p>error opening database connection: $message</p>";
        return;
    }
    try{
        $query = "CALL test.sp_addNewName('".$name."')";
        $result = $mysqli->query($query);
        //$result = $mysqli->query("INSERT INTO testtable (name) values('".$name."')");
    }
    catch(Exception $e)
    {
        $message = $e->getMessage();
        echo "<p>error sending database query: $message</p>";
        return;
    }
    try{
        $answer = "bad thing happened";
        //check if the query was successful
        if ($result) {
            $answer = "'{$name}' stored in database successfully";
        }
        else
        {
            $answer = "stored procedure failed to execute: ".$mysqli->error;
        }
        echo $answer;
    }
    catch(Exception $e)
    {
        $message = $e->getMessage();
        echo "<p>error building results: $message</p>";
        return;
    }    
});

$app->get('/testpost/:name', function($name){
    echo "<h2>fetching results for Get: $name</h2>";
    try{
        echo "<p>making connection...</p>";
        $mysqli = getConnection("mysql:dbname=test;host=localhost","testuser","testpassword");
        echo "<p>connection made</p>";
    }
    catch(Exception $e){
        $message = $e->getMessage();
        echo "<p>error opening database connection: $message</p>";
        return;
    }
    try{
        echo "<p>building query...</p>";
        $result = $mysqli->query("SELECT * FROM testtable WHERE name = '$name'");
        echo "<p>query sent</p>";
    }
    catch(Exception $e)
    {
        $message = $e->getMessage();
        echo "<p>error sending database query: $message</p>";
        return;
    }
    try{
        // send the results back as a html table
        echo "<table class='resultsTable'>";
        echo "<tr><th>ID</th><th>Name</th></tr>";
        while ($row = $result->fetch(\PDO::FETCH_ASSOC)) {
            echo "<tr><td>".$row['Name']."</td><td>".$row['Name']."</td></tr>";
        }
        echo '</table>';
    }
    catch(Exception $e)
    {
        $message = $e->getMessage();
        echo "<p>error building results: $message</p>";
        return;
    }    
});

$app->run();

?>