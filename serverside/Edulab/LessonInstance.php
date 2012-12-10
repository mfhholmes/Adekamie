<?php
namespace BrightSparksLabs\Adekamie;

/**
 * Handles Lesson Instances
 * which are created by teachers for pupils to do
 * each lesson instance then has a number of lesson files which are the student's actual work
 *
 * @author Marcus
 */
class LessonInstance {
    private $Id = "";
    private $TeacherId = "";
    private $LessonTemplateId = "";
    private $Available = True;
    private $IsOnDatabase = False;
    
    function __construct($Id){
        // simple 'is it on the db' check... if not it' a new one so give it an ID
        $query = "CALL edulab.spGetLessonInstance('$Id')";
        $mysqli= DataConnection::getConnection();
        $result = $mysqli->query($query);
        if($result){
            $row = $result->fetch_assoc();
            $this->IsOnDatabase = True;
            $this->TeacherId = $row['TeacherId'];
            $this->LessonTemplateId = $row['TemplateId'];
            $this->Available = $row['Available'];
        }
        else{
            $this->IsOnDatabase = False;
            $this->Id = Utility::createGuid();
            $this->Available = False;
        } 
    }
    
    function create($LessonTemplateId, $TeacherId){
        if($this->IsOnDatabase){
            // nope, create a new object instead
            return false;
        } else {
            $this->IsOnDatabase = False;
            $this->LessonTemplateId = $LessonTemplateId;
            $this->TeacherId = $TeacherId;
            $this->Available = True;
            return true;
        }
    }
    function save(){
        
    }
}

?>
