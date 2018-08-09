<?php
    //Verifica si llegan datos por ajax
    if (is_ajax()) 
    {
       post_data($_POST);  
    }

    function post_data($args)
    {
          //Datos enviados desde el form de logueo
          $id_evento = $args['id_evento'];
          $nombre_evento = $args['nombre_evento'];
          $descripcion = $args['descripcion'];
          $habilitado = $args['habilitado'];
          $fecha = $args['fecha'];
          $id_salon = $args['id_salon'];

          $res = array();

          if($nombre_evento == null || $descripcion == null || $habilitado == null || $fecha == null)
          {
            $res['success'] = false;
            $res['mensaje'] = "Existen campos vacíos.";
          }
          else
          { 
            $hostname = "localhost";
            $username = "lajoseacevedo";
            $password = "Canalla2012";
            $database = "partypic";
            $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               
          
            $query = "UPDATE eventos SET nombre_evento = '{$nombre_evento}', descripcion = '{$descripcion}', fecha = '{$fecha}', habilitado = '{$habilitado}', id_salon = '{$id_salon}' WHERE id_evento = '{$id_evento}'";

            $stmt = $conn->prepare($query);
            $stmt->execute();

            $res['success'] = true;
            $res['query'] = $query;
          }	
     		
          echo json_encode($res);
    }//close function

    
    function is_ajax() 
    {
      return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

?>