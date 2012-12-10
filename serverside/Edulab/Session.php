<?php
namespace BrightSparksLabs\Adekamie;
/**
 * Handles sessions and authentication
 *
 * @author Marcus
 */
class Session {
    function checkSession($sessionId, $request){
        // make sure the request values match the session values
        // get the session values from the database

        return true;
    }

    function getUserForSession($cookie, $request){
        if(checkSession($cookie, $request)){
            //TODO: match the cookie's session id to the database
            return 'testuser';
        }
        else {
            return null;
        }    
    }

    function createSessionId($user, $ip ){
        //TODO: create a new session record
        $mysqli = Utility::getConnection();
        //get the userid
        $safeName = $mysqli->escape_string($user);
        $result = $mysqli->query("CALL edulab.spGetUserId('$safeName')");
        if($result)
        {
            $row = $result->fetch_assoc();
            $userId = $row['UserId'];
        }else{
            //user doesn't exist or other error
            return false;
        }
        // create the guid here and add it to the database here
        //  - easier than working out how to make all possible databases create a guid
        $guid  = Utility::createGuid;
        $command="spCreateSession('$userId','$ip','$guid')";
        $result = $mysqli->query($command);
        if($result)
            return $guid;
        else
            return false;
    }

    function closeSession($sessionId){
        //TODO: mark the session record as closed
    }

}

?>
