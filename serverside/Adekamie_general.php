<?php

namespace BrightSparksLabs\Adekamie;

function getConnection(){
    static $conn = null;
    $mysqlServername="";
    $mysqlDBname="";
    $mysqlUsername="";
    $mysqlPassword="";
    
    if(!$conn)
    {
        try
        {
            $conn = new mysqli($mysqlServername, $mysqlUsername, $mysqlPassword, $mysqlDBname);
            if ($conn->connect_errno) {
                die("database connection returned no result with:". $conn->connect_error);
            }
        }
        catch(Exception $e)
        {
            die("database connection failed with: ".$e->getMessage());
        }
    }
    return $conn;
}

function cleanFileRef($start){
    // remove any '.'
    $result = str_replace('.', '', $start);
    // remove any '//'
    $result = str_replace("//","",$result);
    
    return $result;
}

function checkSession($sessionId, $request){
    // make sure the request values match the session values
    // get the session values from the database
    
    return true;
}

function getUserForSession($cookie, $request){
    if(checkSession($cookie, $request)){
        //TODO: match the cookie's session id to the database
    }
    else {
        return null;
    }    
}

function createSessionId($user, $ip ){
    //TODO: create a new session record
    $conn = getConnection();
    //get the userid
    if($result = $conn->query("getUserId('$user')"))
    {
        $row = $result->fetch_assoc();
        $userId = $row['userId'];
    }else{
        //user doesn't exist or other error
        return false;
    }
    // create the guid here and add it to the database here
    //  - easier than working out how to make all possible databases create a guid
    $guid  = create_guid("Adekamie");
    $command="createSession($userId,'$ip','$guid')";
    return $guid;
}

function closeSession($sessionId){
    //TODO: mark the session record as closed
}

function createGuid($namespace = '') {     
    static $guid = '';
    $uid = uniqid("", true);
    $data = $namespace;
    $data .= $_SERVER['REQUEST_TIME'];
    $data .= $_SERVER['HTTP_USER_AGENT'];
    $data .= $_SERVER['LOCAL_ADDR'];
    $data .= $_SERVER['LOCAL_PORT'];
    $data .= $_SERVER['REMOTE_ADDR'];
    $data .= $_SERVER['REMOTE_PORT'];
    $hash = strtoupper(hash('ripemd128', $uid . $guid . md5($data)));
    $guid = '{' .   
            substr($hash,  0,  8) . 
            '-' .
            substr($hash,  8,  4) .
            '-' .
            substr($hash, 12,  4) .
            '-' .
            substr($hash, 16,  4) .
            '-' .
            substr($hash, 20, 12) .
            '}';
    return $guid;
}
  
?>
