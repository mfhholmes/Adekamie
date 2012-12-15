<?php
namespace BrightSparksLabs\Adekamie;
include_once 'Edulab_Abstract_Test_Db.php';
include_once '../../../serverside/Edulab/DataModel.php';

/**
 * Description of UtilityTest
 *
 * @author Marcus
 */
class UtilityTest extends \PHPUnit_Framework_TestCase {
    
    public function testCreateGuid(){
        /* simple crash and duplication test */
        $guid1 = Utility::createGuid();
        $this->assertEquals(36, strlen($guid1));
        $guid2 = Utility::createGuid();
        $this->assertNotSame($guid1,$guid2);
    }
    public function testHashPassword(){
        /*Arrange*/
        $password = 'pword';
        /*Action*/
        $hashpassword = Utility::hashPassword($password);
        $rehash = Utility::hashPassword($password);
        /*Assert*/
        $this->assertNotNull($hashpassword,"returned hash was null!");
        $this->assertEquals($hashpassword,$rehash,"rehashed password came out different");
        $this->assertEquals(32,strlen($hashpassword),"hashed password is weird length");
    }
}

?>
