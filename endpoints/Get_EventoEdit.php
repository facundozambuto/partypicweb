<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
  session_start();
  if (is_ajax()) 
  {
     post_data($_POST);  
  }


  function post_data($datos)
  {
    $id_evento = $datos['id_evento'];
    $res = array();
    
    //$con = Conectarse();
    $sql = "SELECT ev.id_evento, ev.codigo, sal.nombre_salon, ev.nombre_evento, ev.codigo_qr, ev.habilitado, ev.descripcion, ev.fecha, sal.id_salon FROM eventos ev INNER JOIN salones sal ON ev.id_salon = sal.id_salon WHERE id_evento = '".$id_evento."'";
        
    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 
   			
    					 	
    /*$retval = mysql_query( $sql, $con);
    if(! $retval )
    {
      die('Could not get data: ' . mysql_error());
    }

    $info_devuelta = array(array());
    $a = 0;
    while($row = mysql_fetch_assoc($retval, MYSQL_BOTH))
    {
      $info_devuelta[$a]['id_evento'] = $row['id_evento'];
      $info_devuelta[$a]['codigo'] = $row['codigo'];
      $info_devuelta[$a]['nombre_salon'] = $row['nombre_salon'];
      $info_devuelta[$a]['nombre_evento'] = $row['nombre_evento'];
      $info_devuelta[$a]['codigo_qr'] = $row['codigo_qr'];
      $info_devuelta[$a]['habilitado'] = $row['habilitado'];
      $info_devuelta[$a]['descripcion'] = $row['descripcion'];
      $info_devuelta[$a]['fecha'] = $row['fecha'];
      $info_devuelta[$a]['id_salon'] = $row['id_salon'];
      $a++;
    }*/ 	
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($info_devuelta);    
  }//close function


  function Conectarse() {
    
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
   
  function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
  }

?>