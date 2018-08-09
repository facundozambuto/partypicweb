<?php
//Verifica si llegan datos por ajax
	if (is_ajax()) 
	{
		post_data($_POST);  
	}

	function post_data($args)
	{
		//Datos enviados desde el form de logueo
		$id_usuario = $args['id_usuario'];
		$email = $args['email'];
		$nombre_usuario = $args['nombre_usuario'];
		$contrasenia = $args['contrasenia'];
		$rol = $args['rol'];
		$activo = $args['activo'];
		$domicilio_usuario = $args['domicilio_usuario'];
		$telefono_usuario = $args['telefono_usuario'];
		$celular_usuario = $args['celular_usuario'];
		$cuil_usuario = $args['cuil_usuario'];


		$res = array();

		if($email == null || $nombre_usuario == null || $contrasenia == null || $rol == null || $activo == null)
		{
			$res['success'] = false;
			$res['mensaje'] = "Existen campos vacíos.";
		}
		else
		{
			$usuario_ok = get_usuario($email);
			$email_bd  = get_email($id_usuario);

			if(($email_bd != $email) && ($usuario_ok)) //Aca quiero saber si el mail ingresado existe, pero si es el mismo del usuario que se esta modificando que salga por false -falta una condicion-
			{
				$res['success'] = false;
				$res['mensaje'] = "El e-mail ingresado ya está registrado.";
			}
			else
			{
				if(!filter_var($email, FILTER_VALIDATE_EMAIL))
				{
					$res['success'] = false;
					$res['mensaje'] = "El formato de e-mail es incorrecto.";
				}
				else
				{
					if(strlen($contrasenia) <= '8')
					{
						$res['success'] = false;
						$res['mensaje'] = "La contraseña es demasiado corta.";
					}
					else
					{
						$hostname = "localhost";
			            $username = "lajoseacevedo";
			            $password = "Canalla2012";
			            $database = "partypic";
			            $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               
			          
			            $query = "UPDATE usuarios SET nombre_usuario = '{$nombre_usuario}', email = '{$email}', contrasenia = '{$contrasenia}', activo = '{$activo}', rol = '{$rol}', domicilio_usuario = '{$domicilio_usuario}', telefono_usuario = '{$telefono_usuario}', celular_usuario = '{$celular_usuario}', cuil_usuario = '{$cuil_usuario}' WHERE id_usuario = '{$id_usuario}'";

			            $stmt = $conn->prepare($query);
			            $stmt->execute();

			            $res['success'] = true;
			            $res['query'] = $query;
					}
				}
			}
		}	
		echo json_encode($res);
	}//close function


	function Conectarse()
	{
		$hostname = "localhost";
		$username = "lajoseacevedo";
		$password = "Canalla2012";
		$database = "partypic";

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
	function get_usuario($email)
	{
		$con = Conectarse();
		$query="SELECT * FROM usuarios WHERE email='{$email}'";
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

	function get_email($id_usuario)
	{
		$con = Conectarse();
		 
		$sql = "SELECT * FROM usuarios WHERE id_usuario = '".$id_usuario."' ";
					
		$retval = mysql_query( $sql, $con);
		if(! $retval )
		{
			die('Could not get data: ' . mysql_error());
		}

		$info_devuelta = array(array());
		$a = 0;
		while($row = mysql_fetch_assoc($retval, MYSQL_BOTH))
		{
			$info_devuelta[$a]['email'] = $row['email'];
			$a++;
		} 	

		return $info_devuelta[0]['email'];
	}

	function is_ajax() 
	{
		return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	}

?>