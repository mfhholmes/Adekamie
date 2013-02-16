<?php
namespace BrightSparksLabs\Adekamie;
//include_once 'Edulab_Abstract_Test_Db.php';
include_once '../../../serverside/Edulab/DataModel.php';

        /*Assemble*/
        /*Action*/
        /*Assert*/

class LessonTemplateFilesTest extends \PHPUnit_Framework_TestCase {
    
    public function testCreateLessonTemplateFile(){
        /* assemble */
        $templateId =Utility::createGuid();
        $fileId = Utility::createGuid();
        $version = 1;
        $filename ="file1.json";
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
        $result = createNewLessonTemplateFile($pdo, $fileId,$templateId,$version,$filename);
        $check = getLessonTemplateFileNameById($pdo, $fileId);
        $pdo->rollBack();
        
        /* assert */
        $this->assertEquals(1,$result,'Failed to create new Template File');
        $this->assertEquals( $filename, $check, 'template filename not returned from new template file');
    }
    public function testNewFileVersion(){
        /* assemble */
        $templateId =Utility::createGuid();
        $fileId1 = Utility::createGuid();
        $fileId2 = Utility::createGuid();
        $version1 = 1;
        $filename1 ="file1.json";
        $version2 = 2;
        $version3 = 3;
        $filename2 ="file2.json";
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
            $result1 = createNewLessonTemplateFile($pdo, $fileId1,$templateId,$version1,$filename1);
            $check1 = getLessonTemplateFileNameById($pdo, $fileId1);
            // new file but same version number
            $result2 = createNewLessonTemplateFile($pdo, $fileId2,$templateId,$version1,$filename2);
            $check2 = getLessonTemplateFileNameById($pdo, $fileId2);
            // new version correctly
            $result3 = createNewLessonTemplateFile($pdo, $fileId2,$templateId,$version2,$filename2);
            $check3 = getLessonTemplateFileNameById($pdo, $fileId2);
            // duplicate of existing file
            $result4 = createNewLessonTemplateFile($pdo, $fileId2,$templateId,$version2,$filename2);
            // test just fileId duplicated
            $result5 = createNewLessonTemplateFile($pdo, $fileId1,$templateId,$version3,$filename2);
        $pdo->rollBack();
        
        /* assert */
        $this->assertEquals(1,$result1,'Failed to create new Template File');
        $this->assertEquals( $filename1, $check1, 'template filename not returned from new template 1 file');
        $this->assertEquals(False,$result2,'Failed to block creation of incorrectly versioned Template File');
        $this->assertEquals('', $check2, 'template filename adjusted for bad version');
        $this->assertEquals(1,$result3,'Failed to create new Template File');
        $this->assertEquals( $filename2, $check3, 'template filename not returned from new template 3 file');
        $this->assertEquals(0,$result4,'Failed to block creation of duplicate Template File');
        $this->assertEquals(0,$result5,'Failed to block creation of duplicate Template FileId');
    }
    public function testUpdateLessonTemplateFile(){
        /*Assemble*/
        $templateId =Utility::createGuid();
        $fileId1 = Utility::createGuid();
        $fileId2 = Utility::createGuid();
        $version1 = 1;
        $filename1 ="file1.json";
        $version2 = 2;
        $filename2 ="file2.json";
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
        
        /*Action*/
        $pdo->beginTransaction();
            $result1 = createNewLessonTemplateFile($pdo, $fileId1,$templateId,$version1,$filename1);
            $check1 = getLessonTemplateFileNameById($pdo, $fileId1);
            $result2 = updateLessonTemplateFile($pdo,$fileId1, $templateId, $version2, $filename2);        
            $check2 = getLessonTemplateFileNameById($pdo, $fileId1);
            $result3 = updateLessonTemplateFile($pdo,$fileId2, $templateId, $version2, $filename2);        
            $check3 = getLessonTemplateFileNameById($pdo, $fileId2);
            $check4 = getLessonTemplateFileNameById($pdo,$fileId1);
        $pdo->rollBack();

        /*Assert*/
        $this->assertEquals(1,$result1,'Failed to create new Template File');
        $this->assertEquals( $filename1, $check1, 'template filename not returned from new template 1 file');
        $this->assertEquals(0,$result2,'Failed to block creation of duplicate Template File Id');
        $this->assertEquals( $filename1, $check2, 'failing to inser duplicate file ID should leave original intact');
        $this->assertEquals(0,$result3,'Failed to block updating a missing file ');
        $this->assertEquals('', $check3, 'template filename updated and returned after failed update');
        $this->assertEquals($filename1,$check4, 'original filename not returned after failed update');
    }
    public function testDeleteLessonTemplate(){
        /* assemble */
        $templateId =Utility::createGuid();
        $fileId = Utility::createGuid();
        $version = 1;
        $filename ="file1.json";
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
         
        /* action */
        $pdo->beginTransaction();
        $result = createNewLessonTemplateFile($pdo, $fileId,$templateId,$version,$filename);
        $check = getLessonTemplateFileNameById($pdo, $fileId);
        $delete = deleteNewLessonTemplateFile($pdo,$fileId);
        $check2 = getLessonTemplateFileNameById($pdo, $fileId);
        $pdo->rollBack();
        
        /* assert */
        $this->assertEquals(1,$result,'Failed to create new Template File');
        $this->assertEquals( $filename, $check, 'template filename not returned from new template file');
        $this->assertEquals(1,$delete,'Failed to delete new Template File');
        $this->assertEquals( '', $check2, 'template filename not deleted from the table results');        
    }
    
    public function testGetFilesForTemplate(){
        /*Assemble*/
        $templateId1 = Utility::createGuid();
        $templateId2 = Utility::createGuid();
        $templateFiles = array();
        $item = ["TemplateFileId"=>Utility::createGuid(),"TemplateId"=>$templateId1,"Version"=>"1","FileName"=>"test1.json"];
        $templateFiles[] = $item;
        $templateFiles[] = ["TemplateFileId"=>Utility::createGuid(),"TemplateId"=>$templateId1,"Version"=>"2","FileName"=>"test2.json"];
        $templateFiles[] = ["TemplateFileId"=>Utility::createGuid(),"TemplateId"=>$templateId2,"Version"=>"3","FileName"=>"test3.json"];
        $templateFiles[] = ["TemplateFileId"=>Utility::createGuid(),"TemplateId"=>$templateId1,"Version"=>"4","FileName"=>"test4.json"];
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
        
        /*Action*/
        try{
            $pdo->beginTransaction();
            $createresult = true;
            foreach($templateFiles AS $templateFile )
            {
                $result = createNewLessonTemplateFile($pdo, $templateFile["TemplateFileId"],$templateFile["TemplateId"], $templateFile["Version"],$templateFile["FileName"]);
                $createresult = $createresult && $result;
            }

            $indexResult = getTemplateFilesForTemplate($pdo,$templateId1);
            $pdo->rollBack();
        }
        catch(Exception $err){
            $pdo->rollBack();
            throw $err;
        }
        /*Assert*/
        $this->assertTrue($createresult,"CreateNewLessonTemplateFile failed for a lesson");
        $this->assertEquals(3,count($indexResult),"Returned wrong number of results");
        $this->assertEquals($templateFiles[0],$indexResult[0],"First template wrong");
        $this->assertEquals($templateFiles[1],$indexResult[1],"Second template wrong");
        $this->assertEquals($templateFiles[3],$indexResult[2],"Third or Fourth template wrong");
    }
    public function testGetLatestFileForTemplate(){
        /*Assemble*/
        $templateId1 = Utility::createGuid();
        $templateId2 = Utility::createGuid();
        $templateFiles = array();
        $templateFiles[] = ["TemplateFileId"=>Utility::createGuid(),"TemplateId"=>$templateId1,"Version"=>"1","FileName"=>"test1.json"];
        $templateFiles[] = ["TemplateFileId"=>Utility::createGuid(),"TemplateId"=>$templateId1,"Version"=>"2","FileName"=>"test2.json"];
        $templateFiles[] = ["TemplateFileId"=>Utility::createGuid(),"TemplateId"=>$templateId2,"Version"=>"3","FileName"=>"test3.json"];
        $templateFiles[] = ["TemplateFileId"=>Utility::createGuid(),"TemplateId"=>$templateId1,"Version"=>"4","FileName"=>"test4.json"];
        $pdo = getConnection($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD'],$GLOBALS['DB_OPTIONS']);
        $this->assertNotNull($pdo,'database connection failed');
        
        /*Action*/
        try{
        $pdo->beginTransaction();
            $createresult = true;
            foreach($templateFiles AS $templateFile )
            {
                $result = createNewLessonTemplateFile($pdo, $templateFile["TemplateFileId"],$templateFile["TemplateId"], $templateFile["Version"],$templateFile["FileName"]);
                $createresult = $createresult && $result;
            }

            $result1 = getLatestFileForTemplate($pdo,$templateId1);
            $result2 = getLatestFileForTemplate($pdo,$templateId2);
            $result3 = getLatestFileForTemplate($pdo,Utility::createGuid());
        $pdo->rollBack();
        }
        catch(Exception $err){
            $pdo->rollBack();
            throw $err;
        }
        /*Assert*/
        $this->assertTrue($createresult,"CreateNewLessonTemplateFile failed for a lesson");
        $this->assertEquals($templateFiles[3],$result1,"First template file wrong");
        $this->assertEquals($templateFiles[2],$result2,"Second template file wrong");
        $this->assertFalse($result3,"Empty case template wrong");
    }
}

?>
