<?php
session_start();

if (is_ajax()) 
{
   post_data($_POST);  
}

function post_data($args)
{
  //Datos enviados desde el form de logueo
  $id_usuario = $_SESSION['id_usuario'];
  $email = $args['email'];
  $nombre_usuario = $args['nombre_usuario'];
  $cuil_usuario = $args['cuil_usuario'];
  $domicilio_usuario = $args['domicilio_usuario'];
  $telefono_usuario = $args['telefono_usuario'];
  $celular_usuario = $args['celular_usuario'];
  
  
  $res = array();
  
  if($email == null || $nombre_usuario == null)
  {
  	$res['success'] = false;
	  $res['mensaje'] = "Existen campos vacикos.";
  }
  else
  {
    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               

    $query = "UPDATE usuarios SET email = '{$email}', nombre_usuario = '{$nombre_usuario}', cuil_usuario = '{$cuil_usuario}', domicilio_usuario = '{$domicilio_usuario}', telefono_usuario = '{$telefono_usuario}', celular_usuario = '{$celular_usuario}' WHERE id_usuario = '".$id_usuario."'";

    $stmt = $conn->prepare($query);
    $stmt->execute();

    $res['success'] = true;
    $res['query'] = $query;
    
    $_SESSION['nombre'] = $nombre_usuario;

    echo json_encode($res);
  }
}//close function

function is_ajax() 
{
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

?>