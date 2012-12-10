<?php
namespace BrightSparksLabs\Adekamie;

/**
 * Handles user CRUD and functions
 *
 * @author Marcus
 */
class User {
    private $Name = "";
    private $ID = "";
    private $Enabled = "";
    
    function __construct($name = "", $id =""){
        $mysqli = DataConnection::getConnection();
        $safeName = $mysqli->escape_string($name);
        $safeId = $mysqli->escape_string($id);
        //have they specified an ID?
        if($id != ""){
            // yes -> does it exist on the db?
            $query = "CALL edulab.spGetUserById('$safeId')";
            $result = $mysqli->query($query);
            if($result){
                // yes -> populate
                
            } else {
                // no -> no such user, keep it blank
                return;
            }
        }
        else {
            // no -> have they specified a name?
            if($name != ""){
                // yes -> does it exist on the db?
                $query = "CALL edulab.spGetUserByName('$safeName')";
                $result = $mysqli->query($query);
                if($result){
                    // yes -> populate
                    $row = $result->fetch_assoc();
                    $this->Id = $row["UserId"];
                    $this->Name = $row["UserName"];
                    $this->Enabled = $row["Enabled"];
                } else {
                    // no -> new User with this name
                    $this->Id = Utility::createGuid();
                    $this->Name = $name;
                }
            } else {
                //no -> new blank user
                $this->ID = Utility::createGuid();
            }
        }
    }
    
    function save(){
        
    }
    function checkUserAuthorisationForUser($thisUser, $targetUser){
        //TODO: check what rights the logged-in user has for the property of the target user
        return true;
    }

    function getLessonFilesByUser($lessonName, $user){
        //TODO: get the file history from the database
        $query = "SELECT * FROM LessonFiles WHERE UserName = '$user' ORDER BY FileDate";

    }

}

?>
