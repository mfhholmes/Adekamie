<?php
namespace BrightSparksLabs\Adekamie;

/**
 * Contains the data connection stuff
 *
 * @author Marcus
 */

function getConnection($pdoDNS="",$pdoUsername="",$pdoPassword="", $pdoOptions = null)
{
        
    static $pdo = null;
    if($pdo === null)
    {
        try
        {
            if(!$pdoOptions)
                $pdoOptions = array();
            $pdo = new \PDO($pdoDNS, $pdoUsername, $pdoPassword, $pdoOptions);
        }
        catch(Exception $e)
        {
            echo("database connection failed with: ".$e->getMessage());
        }
    }
    return $pdo;
}
?>
