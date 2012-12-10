<?php
namespace BrightSparksLabs\Adekamie;

/**
 * Contains the data connection stuff
 *
 * @author Marcus
 */
class DataConnection {
    function __construct(){
        //TODO: remove this and use a properly configured set of credentials!
        getConnection("localhost","edulab","testuser","testpassword");
    }
    static function getConnection($mysqlServername="",$mysqlDBname="",$mysqlUsername="",$mysqlPassword=""){
        static $conn;
        if(!$conn)
        {
            try
            {
                $conn = new \mysqli($mysqlServername, $mysqlUsername, $mysqlPassword, $mysqlDBname);
                if ($conn->connect_errno) {
                    echo("database connection returned no result with:". $conn->connect_error);
                }
            }
            catch(Exception $e)
            {
                echo("database connection failed with: ".$e->getMessage());
            }
        }
        return $conn;
    }
}

?>
