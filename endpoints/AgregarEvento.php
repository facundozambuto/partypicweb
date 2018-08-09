<?php

  //ini_set('display_errors', 1);
  //ini_set('display_startup_errors', 1);

  if (is_ajax()) 
  {
     post_data($_POST);  
  }


  function post_data($args)
  {
      //Datos enviados desde el form de logueo
    $nombre_evento = $args['nombre_evento2'];
    $descripcion = $args['descripcion2'];
    $habilitado = $args['habilitado2'];
    $fecha = $args['fecha2'];
    $id_salon = $args['id_salon2'];
    
    $res = array();
    
    if($nombre_evento == null || $descripcion == null || $habilitado == null || $fecha == null || $id_salon == null)
    {
      $res['success'] = false;
      $res['mensaje'] = "Existen campos vacíos.";
    }
    else
    {
      $nombre_bd = get_nombre_evento($nombre_evento);

      if($nombre_bd)
      {
           $res['success'] = false;
           $res['mensaje'] = "Ya se encuentra un evento con ese nombre en Base de Datos, ingrese otro.";
      }
      else
      {
          //$con = Conectarse();
          $codigo = generateRandomString();
          $codigo_qr = "http://chart.apis.google.com/chart?cht=qr&chs=100x100&chl={$codigo}&chld=H|0";

          $hostname = "localhost";
          $username = "lajoseacevedo";
          $password = "Canalla2012";
          $database = "partypic";
          $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               
          
          $query = "INSERT INTO eventos SET nombre_evento = '{$nombre_evento}', descripcion = '{$descripcion}', fecha = '{$fecha}', id_salon = '{$id_salon}', habilitado = '{$habilitado}', codigo = '{$codigo}', codigo_qr = '{$codigo_qr}'";

          $stmt = $conn->prepare($query);
          $stmt->execute();
          $id_evento = $conn->lastInsertId(); 
          $name_folder = "/home/josefinaacevedo/public_html/imagenes_eventos/" . $id_evento;
          mkdir($name_folder, 0777, true);

          $res['success'] = true;
          $res['query'] = $query;
          $res['id'] = $id_evento;
          $res['name_folder'] = $name_folder;
      }
    }
    
    echo json_encode($res);
  }

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

  function get_nombre_evento($nombre_evento)
  {
    $con = Conectarse();
    $sql = "SELECT * FROM eventos WHERE nombre_evento = '".$nombre_evento."' ";
                   
    $retval = mysql_query($sql, $con);
    if(!$retval)
    {
      die('Could not get data: ' . mysql_error());
    }

    if ($retval && mysql_num_rows($retval) > 0)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  function generateRandomString($length = 8) 
  {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
  }

  function is_ajax() 
  {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
  }

?>