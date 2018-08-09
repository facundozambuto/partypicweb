<?php

    $res = array();
    session_start();
    $id_usuario = $_SESSION['id_usuario'];
    $sql = "SELECT * FROM salones WHERE id_usuario = '".$id_usuario."'" ;
    
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