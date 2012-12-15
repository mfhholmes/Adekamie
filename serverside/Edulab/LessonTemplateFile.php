<?php
namespace BrightSparksLabs\Adekamie;

/**
 * Lesson Template Files: where the templates are actually stored as json files
 * 
 * @author Marcus Holmes
 * @copyright Bright Sparks Labs
 */
function createNewLessonTemplateFile($pdo, $fileId,$templateId,$version,$filename){
    $query = "CALL spCreateNewLessonTemplateFile('$fileId','$templateId',$version,'$filename')";
    try{
        $rowsAffected = $pdo->exec($query);
    }
    catch(Exception $e)
    {
        //TODO: log the error
        return $e->getMessage();
    }
    return ($rowsAffected==1) ;
}
function getLessonTemplateFileNameById($pdo, $fileId){
    $query = "CALL spGetLessonTemplateFileNameById('$fileId')";
    try
    {
        $result = $pdo->query($query);
        if($result){
            $row = $result->fetch(\PDO::FETCH_ASSOC);
            return $row['FileName'];
        }
        else{
            return '';
        }
    }
    catch(Exception $e){
        return 'exception: '.$e->getMessage();
    }
}
function updateLessonTemplateFile($pdo,$fileId, $templateId, $version, $filename){
    $query = "CALL spUpdateLessonTemplateFile('$fileId','$templateId',$version, $filename)";
    try{
        $rowsAffected = $pdo->exec($query);
    }
    catch(Exception $e)
    {
        //TODO: log the error
        return false;
    }
    return ($rowsAffected==1);
}
function deleteNewLessonTemplateFile($pdo,$fileId){
    $query = "CALL spDeleteLessonTemplateFile('$fileId')";
    try{
        $rowsAffected = $pdo->exec($query);
    }
    catch(Exception $e)
    {
        //TODO: log the error
        return $e->getMessage();
    }
    return ($rowsAffected==1) ;
}
function getTemplateFilesForTemplate($pdo,$templateId)
{
    $query = "CALL spGetTemplateFilesForTemplate('$templateId')";
    try
    {
        $result = $pdo->query($query);
        if($result){
            return $result->fetchAll(\PDO::FETCH_ASSOC);
        }
        else{
            return '';
        }
    }
    catch(Exception $e){
        return 'exception: '.$e->getMessage();
    }   

}
function getLatestFileForTemplate($pdo,$templateId){
    $query = "CALL spGetLatestFileForTemplate('$templateId')";
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
?>
