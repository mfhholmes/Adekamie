<?php
namespace BrightSparksLabs\Adekamie;

/**
 * LessonTemplate object to handle Lesson Templates
 *
 * @author Marcus
 */
class LessonTemplate {
    private $Id = "";
    private $Name = "";
    private $Enabled = True;
    private $IsOnDatabaseAlready = False;
    
    static function index($onlyEnabled = TRUE){
        $mysqli = DataConnection::getConnection();
        $query = "";
        if($onlyEnabled)
            $query = "Select * from LessonTemplates Where Enabled = True";
        else
            $query = "Select * from LessonTemplates";
        $result = $mysqli->query($query);
        $answer = array();
        while(($row = $result->fetch_assoc())!=NULL){
            $answer[] = $row;
        }
        return $answer;
    }
    function __construct($name){
        // check if there's already a lessonTemplate with this name
        $mysqli = DataConnection::getConnection();
        $safeName = $mysqli->escape_string($name);
        $result = $mysqli->query("CALL edulab.spGetTemplatesByName('{$safeName}')");
        if($result){
            $row = $result->fetch_assoc();
            $this->Id = $row['TemplateId'];
            $this->Enabled = $row['Enabled'];
            $this->IsOnDatabaseAlready = True;
        }
        else{
            // if not, it's a new template, so create an ID for it
            $this->Id = Utility::CreateGuid();
            $this->Name = $name;
            $this->Enabled = true;
            $this->IsOnDatabaseAlready = False;
        }
    }
    function save(){
        // save the data to the database
        $mysqli = DataConnection::getConnection();
        $safeName = $mysqli->escape_string($this->Name);
        $safeId = $mysqli->escape_string($this->Id);
        $query = "CALL edulab.spReplaceLessonTemplate('$safeId','$safeName',{$this->Enabled})";
        $result = $mysqli->query($query);
        if($result)
            $this->IsOnDatabaseAlready = True;
        else{
            $this->IsOnDatabaseAlready = False;
            error_log("Query Failed: ".$query." error: ".$mysqli->error);
        }
        return $this->IsOnDatabaseAlready;
    }
    
    function getVersionFiles(){
        $mysqli = DataConnection::getConnection();
        $ID = $this->Id;
        $result = $mysqli->query("CALL edulab.spGetTemplateFilesByTemplateId('{$ID}')");
        $answer = array();
        while($row = $result->fetch_assoc()){
            array_push($answer,$row);
        }
        return $answer;
    }
    
    function getLatestVersionFilename(){
        $mysqli = DataConnection::getConnection();
        $ID = $this->Id;
        $result = $mysqli->query("CALL edulab.spGetLatestTemplateFileById('{$ID}')");
        if($row = $result->fetch_assoc()){
            return $row['Filename'];
        }
        else
        {
            return false;
        }
    }
    function getID(){
        return $this->Id;
    }
    function getName(){
        return $this->Name;
    }
    function getEnabled(){
        return $this->Enabled;
    }
    function setEnabled($value){
        return ($this->Enabled = $value);
    }
    function isOnDatabase(){
        return $this->IsOnDatabaseAlready;
    }
    function ToArray(){
        $result = array();
        $result["Id"] = $this->Id;
        $result["Name"] = $this->Name;
        $result["Enabled"] = $this->Enabled;
        $result["IsOnDatabase"]=$this->IsOnDatabaseAlready;
        return $result;
    }
}

?>
