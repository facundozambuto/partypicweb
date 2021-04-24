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
    $first_time = $datos['first_time'];
    
    $res = array();
    
    if($first_time == 'test') {
    	$resp = new stdClass();  
    	$resp->id_imagen = 36;
    	$resp->path = "\/home\/josefinaacevedo\/public_html\/imagenes_eventos\/25\/36.jpg";
    	$resp->id_evento = 25;
    	$resp->comentario = "hdkdkdkslsl";
    	$resp->id_profile = 117667943089003512131;
    	$resp->nombre_profile = "Facundo Zambuto";
    	$resp->foto_profile_url = "https:\/\/lh6.googleusercontent.com\/-WvN3abeY83A\/AAAAAAAAAAI\/AAAAAAAAC5g\/1YYO3yxx6pY\/photo.jpg";
    	$resp->nombre_evento = "Cumple de Flor";
    	$resp->delete_date = null;
    	
    	$json = json_encode($resp);
    	echo $json;
    	die();
    }
    
    
    if($first_time == 'si' || $first_time == null)
    {
      $sql = "SELECT im.id_imagen, im.path, im.id_evento, im.comentario, im.id_profile, im.nombre_profile, im.foto_profile_url, ev.nombre_evento, im.delete_date 
      FROM eventos ev INNER JOIN imagenes im ON ev.id_evento = im.id_evento 
      WHERE im.id_evento = '".$id_evento."' AND im.id_profile 
      NOT IN (SELECT id_profile FROM usuarios_banneados) AND im.delete_date IS NULL";  
      $paso_por_aca = "si, paso pero por otro lado" ;
    }
    else
    {
      $sql = "SELECT im.id_imagen, im.path, im.id_evento, im.comentario, im.id_profile, im.nombre_profile, im.foto_profile_url, ev.nombre_evento, im.delete_date 
      FROM eventos ev INNER JOIN imagenes im ON ev.id_evento = im.id_evento 
      WHERE im.id_evento = '".$id_evento."' AND im.id_profile 
      NOT IN (SELECT id_profile FROM usuarios_banneados) AND im.delete_date IS NULL AND im.create_date > '".$time_request."' ";
      $paso_por_aca = "si, paso" ;
    }
    
    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database};charset=utf8", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 
   			
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $res['sql'] = $sql;
    $res['first_time'] = $first_time;
    $res['paso'] = $paso_por_aca;
    
    echo json_encode($info_devuelta);    
  }
   
  function is_ajax() 
  {
	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
  }

?>