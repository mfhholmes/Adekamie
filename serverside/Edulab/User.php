<?php
namespace BrightSparksLabs\Adekamie;

/**
 * Handles user CRUD and functions
 *
 * @author Marcus
 */
function createNewUser($pdo,$userId,$userName,$enabled){
    $query = "CALL spCreateNewUser('$userId','$userName',$enabled)";
    try{
        $rowsAffected = $pdo->exec($query);
    }
    catch(Exception $e)
    {
        return $e->getMessage();
    }
    return ($rowsAffected==1) ;
}
function getUserById($pdo,$userId){
    $query = "CALL spGetUserById('$userId')";
    try
    {
        $result = $pdo->query($query);
        if($result){
            return $result->fetch(\PDO::FETCH_ASSOC);
        }
        else{
            return false;
        }
    }
    catch(Exception $e){
        return 'exception: '.$e->getMessage();
    }
}
function getUserByName($pdo,$userName){
    $query = "CALL spGetUserByName('$userName')";
    try
    {
        $result = $pdo->query($query);
        if($result){
            return $result->fetch(\PDO::FETCH_ASSOC);
        }
        else{
            return null;
        }
    }
    catch(Exception $e){
        return 'exception: '.$e->getMessage();
    }    
}
function updateUser($pdo,$userId,$userName,$enabled){
    $query = "CALL spUpdateUser('$userId','$userName',$enabled)";
    try{
        $rowsAffected = $pdo->exec($query);
    }
    catch(Exception $e)
    {
        return $e->getMessage();
    }
    return ($rowsAffected==1);    
}
function deleteUser($pdo,$userId){
    $query = "CALL spDeleteUser('$userId')";
    try{
        $rowsAffected = $pdo->exec($query);
    }
    catch(Exception $e)
    {
        return $e->getMessage();
    }
    return ($rowsAffected==1);        
}
function getUserIndex($pdo){
    $query = "CALL spGetUsers()";
    try
    {
        $result = $pdo->query($query);
        if($result){
            return $result->fetchAll(\PDO::FETCH_ASSOC);
        }
        else{
            return false;
        }
    }
    catch(Exception $e){
        return 'exception: '.$e->getMessage();
    }
}

?>