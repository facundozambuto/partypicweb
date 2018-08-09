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
        $nombre_salon = $args['nombre_salon2'];
        $domicilio_salon = $args['domicilio_salon2'];
        $telefono_salon = $args['telefono_salon2'];
        $id_usuario = $args['id_usuario2'];

        $res = array();

        if($nombre_salon == null || $domicilio_salon == null || $telefono_salon == null || $id_usuario == null)
        {
            $res['success'] = false;
            $res['mensaje'] = "Existen campos vacíos.";
        }
        else
        {
            $salon_ok = get_salon($nombre_salon);

            if($salon_ok)
            {
                $res['success'] = false;
                $res['mensaje'] = "Ya se encuentra un salón con ese nombre en Base de Datos, ingresá otro.";
            }
            else
            {
                $hostname = "localhost";
                $username = "lajoseacevedo";
                $password = "Canalla2012";
                $database = "partypic";
                $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               
                $query = "INSERT INTO salones SET nombre_salon = '{$nombre_salon}', domicilio_salon = '{$domicilio_salon}', telefono_salon = '{$telefono_salon}', id_usuario = '{$id_usuario}', create_date = NOW()";

                $stmt = $conn->prepare($query);
                $stmt->execute();
                $id_salon = $conn->lastInsertId(); 

                $res['success'] = true;
                $res['query'] = $query;
                $res['id'] = $id_salon;
            }
        }
        echo json_encode($res);
    }

    function get_salon($nombre_salon)
    {
        $hostname = "localhost";
        $username = "lajoseacevedo";
        $password = "Canalla2012";
        $database = "partypic";
        $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        $query="SELECT * FROM salones WHERE nombre_salon='{$nombre_salon}'";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $nr = $stmt->rowCount();
        $state = false;

        if($nr >= 1)
        {
            $state = true;
        }

        mysql_close($con); 

        return $state;
    }

    function is_ajax() 
    {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

?>