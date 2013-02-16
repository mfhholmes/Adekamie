<?php
namespace BrightSparksLabs\Adekamie;
//include_once 'Edulab_Abstract_Test_Db.php';
include_once '../../../serverside/Edulab/DataModel.php';

        /*Assemble*/
        /*Action*/
        /*Assert*/
class AuthenticationTest extends \PHPUnit_Framework_TestCase
{
    public function testCreateNewAuthentication(){
        /* assemble */
        $authId = Utility::createGuid();
        $userId = Utility::createGuid();
        $typeId = Utility::createGuid();
        $typeName = "password";
        $userName = "testUser";
        $enabled = 1;
        $value = "testValue";
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
            $userResult = createNewUser($pdo,$userId,$userName,$enabled);
            $typeResult = createNewAuthenticationType($pdo,$typeId, $typeName);
            $result = createNewAuth($pdo, $authId, $userId, $typeId, $value);
        $pdo->rollBack();
        
        /* assert */
        $this->assertEquals(1,$result,'Failed to create new Authentication');
    }
    public function testCreateNewAuthenticationType(){
        /* assemble */
        $typeId = Utility::createGuid();
        $typeName = "password";
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
            $typeResult = createNewAuthenticationType($pdo,$typeId, $typeName);
        $pdo->rollBack();
        
        /* assert */
        $this->assertTrue($typeResult,'Failed to create new AuthenticationType');        
    }
    public function testGetAuthByTypeAndUser(){
        /* assemble */
        $authId = Utility::createGuid();
        $userId = Utility::createGuid();
        $typeId = Utility::createGuid();
        $typeName = "password";
        $userName = "testUser";
        $enabled = 1;
        $value = "testValue";
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
        try{
            $userResult = createNewUser($pdo,$userId,$userName,$enabled);
            $typeResult = createNewAuthenticationType($pdo,$typeId, $typeName);
            $authResult = createNewAuth($pdo, $authId, $userId, $typeId, $value);
            $getResult = getAuthValueByUserAndType($pdo,$userName,$typeName);
            
        }
        catch(Exception $err){
            debug($err->message);
        }
        $pdo->rollBack();

        
        /* assert */
        $this->assertEquals($value,$getResult["Value"],'Failed to get the correct Authentication');
    }
    public function testAddPasswordToUser(){
        /* assemble */
        $authId = Utility::createGuid();
        $userId = Utility::createGuid();
        $typeId = Utility::createGuid();
        $userName = "testUser";
        $enabled = 1;
        $password = "testValue";
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
        try{
            $userResult = createNewUser($pdo,$userId,$userName,$enabled);
            $actionResult = addPasswordToUser($pdo, $userName,$password);
            $authTypeId = getAuthenticationTypeByName($pdo, 'password');
            $checkResult = checkPasswordForUser($pdo, $userName, $password);
            $failResult = checkPasswordForUser($pdo, $userName, "FailPassword");
        }
        catch(Exception $err){
            debug($err->message);
        }
        $pdo->rollBack();
        
        /* assert */
        $this->assertNotEmpty($authTypeId,"Failed to get the AuthenticationType. AddPassword returned $actionResult");
        $this->assertTrue($userResult,"Failed to create new user");
        $this->assertTrue($actionResult,'Failed to add a password to the user');
        $this->assertTrue($checkResult,'Failed to authenticate correct password');
        $this->assertFalse($failResult, 'Failed to stop bad password');
    }
    public function testGetAuthenticationTypeByName(){
        
        /*Assemble*/        
        $typeId = Utility::createGuid();
        $password = 'password';
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
        
        /*Action*/
        $pdo->beginTransaction();
        try{
            $result = createNewAuthenticationType($pdo, $typeId, $password);
            $result1 = getAuthenticationTypeByName($pdo, $password);
            $result2 = getAuthenticationTypeByName($pdo, 'notpassword');
        }
        catch(Exception $err){
            debug($err->message);
        }
        $pdo->rollBack();
        /*Assert*/
        $this->assertTrue($result,"Failed to create new authentication type");
        $this->assertEquals($typeId,$result1,'failed to return the correct type id for password');
        $this->assertNull($result2,"failed to return null from bad authentication type search");
    }
    
    public function testLogIn(){
        /*Assemble*/
        
        
        /*Action*/
        
        /*Assert*/
    }
}

?>
