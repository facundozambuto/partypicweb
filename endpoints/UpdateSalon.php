<?php
//Verifica si llegan datos por ajax
	if (is_ajax()) 
	{
		post_data($_POST);  
	}

	function post_data($args)
	{
		//Datos enviados desde el form de logueo
		$id_salon = $args['id_salon'];
		$nombre_salon = $args['nombre_salon'];
		$domicilio_salon = $args['domicilio_salon'];
		$telefono_salon = $args['telefono_salon'];
		$id_usuario = $args['id_usuario'];


		$res = array();

		if($nombre_salon  == null || $domicilio_salon == null || $telefono_salon == null || $id_usuario == null)
		{
			$res['success'] = false;
			$res['mensaje'] = "Existen campos vacíos.";
		}
		else
		{
			$salon_ok = get_salon($nombre_salon);
			$nombresalon_bd  = get_nombresalon($id_salon);

			if(($nombresalon_bd  != $nombre_salon ) && ($salon_ok )) //Aca quiero saber si el mail ingresado existe, pero si es el mismo del usuario que se esta modificando que salga por false -falta una condicion-
			{
				$res['success'] = false;
				$res['mensaje'] = "El nombre de salón ingresado ya está registrado.";
			}
			else
			{
			    $hostname = "localhost";
		            $username = "lajoseacevedo";
		            $password = "Canalla2012";
		            $database = "partypic";
		            $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               
		          
		            $query = "UPDATE salones SET nombre_salon = '{$nombre_salon }', domicilio_salon = '{$domicilio_salon }', telefono_salon = '{$telefono_salon }', id_usuario = '{$id_usuario }' WHERE id_salon= '{$id_salon}'";

		            $stmt = $conn->prepare($query);
		            $stmt->execute();

		            $res['success'] = true;
		            $res['query'] = $query;
					
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
	function get_salon($nombre_salon)
	{
		$con = Conectarse();
		$query="SELECT * FROM salones WHERE nombre_salon='{$nombre_salon}'";
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

	function get_nombresalon($id_salon)
	{
		$con = Conectarse();
		 
		$sql = "SELECT * FROM salones WHERE id_salon= '".$id_salon."' ";
					
		$retval = mysql_query( $sql, $con);
		if(! $retval )
		{
			die('Could not get data: ' . mysql_error());
		}

		$info_devuelta = array(array());
		$a = 0;
		while($row = mysql_fetch_assoc($retval, MYSQL_BOTH))
		{
			$info_devuelta[$a]['nombre_salon'] = $row['nombre_salon'];
			$a++;
		} 	

		return $info_devuelta[0]['nombre_salon'];
	}

	function is_ajax() 
	{
		return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	}

?>