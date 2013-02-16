<?php
namespace BrightSparksLabs\Adekamie;
//include_once 'Edulab_Abstract_Test_Db.php';
include_once '../../../serverside/Edulab/DataModel.php';

        /*Assemble*/
        /*Action*/
        /*Assert*/

class UserTest extends \PHPUnit_Framework_TestCase
{
    public function testCreateAndGetUser(){
        /* assemble */
        $userName = "newUser";
        $userId = Utility::createGuid();
        $enabled = TRUE;
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
            $result = createNewUser($pdo, $userId, $userName, $enabled);
            $checkName = getUserById($pdo, $userId);
            $checkId = getUserByName($pdo,$userName);
        $pdo->rollBack();
        
        /* assert */
        $this->assertEquals(1,$result,"Failed to create new User: $result");
        $this->assertEquals($checkName["UserName"], $userName, 'user name not returned from new user id check');
        $this->assertEquals($checkId["UserId"], $userId, 'user Id not returned from new user name check');
    }
    public function testForSQLInjection(){
        /* assemble */
        $userName = "test";
        $userId = Utility::createGuid();
        $enabled = 1;
        $injectionAttack = "$userName');DELETE * FROM USERS;CALL spGetUserByName('$userName";
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
        
        /* Action*/
        $pdo->beginTransaction();
            $result = createNewUser($pdo, $userId, $userName, $enabled);
            $checkName = getUserById($pdo, $userId);
            $checkInject = getUserById($pdo,$injectionAttack);
            $checkName2 = getUserById($pdo, $userId);
        $pdo->rollBack();

        /* Assert */
        $this->assertEquals(1,$result, "Failed to create user ");
        $this->assertEquals($checkName["UserName"],$userName,"Failed to retrieve user from creation");
        //$this->assertTrue($checkInject,"Injection attack returned false - probably succeeded");
        $this->assertEquals($checkName2["UserName"], $userName,"Injection attack succeeded in deleting user");
    }
    public function testDuplicateUser(){
        /* assemble */
        $userName = "newUser";
        $userName2 = "newUser2";
        $userId = Utility::createGuid();
        $userId2 = Utility::createGuid();
        $enabled = TRUE;
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
            $result = createNewUser($pdo, $userId, $userName, $enabled);
            $checkName = getUserById($pdo, $userId);
            $resultDuplicateId = createNewUser($pdo,$userId,$userName2,$enabled);
            $checkDuplicateId = getUserById($pdo,$userId);
            $resultDuplicateName = createNewUser($pdo,$userId2,$userName,$enabled);
            $checkDuplicateName = getUserByName($pdo,$userName);
        $pdo->rollBack();
        
        /* assert */
        $this->assertEquals(1,$result,'Failed to create new User');
        $this->assertEquals($checkName["UserName"], $userName, 'failed to retrieve user');
        $this->assertEquals(0,$resultDuplicateId,"CreateNewUser with duplicate id succeeded");
        $this->assertEquals($userName,$checkDuplicateId["UserName"],"duplicate id changed the user name");
        $this->assertEquals(0,$resultDuplicateName,"CreateNewUser with duplicate name succeeded");
        $this->assertEquals($userId,$checkDuplicateName["UserId"],"duplicate name changed the user id");
    }
    public function testUpdateUser(){
        /* assemble */
        $userName = "newUser";
        $userName2 = "updatedUser";
        $userId = Utility::createGuid();
        $enabled = TRUE;
        $enabled2 = FALSE;
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
            $result = createNewUser($pdo, $userId, $userName, $enabled);
            $checkName = getUserById($pdo, $userId);
            $checkId = getUserByName($pdo,$userName);
            $result2 = updateUser($pdo,$userId, $userName2, $enabled);
            $checkName2 = getUserById($pdo,$userId);
            $result3 = updateUser($pdo,$userId,$userName2,$enabled2);
            $checkName3 = getUserByName($pdo,$userName);
        $pdo->rollBack();
        
        /* assert */
        $this->assertEquals(1,$result,'Failed to create new User');
        $this->assertEquals($checkName["UserName"], $userName, 'user name not returned from new user id check');
        $this->assertEquals($checkId["UserId"], $userId, 'user Id not returned from new user name check');                
    }
    public function testReallyBigName(){
        /* assemble */
        $userName = "123456789012345678901234567890123456789012345678901234567890";
        $truncatedName = "12345678901234567890123456789012345678901234567890";
        $userId = Utility::createGuid();
        $enabled = TRUE;
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
            $result = createNewUser($pdo, $userId, $userName, $enabled);
            $checkName = getUserById($pdo, $userId);
        $pdo->rollBack();
        
        /* assert */
        $this->assertEquals(1,$result,'Failed to create new User');
        $this->assertNotEquals($checkName["UserName"], $userName, 'user name returned untruncated from really big name check');
        $this->assertEquals($checkName["UserName"], $truncatedName, 'really big user name not truncated as expected');
    }
    public function testDeleteUser(){
        /* assemble */
        $userName = "newUser";
        $userId = Utility::createGuid();
        $enabled = TRUE;
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
            $result = createNewUser($pdo, $userId, $userName, $enabled);
            $checkName = getUserById($pdo, $userId);
            $result2 = deleteUser($pdo,$userId);
            $checkName2 = getUserById($pdo, $userId);
        $pdo->rollBack();
        
        /* assert */
        $this->assertEquals(1,$result,'Failed to create new User');
        $this->assertEquals($checkName["UserName"], $userName, 'user name not returned from delete user id check');
        $this->assertEquals(1,$result2,'Failed to delete User');
        $this->assertFalse( $checkName2, 'delete user failed to actually delete the user');        
    }
    public function testUserIndex(){
        /*Assemble*/
        $users = array();
        $users[] = ["UserId"=>Utility::createGuid(),"UserName"=>"User1","Enabled"=>"1"];
        $users[] = ["UserId"=>Utility::createGuid(),"UserName"=>"User2","Enabled"=>"1"];
        $users[] = ["UserId"=>Utility::createGuid(),"UserName"=>"User3","Enabled"=>"0"];
        $users[] = ["UserId"=>Utility::createGuid(),"UserName"=>"User4","Enabled"=>"1"];
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
        
        /*Action*/
        $pdo->beginTransaction();
        foreach($users AS $user )
        {
            $result = createNewUser($pdo, $user["UserId"], $user["UserName"], $user["Enabled"]);
            $this->assertTrue($result,"CreateNewUser failed for user:". $user["UserName"].":".$user["UserId"].":".$user["Enabled"]);
        }
        
        $indexResult = getUserIndex($pdo);
        $pdo->rollBack();

        /*Assert*/
        $this->assertEquals(3,count($indexResult),"Returned wrong number of results");
        $this->assertEquals($users[0],$indexResult[0],"First user wrong");
        $this->assertEquals($users[1],$indexResult[1],"Second user wrong");
        $this->assertEquals($users[3],$indexResult[2],"Third or Fourth user wrong");
    }
}
?>
