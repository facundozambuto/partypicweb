<?php
  //ini_set('display_errors', 1);
  //ini_set('display_startup_errors', 1);
  session_start();
  if (is_ajax()) 
  {
     post_data($_POST);  
  }

  function post_data($datos)
  {
    $id_usuario = $datos['id_usuario'];
    $res = array();
    
    $sql = "SELECT us.id_usuario, us.nombre_usuario, us.rol, us.activo, us.fecha_alta, us.email, us.contrasenia, us.telefono_usuario, us.domicilio_usuario, us.celular_usuario, us.cuil_usuario FROM usuarios us WHERE id_usuario = '".$id_usuario."'";
        
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