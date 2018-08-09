<?php
    session_start();
    if($_SESSION["usuarioLogueado"] == null)
    {
         header("Location:http://www.partypicok.com/index.php");
    }
    else
    {
       if($_SESSION["rol"] == "administrador")
       {
            header("Location:http://www.partypicok.com/admin/dashboard.php");
       }
       else
       {
      $id_usuario = $_SESSION['id_usuario'];
      $id_evento = $_GET['id_evento'];
            $hostname = "localhost";
            $username = "lajoseacevedo";
            $password = "Canalla2012";
            $database = "partypic";
            $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));               
          
            $query = "SELECT sal.id_usuario FROM eventos ev INNER JOIN salones sal ON sal.id_salon = ev.id_salon WHERE ev.id_evento = '".$id_evento."'";

            $stmt = $conn->prepare($query);
            $stmt->execute();
            $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $data = $id_usuario . ' ' . json_encode($info_devuelta) . ' ' . $id_evento ;
            
            if($info_devuelta[0]['id_usuario'] != $id_usuario)
            {
              header("Location:http://www.partypicok.com/admin/dashboardEncargado.php");             
            }
            else
            {
              //Se deja estar en el sitio
            }
            
       }
    }
?>
<!DOCTYPE html>
<html class="no-js" lang="es">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1">
        <title>Party Pic App - Slider de Evento</title>
        <link rel="shortcut icon" href="../images/favicon.png"/>
        <meta name="description" content="SliderShow de Evento - Party Pic" />
        <meta name="keywords" content="party pic picture celebration fiesta evento fotografia fotos photos facundo zambuto app android ios apple" />
        <meta name="author" content="Facundo Zambuto" />
        
        <link rel="stylesheet" type="text/css" href="../admin/css/verSlider.css" />

	<script type="text/javascript" src="../js/modernizr.custom.86080.js"></script>
        <script type="text/javascript" src="../js/jquery-1.11.1.min.js"></script>
        <script type="text/javascript" src="../js/jquery.cookie.js"></script>
        <script type="text/javascript" src="../admin/js/verSlider.js"></script>

    </head>
    
    <body id="page">
        <ul class="cb-slideshow" id="contenedor-imagenes">
        </ul>
    </body>
</html>