<?php
	session_start();
	try
	{
		$hostname = "localhost";
		$username = "lajoseacevedo";
		$password =  "Canalla2012";
		$database  = "partypic";
		

		$conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

		//Parametro de la consulta
		
		$search = "";
		$where 	= "";
		$order_by = "fecha_ban";		
		$rowCount = 25;

		//Envia parametros adicionales en el pack json 
		$debug	= TRUE;

		//Obtengo la cantidad de resultados para mostrar por pagina
		
		if (! empty( $_REQUEST['rowCount']))
		{
			$rowCount = $_REQUEST['rowCount'];
		}
		
		//calculate the low and high limits for the SQL LIMIT x,y clause
		if ( !empty($_REQUEST['current']) )
		{
			$current = $_REQUEST['current'];
			$limit_lower = ($current * $rowCount) - ($rowCount);
			$limit_hight = $limit_lower + $rowCount;
		}

		if ($rowCount == -1)
		{
			$limit = ""; //no limit
		}
		else
		{
			$limit = "LIMIT {$limit_lower},{$limit_hight}";	
		}

		//Genera el order by 
		if (isset($_REQUEST['sort']) && is_array($_REQUEST['sort']) )
		{
			$order_by= "";
			
			foreach($_REQUEST['sort'] as $key=> $value)
			{
				$order_by.="{$key} {$value}";
			}
		}
		

		$search_phrase = $_REQUEST['searchPhrase'];
		
		if(!empty($search_phrase))
		{
			$search = trim($search_phrase);
			$where  = "AND us.nombre_usuario LIKE '".$search."%' OR sal.nombre_salon LIKE '".$search."%' OR ev.nombre_evento LIKE '".$search."%' OR ub.nombre_banneado LIKE '".$search."%' ";
			
		}
		

		//Consulta para obtener los resultados		
		$sql = "SELECT * FROM usuarios_banneados ub INNER JOIN usuarios us ON us.id_usuario = ub.id_usuario LEFT JOIN salones sal ON sal.id_usuario = us.id_usuario LEFT JOIN eventos ev ON ev.id_salon = sal.id_salon WHERE ub.id_evento = ev.id_evento AND ub.id_usuario = '".$_SESSION['id_usuario']."' {$where} ORDER BY {$order_by} {$limit}";
		
		$stmt = $conn->prepare($sql);
		$stmt->execute();
		$results_array = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		
		//Obtengo el total de resultados
		$query_count = "SELECT count(*) FROM usuarios_banneados WHERE id_usuario = '".$_SESSION['id_usuario']."'";
		$nRows = $conn->query($query_count)->fetchColumn();
		
		//Devuelvo la informacion en formato json
		
		$pack = array();
		$pack["current"] = $current;
		$pack["rowCount"] = $rowCount;
		$pack["rows"] = $results_array;
		$pack["total"] = $nRows;

		if($debug)
		{
			$pack['query']				= $sql;
			$pack['query_total']		= $query_count;		
		}
	
		echo json_encode($pack);
	
	}
	
	catch(PDOException $e) 
	{
		echo 'SQL PDO ERROR: ' . $e->getMessage();
	}

?>