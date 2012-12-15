<?php
namespace BrightSparksLabs\Adekamie;

/**
 * Refactor of LessonTemplate to functional style
 * 
 * @author Marcus Holmes
 * @copyright Bright Sparks Labs
 */
function createNewLessonTemplate($pdo, $templateName, $guid, $enabled){
    $query = "CALL spCreateNewLessonTemplate('$guid','$templateName',$enabled)";
    try{
        $rowsAffected = $pdo->exec($query);
    }
    catch(Exception $e)
    {
        //TODO: log the error
        return false;
    }
    return ($rowsAffected == 1);
}
function getLessonTemplateNameById($pdo, $guid){
    $query = "CALL spGetLessonTemplateNameById('$guid')";
    try
    {
        $result = $pdo->query($query);
        if($result){
            $row = $result->fetch(\PDO::FETCH_ASSOC);
            return $row['LessonName'];
        }
        else{
            return 'nothing returned';
        }
    }
    catch(Exception $e){
        return 'exception: '.$e->getMessage();
    }
}

function updateLessonTemplate($pdo, $templateName, $guid, $enabled){
    $query = "CALL spUpdateLessonTemplate('$guid','$templateName',$enabled)";
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
function deleteLessonTemplate($pdo,$guid){
    $query = "CALL spDeleteLessonTemplate('$guid')";
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

function getLessonTemplateIndex($pdo){
    $query = "CALL spGetTemplates()";
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