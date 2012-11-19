<?php

function cleanFileRef($start){
    // remove any '.'
    $result = str_replace('.', '', $start);
    // remove any '//'
    $result = str_replace("//","",$result);
    
    return $result;
}
?>
