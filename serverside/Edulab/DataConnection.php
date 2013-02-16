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
            error_log("database connection using values $pdoDNS, $pdoUsername, $pdoPassword, $pdoOptions failed with: ".$e->getMessage());
            return false;
        }
    }
    return $pdo;
}
?>
