<?php

	//ini_set('display_errors', 1);
	//ini_set('display_startup_errors', 1);

	if($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		$response = array(); 
		
		$DefaultId = 0;
		$ImageData = $_FILES['image'];
		$IdEvento = $_POST['id_evento'];
		$IdPerfil = $_POST['profile_id'];
		$ImagenPerfil = $_POST['profile_pic'];
		$NombrePerfil = $_POST['profile_name'];
		$Comentario = $_POST['comentario'];
		
		$server_ip = gethostbyname(gethostname());
		//$upload_url = 'http://'.$server_ip.'/imagenes_eventos/'.$IdEvento.'/';
		
		$upload_url = "/home/o4z5sdhblexk/public_html/imagenes_eventos/" . $IdEvento.'/';
		$upload_path = '/imagenes_eventos/'.$IdEvento.'/';
		
		
		
		$fileinfo = pathinfo($_FILES['image']['name']);
 
		 //getting the file extension 
		 $extension = $fileinfo['extension'];
		 
		 //file url to store in the database 
		 $file_url = $upload_url . getFileName() . '.' . $extension;
		 
		 //PATH CUANDO ESTABA SIN LA ROTACION
		 $file_path = $upload_url. getFileName() . '.'. $extension; 

		
		try
		{
			//saving the file 
			move_uploaded_file($_FILES['image']['tmp_name'],$file_path);
			
			$hostname = "localhost";
			$username = "lajoseacevedo";
			$password = "Canalla2012";
			$database = "partypic";
			$conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               
		  
			$query = "INSERT INTO imagenes SET path = '{$file_url}', id_evento = '{$IdEvento}', comentario = '{$Comentario}', id_profile = '{$IdPerfil}', nombre_profile = '{$NombrePerfil}', foto_profile_url = '{$ImagenPerfil}', create_date = NOW()";

			$stmt = $conn->prepare($query);
			$stmt->execute();
			
			$response['error'] = false; 
			$response['url'] = $file_path; 
			$response['name'] = $NombrePerfil;
			$response['query'] = $query;
		}
				
		catch(Exception $e)
		{
			$response['error']=true;
			$response['message']=$e->getMessage();
		} 
		 //displaying the response 
		echo json_encode($response);
		 
		//closing the connection 
		mysqli_close($con);
	}
	else
	{
		$response['error']=true;
		$response['message']='Please choose a file';
	}
	
	function getFileName()
	{
		$hostname = "localhost";
		$username = "lajoseacevedo";
		$password = "Canalla2012";
		$database = "partypic";
		
		$con = mysqli_connect($hostname,$username,$password,$database) or die('Unable to Connect...');
		$sql = "SELECT max(id_imagen) as id_imagen FROM imagenes";
		$result = mysqli_fetch_array(mysqli_query($con,$sql));
	 
		mysqli_close($con);
		if($result['id_imagen']==null)
			return 1; 
		else 
			return ++$result['id_imagen']; 
	}

?>