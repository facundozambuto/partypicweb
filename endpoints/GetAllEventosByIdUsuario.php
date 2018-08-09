<?php
    session_start();
    $res = array();
    $id_usuario = $_SESSION["id_usuario"];
    $sql = "SELECT * FROM eventos INNER JOIN salones ON eventos.id_salon = salones.id_salon WHERE salones.id_usuario = '".$id_usuario."'";
    
    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 
   			
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $res['sql'] = $sql;

    $eventos_formateados = array();
    
    foreach ($info_devuelta as $item) 
    {
      $obj = new stdClass();
      $obj->title = $item['nombre_evento'];
      $obj->allDay = false;
      $obj->start = $item['fecha'];
      $obj->url = '../admin/menueventosEncargado.php?id_evento='.$item['id_evento'];

      if($item['habilitado'] == 1)
      {
        $obj->className = 'success';
      }
      else 
      {
        $obj->className = 'danger';
      }

      $eventos_formateados[] = $obj;
    }


    echo json_encode($eventos_formateados);  

?>