<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  
  session_start();
  if (is_ajax()) 
  {
    post_data($_POST);  
  }

  function post_data($datos)
  {
    $id_evento = $datos['id_evento'];
    $time_request = $datos['time_request'];
    
    $res = array();
    
    $sql = "SELECT im.id_imagen, im.path, im.id_evento, im.comentario, im.id_profile, im.nombre_profile, im.foto_profile_url, ev.nombre_evento, im.delete_date FROM eventos ev INNER JOIN imagenes im ON ev.id_evento = im.id_evento WHERE im.id_evento = '".$id_evento."' AND im.delete_date IS NOT NULL AND im.delete_date < '".$time_request."' ";
    
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