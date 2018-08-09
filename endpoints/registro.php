<?php
//Verifica si llegan datos por ajax
if (is_ajax()) 
{
   post_data($_POST);  
}


function post_data($args)
{
    //Datos enviados desde el form de logueo
  $mail = $args['name'];
  $nombre = $args['firstname'];
  $apellido = $args['lastname'];
  $contrasenia = $args['password'];
  $contrasenia_confirm = $args['confirmPassword'];
   
  $hash = md5(rand(0,1000));
  
  
  $res = array();
  
  if($mail == null || $nombre == null || $apellido == null || $contrasenia == null || $contrasenia_confirm == null)
  
  		{
  		$res['success'] = false;
  		}
  else
  {
  	$usuario_ok = get_usuario($mail);

	if($usuario_ok)
  	{
  	 	 $res['success'] = false;
  	}
  
  	else
  	{
		if(!filter_var($mail, FILTER_VALIDATE_EMAIL))
   		 	{
   		 		 $res['success'] = false;
   		 	}
   		else
   		{
   		 	if($contrasenia != $contrasenia_confirm)
   		 	   {
   		 	   		$res['success'] = false;
   		 	   }
   		 	else
   		 	{
   		 		if(strlen($contrasenia) <= '8')
   		 		{
   		 			$res['success'] = false;
   		 		}
   		 		else
   		 		{
   		 			$con = Conectarse();
					mysql_query("INSERT INTO usuarios (email, contrasenia, rol, fecha_alta, nombre, apellido, hash, active) VALUES ('{$mail}', '{$contrasenia}', 'normal', CURDATE(), '{$nombre}', '{$apellido}', '{$hash}', 0)", $con);
					
					
										
$to      = $mail; 
$subject = 'Registro | Verificación'; 
$from =  "noreply@brosmayorista.com";
$message = '

'.$nombre.',

¡Gracias por registrarte en nuestro sitio!
Tu cuenta ha sido creada, ahora vas a poder iniciar sesión con las siguientes credenciales una vez activada tu cuenta clickeando el link que se encuentra más abajo.
------------------------
Usuario: '.$mail.'
Contraseña: '.$contrasenia.'
------------------------

Hacé click en el siguiente link para activar tu cuenta:
http://www.brosmayorista.com/users/verificacion.php?email='.$mail.'&hash='.$hash.'
					 
'; 
					                     
$headers = "From:" . $from;
mail($to, $subject, $message, $headers);
				
$res['success'] = true;
   		 		}
   		 	}
   		 }


  	}
  }

  echo json_encode($res);
}//close function


function Conectarse(){
  $hostname = "localhost";
  $username = "elbochis";
  $password = "elbochis";
  $database = "brosmayorista";
  if(!($link=mysql_connect($hostname,$username,$password)))
  {
   echo "Error al conectar a la base de datos";
   exit();
  }
  if(!mysql_select_db($database, $link))
  {
   echo "Error seleccionando la base de datos";
   exit();
  }
  return $link;  
 }
 
 //Consulta

 function get_usuario($mail)
 {

  $con = Conectarse();
  $query="SELECT * FROM usuarios WHERE email='{$mail}'";
  $resultado = mysql_query($query, $con);

  $state = false;
 
  if (!$resultado) 
  {
      //Este echo habria que sacarlo para no meter data el html
      echo 'No se pudo ejecutar la consulta: ' . mysql_error();
  }

  $nr  = mysql_num_rows($resultado);

  if($nr == 1)
  {
    $state = true;
  }

  mysql_close($con); 

 return $state;


 }


function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}



?>