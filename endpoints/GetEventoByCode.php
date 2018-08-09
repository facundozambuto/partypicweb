<?php

	session_start();

	post_data();

	function post_data()
	{
		if (isset($_GET['codigo']))
		{
			$codigo = $_GET['codigo'];
		}

		$res = array();
		$con = Conectarse();

		$sql = "SELECT * FROM eventos WHERE codigo = '".$codigo."' ";

		$retval = mysql_query($sql, $con);
		if(!$retval)
		{
			die('Could not get data: ' . mysql_error());
		}

		$info_devuelta = array(array());
		$a = 0;

		while($row = mysql_fetch_assoc($retval, MYSQL_BOTH))
		{
			$info_devuelta[$a]['id_evento'] = $row['id_evento'];
			$info_devuelta[$a]['codigo'] = $row['codigo'];
			$info_devuelta[$a]['nombre'] = $row['nombre'];
			$info_devuelta[$a]['fecha'] = $row['fecha'];
			$info_devuelta[$a]['descripcion'] = $row['descripcion'];
			$info_devuelta[$a]['id_salon'] = $row['id_salon'];
			$a++;
		}

		$resultado = json_encode($info_devuelta);
		if($resultado == "[[]]")
		{
			$resultado = "Macri Gato";
			echo $resultado;
		}
		else 
		{
			echo $resultado;
		}
	}

	function Conectarse()
	{
		$hostname = "localhost";
		$username = "lajoseacevedo";
		$password =  "Canalla2012";
		$database  = "partypic";

		if(!($link=mysql_connect($hostname,$username,$password)))
		{
			echo "Error al conectar a la base de datos";
			exit();
		}

		if(!mysql_select_db($database, $link))
		{
			echo "Error seleccionando la base de datos" . ' ' .  $database . ' ' . $username . ' ' . $password;
			exit();
		}
			
		return $link;  
	}

	function is_ajax() 
	{
		return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	}

?>