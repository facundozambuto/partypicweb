<?php

   $res = array();
   $sql = "SELECT * FROM usuarios WHERE usuarios.rol ='encargado_salon' AND usuarios.activo = 1" ;
    
    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 
   			
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $res['sql'] = $sql;
    
    echo json_encode($info_devuelta);  

?>