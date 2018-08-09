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
        $email = $args['email2'];
        $nombre = $args['nombre_usuario2'];
        $contrasenia = $args['contrasenia2'];
        $rol = $args['rol2'];
        $domicilio = $args['domicilio_usuario2'];
        $telefono = $args['telefono_usuario2'];
        $celular = $args['celular_usuario2'];
        $cuil = $args['cuil_usuario2'];
        $activo = $args['activo2'];

        $res = array();

        if($email == null || $nombre == null || $contrasenia == null || $rol == null || $activo == null)
        {
            $res['success'] = false;
            $res['mensaje'] = "Existen campos vacíos.";
        }
        else
        {
            $usuario_ok = get_usuario($email);

            if($usuario_ok)
            {
                $res['success'] = false;
                $res['mensaje'] = "Ya se encuentra un usuario con ese email en Base de Datos, ingrese otro.";
            }
            else
            {
                if(!filter_var($email, FILTER_VALIDATE_EMAIL))
                {
                    $res['success'] = false;
                    $res['mensaje'] = "El formado de e-mail es incorrecto.";
                }
                else
                {
                    if(strlen($contrasenia) <= '8')
                    {
                        $res['success'] = false;
                        $res['mensaje'] = "La contraseña es demasiado corta.";
                    }
                    else
                    {
                        $hostname = "localhost";
                        $username = "lajoseacevedo";
                        $password = "Canalla2012";
                        $database = "partypic";
                        $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               
                        $query = "INSERT INTO usuarios SET email = '{$email}', nombre_usuario = '{$nombre}', contrasenia = '{$contrasenia}', rol = '{$rol}', domicilio_usuario = '{$domicilio}', telefono_usuario = '{$telefono}', celular_usuario = '{$celular}', cuil_usuario = '{$cuil}', activo = '{$activo}',  fecha_alta = NOW()";

                        $stmt = $conn->prepare($query);
                        $stmt->execute();
                        $id_usuario = $conn->lastInsertId(); 

                        $res['success'] = true;
                        $res['query'] = $query;
                        $res['id'] = $id_usuario;
                    }
                }
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

    function get_usuario($email)
    {
        $con = Conectarse();
        $sql = "SELECT * FROM usuarios WHERE email = '".$email."' ";

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

    function is_ajax() 
    {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

?>