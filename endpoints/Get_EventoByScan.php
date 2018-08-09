<?php

post_data();

function post_data()
{
	
	if (isset($_GET['codigo']))
	{
		$codigo = $_GET['codigo'];
	}
	
	$res = array();
	
	$hostname = "localhost";
	$username = "lajoseacevedo";
	$password = "Canalla2012";
	$database = "partypic";
	$conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               
	
	$query = "SELECT * FROM eventos WHERE codigo = '".$codigo."' AND habilitado = 1";
	
	$stmt = $conn->prepare($query);
	$stmt->execute();
	$info_devuelta= $stmt->fetchAll(PDO::FETCH_ASSOC);
	 			
	$resultado = json_encode($info_devuelta, JSON_UNESCAPED_UNICODE);
	error_log(print_r($resultado, true), 3,"/home/josefinaacevedo/public_html/endpoints/logspost2.txt");
	if($resultado == "[[]]")
	{
		$resultado = "Macri Gato";
		echo $resultado;
	}
	else 
	{	
		echo $resultado;
	}
	
 
  /*
	$result = mysql_query($sql); // This line executes the MySQL query that you typed above
	$yourArray = array(); // make a new array to hold all your data

	$index = 0;
	while($row = mysql_fetch_assoc($result)) // loop to give you the data in an associative array so you can use it however.
	{
		$yourArray[$index] = $row;
		$index++;
	} 
  
	foreach ($yourArray as $indice) 
	{
		echo json_encode($row[$indice][nombre]); 
	}
  */
}//close function


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
 


?>