<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $codigo= $request->code;

    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 

    $res = array();
    $codigo = strtolower($codigo);
    $sql = "SELECT * FROM eventos WHERE LOWER(codigo) = '{$codigo}' ";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if(count($info_devuelta) == 1) 
    {
      $res['success'] = true;
      $id_evento= $info_devuelta[0]['id_evento'];

      $res['response'] = $id_evento . ' ' . $codigo;
      $res['id_evento'] = $id_evento;
      create_session($id_evento);
    }
    else
    {
      $res['success'] = false;
      $res['errorMessage'] = 'El código ingresado es inválido.';
      $res['request'] = $request;
    }
    
    $res['sql'] = $sql;

    echo json_encode($res);  
    
    function create_session($id_evento)
    {
      session_start();
      $_SESSION["usuarioInvitado"] = true;
      $_SESSION["id_evento"]= $id_evento;
    }
    
?>

