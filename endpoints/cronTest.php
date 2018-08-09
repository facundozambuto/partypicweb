<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

  $email = 'cron@test.com';
  $nombre = 'facu';
  $apellido = 'zambuto';
  $mensaje = 'prueba de cron';
  $telefono = '45646876';

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
		$to = 'facundozambuto@gmail.com, soporte@partypicok.com';
		//$to = 'facundozambuto@gmail.com';
		$subject = "Nueva Consulta";
		//$message = $mensaje . "\r\n  \r\n  <span style=\"color:red\"><b>E-mail:</b></span>" . $email . "\r\n  \r\n Teléfono: " . $telefono;

	    $message = '<html><body>';
	    $message .= '<img src="http://www.partypicok.com/images/IconoPartyPic.png" width="75" height="75" class="img-responsive">';
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

?>