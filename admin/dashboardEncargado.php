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
          
       }
    }
?>

<!DOCTYPE html>

<html class="no-js" lang="es"><!--<![endif]-->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <title>Party Pic App - Dashboard</title>
    <link rel="shortcut icon" href="../images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/style_menu.css"/>
    <link rel="stylesheet" type="text/css" href="../css/jquery.bootgrid.min.css" />
    <link rel="stylesheet" type="text/css" href="../admin/css/dashboard.css" />
    <link rel="stylesheet" type="text/css" href="../css/jquery.datetimepicker.css"/>
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Oswald">
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
    
    <script type="text/javascript" src="../js/modernizr.custom.86080.js"></script>
    <script type="text/javascript" src="../js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../js/moderniz.2.8.1.js"></script>
    <script type="text/javascript" src="../js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../js/modernizr.custom.63321.js"></script>
    <script type="text/javascript" src="../js/jquery.cookie.js"></script>
    <script type="text/javascript" src="../js/jquery.bootgrid.js"></script>
    <script type="text/javascript" src="../js/jquery.bootgrid.fa.js"></script>
    <script type="text/javascript" src="../js/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../js/jquery.datetimepicker.full.js"></script>
    <script type="text/javascript" src="../js/bootswatch.js"></script>
    <script type="text/javascript" src="../admin/js/dashboard.js"></script>
    <script type="text/javascript" src="../admin/js/initDashboardEncargado.js"></script>
      
  </head>
  
  <body>
    <?php include_once('../admin/nav-superior-lateral.php') ?>
    <!-- Page Content -->
      <div id="page-content-wrapper" style="padding-top:40px">
         <div class="container container-ppal" style="margin-top:40px; margin-bottom:40px">
          <div class="row">
            <div class="btn-group btn-breadcrumb pull-left">
              <a href="../admin/dashboard.php" class="btn btn-primary"><i class="glyphicon glyphicon-home"></i></a>
              <a href="../admin/dashboard.php" class="btn btn-primary">Menú Principal</a>
              <!--<a href="#" class="btn btn-primary">Primary</a>-->
            </div>
          </div>
        </div>
        
        <div class="animationload" id="loadingDivPadre">
       	   <div class="osahanloading"></div>
      	</div>
        
        <div class="container" style="padding-left: 0; padding-right: 0">
          <div class="row">
          
          
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading dashboard-eventos">
                <div class="row">
                  <div class="col-xs-6">
                    <i class="fa fa-calendar fa-5x"></i>
                  </div>
                  <div class="col-xs-6 text-right">
                    <p class="announcement-heading"><?php
				    $res = array();
				    $id_usuario = $_SESSION['id_usuario'];
				    $sql = "SELECT * FROM eventos INNER JOIN salones ON eventos.id_salon = salones.id_salon WHERE eventos.fecha >= ( NOW( ) - INTERVAL 1 MONTH ) AND salones.id_usuario = '".$id_usuario."'";
				    
				    $hostname = "localhost";
				    $username = "lajoseacevedo";
				    $password = "Canalla2012";
				    $database = "partypic";
				    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 
				        
				    $stmt = $conn->prepare($sql);
				    $stmt->execute();
				    $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
				    
				    $res['sql'] = $sql;
				    
				    echo json_encode(count($info_devuelta));
				?>
		    </p>
                    <p class="announcement-text">Eventos del mes</p>
                  </div>
                </div>
              </div>
              <a href="../admin/menueventosEncargado.php">
                <div class="panel-footer announcement-bottom">
                  <div class="row">
                    <div class="col-xs-6">
                      Ir a Eventos
                    </div>
                    <div class="col-xs-6 text-right">
                      <i class="fa fa-arrow-circle-right"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>  

          <div class="col-md-6">
            <div class="panel panel-danger">
              <div class="panel-heading  dashboard-imagenes">
                <div class="row">
                  <div class="col-xs-6">
                    <i class="fa fa-picture-o fa-5x"></i>
                  </div>
                  <div class="col-xs-6 text-right">
                    <p class="announcement-heading"><?php
				    $res = array();
				    $id_usuario = $_SESSION['id_usuario'];
				    $sql = "SELECT * FROM eventos ev INNER JOIN imagenes im ON ev.id_evento = im.id_evento INNER JOIN salones ON eventos.id_salon = salones.id_salon WHERE ev.fecha >= ( NOW( ) - INTERVAL 1 MONTH ) AND salones.id_usuario = '".$id_usuario."'";
				    
				    $hostname = "localhost";
				    $username = "lajoseacevedo";
				    $password = "Canalla2012";
				    $database = "partypic";
				    $conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 
				        
				    $stmt = $conn->prepare($sql);
				    $stmt->execute();
				    $info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
				    
				    $res['sql'] = $sql;
				    
				    echo json_encode(count($info_devuelta));  
				?>
		    </p>
                    <p class="announcement-text">Imágenes del mes</p>
                  </div>
                </div>
              </div>
              <a href="../admin/menueventosEncargado.php">
                <div class="panel-footer announcement-bottom">
                  <div class="row">
                    <div class="col-xs-6">
                      Ver detalles
                    </div>
                    <div class="col-xs-6 text-right">
                      <i class="fa fa-arrow-circle-right"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>    
          
          <div class="col-md-12">
            <div id='wrap'>
              <div id='calendar'></div>
              <div style='clear:both'></div>
            </div>
          </div>      
      
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->
  </body>
</html>