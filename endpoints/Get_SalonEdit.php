<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  //Verifica si llegan datos por ajax
  
  session_start();
  if (is_ajax()) 
  {
     post_data($_POST);  
  }

  function post_data($datos)
  {
    $id_salon = $datos['id_salon'];
    $res = array();
    
    $sql = " SELECT sal.id_salon, sal.nombre_salon, sal.domicilio_salon, sal.telefono_salon, us.nombre_usuario, sal.id_usuario, us.telefono_usuario, us.celular_usuario, us.domicilio_usuario, us.cuil_usuario, us.email FROM usuarios us INNER JOIN salones sal ON us.id_usuario = sal.id_usuario WHERE sal.id_salon = '".$id_salon."'";
        
    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);  
    echo json_encode($info_devuelta);   
  }
 
  function is_ajax()
  {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
  }

?>