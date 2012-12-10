<?php
namespace BrightSparksLabs\Adekamie;
/**
 * Utility functions class for Adekamie
 *
 * @author Marcus
 */
class Utility {
    static function createGuid($namespace = 'Adekamie') {     
        $guid = '';
        $uid = uniqid("", true);
        $data = $namespace;
        $data .= $_SERVER['REQUEST_TIME']?:'REQUEST_TIME_MISSING';
        $data .= $_SERVER['HTTP_USER_AGENT']?:'HTTP_USER_AGENT_MISSING';
        $data .= $_SERVER['SERVER_ADDR']?:'SERVER_ADDR_MISSING';
        $data .= $_SERVER['SERVER_NAME']?:'SERVER_NAME_MISSING';
        $data .= $_SERVER['REMOTE_ADDR']?:'REMOTE_ADDR_MISSING';
        $data .= $_SERVER['REMOTE_PORT']?:'REMOTE_PORT_MISSING';
        $hash = strtoupper(hash('ripemd128', $uid . $guid . md5($data)));
        $guid = substr($hash,  0,  8) . 
                '-' .
                substr($hash,  8,  4) .
                '-' .
                substr($hash, 12,  4) .
                '-' .
                substr($hash, 16,  4) .
                '-' .
                substr($hash, 20, 12) ;
        return $guid;
    }
    static function cleanFileRef($start){
        // remove any '.'
        $result1 = str_replace('.', '', $start);
        // remove any '//'
        $result = str_replace("//","",$result1);

        return $result;
    }
}

?>
