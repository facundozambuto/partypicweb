<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  if(is_ajax()) 
  {
    post_data($_POST);  
  }


  function post_data($args)
  {
    //Datos enviados desde el form de logueo
    $id_usuario = $args['id_usuario'];
    //$con = Conectarse();
    $res = array();

    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

    $sql = "SELECT COUNT(*) from eventos INNER JOIN salones ON eventos.id_salon = salones.id_salon INNER JOIN usuarios ON usuarios.id_usuario = salones.id_usuario WHERE usuarios.id_usuario = '".$id_usuario."'"; 
    $result = $conn->prepare($sql); 
    $result->execute(); 
    $number_of_rows = $result->fetchColumn();

    //$nRows = $conn->query('SELECT COUNT(*) from eventos INNER JOIN salones ON eventos.id_salon = salones.id_salon INNER JOIN usuarios ON usuarios.id_usuario = salones.id_usuario WHERE usuarios.id_usuario = '".$id_usuario."'')->fetchColumn(); 

    if($number_of_rows == 0)
    {
      $query = "DELETE FROM usuarios WHERE id_usuario = '".$id_usuario."'";

      $stmt = $conn->prepare($query);
      $stmt->execute();
      $res['success'] = true;
      echo json_encode($res);
    }
    else
    {
      $res['success'] = false;
      $res['mensaje'] = "El usuario seleccionado posee eventos pendientes. Elimine previamente dichos eventos e intente nuevamente.";
      echo json_encode($res);
    }
  }

  function is_ajax() 
  {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
  }

?>