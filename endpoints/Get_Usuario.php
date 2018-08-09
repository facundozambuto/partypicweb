<?php

	session_start();
	$id_usuario = $_SESSION["id_usuario"];
	 
	$hostname = "localhost";
	$username = "lajoseacevedo";
	$password = "Canalla2012";
	$database = "partypic";
	$conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               
	
	$query = "SELECT * FROM usuarios WHERE id_usuario = '".$id_usuario."'";
	
	$stmt = $conn->prepare($query);
	$stmt->execute();
	$info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
	 			
	echo json_encode($info_devuelta);
	
?>