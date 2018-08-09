<?php
  //ini_set('display_errors', 1);
  //ini_set('display_startup_errors', 1);
  if(is_ajax()) 
  {
    post_data($_POST);  
  }

  function post_data($args)
  {
    //Datos enviados desde el form de logueo
    $id_salon = $args['id_salon'];
   
    $res = array();

    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    
    $query = "DELETE FROM salones WHERE id_salon = '".$id_salon."'";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $res['success'] = true;
    echo json_encode($res);
  }

  function is_ajax() 
  {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
  }

?>