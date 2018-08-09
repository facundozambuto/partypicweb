<?php
  //ini_set('display_errors', 1);
  //ini_set('display_startup_errors', 1);
  session_start();
  if(is_ajax()) 
  {
    post_data($_POST);  
  }

  function post_data($args)
  {
    //Datos enviados desde el form de logueo
        $id_imagen = $args['id_imagen'];
	$id_evento = $args['id_evento'];
	$bloquear_usuario = $args['bloquear'];
	$id_profile = $args['id_profile'];
	$nombre_perfil = $args['nombre_perfil'];
	
	if($bloquear_usuario === 'true')
	{
		$bloquear_usuario = true;
	}
	else
	{
		if($bloquear_usuario === 'false')
		{
			$bloquear_usuario = false;
		}
	}
	
    $res = array();

    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    
	if($bloquear_usuario)
	{
		$query = "UPDATE imagenes SET delete_date = CURDATE() WHERE id_imagen = '".$id_imagen."'";

		$stmt = $conn->prepare($query);
		$stmt->execute();
		$name_file = "/home/josefinaacevedo/public_html/imagenes_eventos/" . $id_evento . "/" . $id_imagen . ".jpg";
		unlink($name_file);
		
		$query_block = "INSERT INTO usuarios_banneados SET id_profile = '".$id_profile."', nombre_banneado = '".$nombre_perfil."', id_usuario = '".$_SESSION['id_usuario']."', id_evento = '".$id_evento."', fecha_ban = NOW()";
		$stmt = $conn->prepare($query_block);
		$stmt->execute();
		
		$res['success'] = true;
		$res['query_block'] = $query_block;
		$res['query'] = $query;
		$res['bloquear_usuario'] = $bloquear_usuario;
	}
	else
	{
		$query = "UPDATE imagenes SET delete_date = CURDATE() WHERE id_imagen = '".$id_imagen."'";

		$stmt = $conn->prepare($query);
		$stmt->execute();
		$name_file = "/home/josefinaacevedo/public_html/imagenes_eventos/" . $id_evento . "/" . $id_imagen . ".jpg";
		unlink($name_file);
		$res['success'] = true;
		$res['query'] = $query;
	}
    echo json_encode($res);
  }

  function is_ajax() 
  {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
  }

?>