<?php
namespace BrightSparksLabs\Adekamie;
//include_once 'Edulab_Abstract_Test_Db.php';
include_once '../../../serverside/Edulab/DataModel.php';

        /*Assemble*/
        /*Action*/
        /*Assert*/

class LessonTemplateTest extends \PHPUnit_Framework_TestCase
{
    public function testCreateAndGetTemplate()
    {
        /* assemble */
        $templateName = "newTemplate";
        $guid = Utility::createGuid();
        $enabled = TRUE;
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
        $result = createNewLessonTemplate($pdo, $templateName, $guid, $enabled);
        $checkName = getLessonTemplateNameById($pdo, $guid);
        $pdo->rollBack();
        
        /* assert */
        $this->assertTrue($result,'Failed to create new Template');
        $this->assertEquals($checkName, $templateName, 'template name not returned from new template');
    }
    public function testDuplicateTemplateId()
    {
        /*Assemble*/
        $templateName = "firstTemplate";
        $templateName2 ="secondTemplate";
        $guid = Utility::createGuid();
        $enabled = TRUE;
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
        
        /*Action*/
        $pdo->beginTransaction();
        $result1 = createNewLessonTemplate($pdo, $templateName, $guid, $enabled);
        $result2 = createNewLessonTemplate($pdo, $templateName2, $guid, $enabled);        
        $checkName = getLessonTemplateNameById($pdo, $guid);
        $pdo->rollBack();
        
        /*Assert*/
        $this->assertTrue($result1,"failed to create first template");
        $this->assertFalse($result2,"failed to refuse creation of second template");
        $this->assertEquals($checkName,$templateName,"Failed to deny update template with second name, returned: $checkName");
    }

    public function testUpdateTemplate()
    {   
        /*Assemble*/
        $templateName = "firstTemplate";
        $templateName2 ="secondTemplate";
        $guid = Utility::createGuid();
        $enabled = TRUE;
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
        
        /*Action*/
        $pdo->beginTransaction();
        $result1 = createNewLessonTemplate($pdo, $templateName, $guid, $enabled);
        $check1 = getLessonTemplateNameById($pdo, $guid);
        $result2 = updateLessonTemplate($pdo, $templateName2, $guid, $enabled);        
        $checkName = getLessonTemplateNameById($pdo, $guid);
        $pdo->rollBack();

        /*Assert*/
        $this->assertTrue($result1,"failed to create first template");
        $this->assertEquals($check1,$templateName,"Failed to create original record");
        $this->assertTrue($result2,"failed to update with second template");
        $this->assertEquals($checkName,$templateName2,"Failed to update template with second name, returned: $checkName");
    }
    public function testDeleteLessonTemplate(){
        /*Assemble*/
        $templateName = "firstTemplate";
        $guid = Utility::createGuid();
        $enabled = TRUE;
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
        
        /*Action*/
        $pdo->beginTransaction();
        $result1 = createNewLessonTemplate($pdo, $templateName, $guid, $enabled);
        $check1 = getLessonTemplateNameById($pdo, $guid);
        $result2 = deleteLessonTemplate($pdo, $guid);        
        $checkName = getLessonTemplateNameById($pdo, $guid);
        $pdo->rollBack();

        /*Assert*/
        $this->assertTrue($result1,"failed to create first template");
        $this->assertEquals($check1,$templateName,"Failed to create original record");
        $this->assertTrue($result2,"failed to delete the template");
        $this->assertEquals($checkName,"","Failed to delete template from getLessonTemplateNameById result");
    }
    public function testLessonTemplateIndex(){
        /*Assemble*/
        $templates = array();
        $templates[] = ["LessonName"=>"Lesson1","TemplateId"=>Utility::createGuid(),"Enabled"=>"1"];
        $templates[] = ["LessonName"=>"Lesson2","TemplateId"=>Utility::createGuid(),"Enabled"=>"1"];
        $templates[] = ["LessonName"=>"Lesson3","TemplateId"=>Utility::createGuid(),"Enabled"=>"0"];
        $templates[] = ["LessonName"=>"Lesson4","TemplateId"=>Utility::createGuid(),"Enabled"=>"1"];
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
        
        /*Action*/
        try{
        $pdo->beginTransaction();
        $createresult=true;
        foreach($templates AS $template )
        {
            $result = createNewLessonTemplate($pdo, $template["LessonName"], $template["TemplateId"], $template["Enabled"]);
            $createresult = $createresult && $result;
        }
        
        $indexResult = getLessonTemplateIndex($pdo);
        $pdo->rollBack();
        }
        catch(Exception $err){
            $pdo->rollBack();
        }
        /*Assert*/
        $this->assertTrue($createresult,"CreateNewLessonTemplateFile failed for a lesson");
        $this->assertEquals(3,count($indexResult),"Returned wrong number of results");
        $this->assertEquals($templates[0],$indexResult[0],"First template wrong");
        $this->assertEquals($templates[1],$indexResult[1],"Second template wrong");
        $this->assertEquals($templates[3],$indexResult[2],"Third or Fourth template wrong");
    }
    public function testReallyBigTemplateName(){
        /* assemble */
        $templateName = "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
        $truncatedName = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
        $templateId = Utility::createGuid();
        $enabled = TRUE;
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
            $result = createNewLessonTemplate($pdo, $templateName, $templateId, $enabled);
            $checkName = getLessonTemplateNameById($pdo, $templateId);
        $pdo->rollBack();
        
        /* assert */
        $this->assertTrue($result,'Failed to create template with really big name');
        $this->assertNotEquals($templateName,$checkName,"really big name added to template table without truncating");
        $this->assertEquals($truncatedName,$checkName,"really big name not truncated as expected");
    }
}   

?>
