<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (is_ajax())
{
   post_data($_POST);
}


function post_data($args)
{
    //Datos enviados desde el form de logueo
  $email = $args['email'];
  $nombre = $args['name'];
  $apellido = $args['surname'];
  $mensaje = $args['message'];
  $telefono = $args['phone'];

  $res = array();

  if($email == null || $nombre == null || $mensaje == null || $apellido == null)
  {
  	$res['success'] = false;
  }
  else
  {
	if(!filter_var($email, FILTER_VALIDATE_EMAIL))
   	{
		$res['success'] = false;
   	}
   	else
   	{
		$to = 'facundozambuto@gmail.com, soporte@partypicapp.com';
		//$to = 'facundozambuto@gmail.com';
		$subject = "Nueva Consulta";
		//$message = $mensaje . "\r\n  \r\n  <span style=\"color:red\"><b>E-mail:</b></span>" . $email . "\r\n  \r\n Teléfono: " . $telefono;

	    $message = '<html><body>';
	    $message .= '<img src="http://www.partypicapp.com/images/IconoPartyPic.png" width="75" height="75" class="img-responsive">';
	    $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
	    $message .= "<tr style='background: #eee;'><td><strong>Nombre:</strong> </td><td>" . $nombre . " ". $apellido ."</td></tr>";
	    $message .= "<tr><td><strong>Email:</strong> </td><td>" . $email . "</td></tr>";
	    $message .= "<tr><td><strong>Teléfono:</strong> </td><td>" . $telefono . "</td></tr>";
	    $message .= "<tr><td><strong>Consulta:</strong> </td><td>" . $mensaje  . "</td></tr>";
	    $message .= "</table>";
	    $message .= "</body></html>";


	    $headers = "From:" . $nombre . "\r\n";
	    $headers .= "MIME-Version: 1.0\r\n";
  	    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	    mail($to, utf8_decode($subject), utf8_decode($message), $headers);
	
	    $res['success'] = true;
	    $res['message'] = "Tu consulta ha sido enviada con éxito, en breve será respondida.";
   	}
  }


  echo json_encode($res);
}//close function




	function is_ajax() 
	{
	  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	}
