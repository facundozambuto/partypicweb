<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $usuario = $request->loginEmail;
    $pass = $request->loginPassword;

    $hostname = "localhost";
    $username = "lajoseacevedo";
    $password = "Canalla2012";
    $database = "partypic";
    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 

    $res = array();

    $sql = "SELECT * FROM usuarios WHERE email='{$usuario}' and contrasenia='{$pass}' and activo = 1";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if(count($info_devuelta) == 1) 
    {
      $res['success'] = true;
      $usuario = $info_devuelta[0]['email'];
      $rol = $info_devuelta[0]['rol'];
      $nombre = $info_devuelta[0]['nombre_usuario'];
      $id_usuario = $info_devuelta[0]['id_usuario'];

      $res['response'] = $usuario . $rol . $nombre . $id_usuario;
      create_session($usuario, $rol, $nombre, $id_usuario);
    }
    else
    {
      $res['success'] = false;
      $res['errorMessage'] = 'El usuario o contraseña son inválidos.';
      $res['request'] = $request;
    }
    
    $res['sql'] = $sql;

    echo json_encode($res);  
    
    function create_session($usuario, $rol, $nombre, $id_usuario)
    {
      session_set_cookie_params(36000);
      session_start();
      $_SESSION["usuarioLogueado"]= $usuario;
      $_SESSION["rol"]= $rol;
      $_SESSION["nombre"]= $nombre;
      $_SESSION["id_usuario"]= $id_usuario;
    }
    
?>

