<?php
namespace BrightSparksLabs\Adekamie;

/**
 * Handles Authentications
 *
 * @author Marcus Holmes
 * @copyright Bright Sparks Labs 2012
 */

function createNewAuth($pdo, $authId, $userId, $typeId, $value){
    $query = "CALL spCreateNewAuthentication('$authId','$userId','$typeId','$value')";
    try{
        $rowsAffected = $pdo->exec($query);
    }
    catch(Exception $e)
    {
        return $e->getMessage();
    }
    return ($rowsAffected==1) ;
}
function createNewAuthenticationType($pdo,$typeId,$typeName){
    $query = "CALL spCreateNewAuthenticationType('$typeId','$typeName')";
    try{
        $rowsAffected = $pdo->exec($query);
    }
    catch(Exception $e)
    {
        return $e->getMessage();
    }
    return ($rowsAffected==1) ;    
}
function getAuthValueByUserAndType($pdo,$userName,$typeName){
    $query = "CALL spGetAuthByUserAndType('$userName','$typeName')";
    try{
        $result = $pdo->query($query);
        if($result){
            return $result->fetch(\PDO::FETCH_ASSOC);
        }
        else{
            return false;
        }
    }
    catch(Exception $e)
    {
        return $e->getMessage();
    }
    return ($rowsAffected==1) ;        
}
function addPasswordToUser($pdo, $userName,$password){
    $hash = Utility::hashPassword($password);
    
    $passwordType = 'password';
    $typeId = getAuthenticationTypeByName($pdo,$passwordType);
    if($typeId == NULL)
    {
        $typeId = Utility::createGuid();
        if(!createNewAuthenticationType($pdo, $typeId, $passwordType))
                return 'unable to create password authentication type';
    }    
    
    $user = getUserByName($pdo, $userName);
    if($user == NULL)
        return 'user not found';
    else
        $userId = $user['UserId'];
    
    $authId = Utility::createGuid();
    $query = "CALL spAddAuthenticationToUser('$authId','$userId','$typeId','$hash' )";
    try{
        $rowsAffected = $pdo->exec($query);
    }
    catch(Exception $e)
    {
        return $e->getMessage();
    }
    return ($rowsAffected ==1) ;        
}
function checkPasswordForUser($pdo, $userName, $password){
    $hash = Utility::hashPassword($password);
}

function getAuthenticationTypeByName($pdo, $typeName){
    $typeQuery = "spGetAuthTypeByName('$typeName')";
    $result = $pdo->query($typeQuery);
    if($result)
        if($row = $result->fetch(\PDO::FETCH_ASSOC))
            return $row["TypeId"];
    return null;
}
?>
