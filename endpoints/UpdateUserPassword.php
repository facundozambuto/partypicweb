<?php
session_start();

if (is_ajax()) 
{
   post_data($_POST);  
}

function post_data($args)
{
  //Datos enviados desde el form
  $id_usuario = $_SESSION['id_usuario'];
  $password = $args['oldPassword'];
  $newpassword = $args['password'];
  $passwordConfirmation = $args['passwordConfirmation'];
  
  
  $res = array();
  
  if($password == null || $newpassword == null || $passwordConfirmation == null)
  {
  	$res['success'] = false;
	  $res['mensaje'] = "Existen campos vacíos.";
  }
  else
  {
	if($newpassword != $passwordConfirmation)
	{
		$res['success'] = false;
		$res['mensaje'] = "Las contraseñas no coinciden.";
	}
	else
	{
		if(strlen($newpassword) <= '8')
		{
			$res['success'] = false;
			$res['mensaje'] = "La contraseña es muy corta.";
		}
		else
		{   
			$flag = get_password($password);
			if($flag == false)
			{
				$converted_res = ($flag) ? 'true' : 'false';
				$res['success'] = false;
				$res['mensaje'] = "La contraseña actual ingresada es incorrecta. Vuelva a intentarlo. ";
			}
			else
			{
			  $hostname = "localhost";
        $username = "lajoseacevedo";
        $passwordBD = "Canalla2012";
        $database = "partypic";
        $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $passwordBD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

        $query = "UPDATE usuarios SET contrasenia = '{$newpassword}' WHERE id_usuario = '{$id_usuario}'";

        $stmt = $conn->prepare($query);
        $stmt->execute();
        $res['success'] = true;
        $res['query'] = $query;
				$res['mensaje'] = "Supuestamente pasó la validación y updateó";
			}
		}
    }	
  }
  echo json_encode($res);
}

function is_ajax() 
{
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function get_password($password)
{
  $hostname = "localhost";
  $username = "lajoseacevedo";
  $passwordBD = "Canalla2012";
  $database = "partypic";
  $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $passwordBD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
  $id_usuario = $_SESSION['id_usuario'];
  $query = "SELECT * FROM usuarios WHERE contrasenia= '{$password}' AND id_usuario = '{$id_usuario}'";

  $stmt = $conn->prepare($query);
  $stmt->execute();
  $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $state = false;
  $nr  = count($info_devuelta);

  if($nr == 1)
  {
    $state = true;
  }

  return $state;
 }
 

?>