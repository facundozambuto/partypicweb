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
    <title>Party Pic App - Menú de Usuarios Bloqueados</title>
    <link rel="shortcut icon" href="../images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/style_menu.css"/>
    <link rel="stylesheet" type="text/css" href="../css/jquery.bootgrid.min.css" />
    <link rel="stylesheet" type="text/css" href="../admin/css/menubanneados.css" />
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
            <a href="../admin/menubanneadosEncargado.php" class="btn btn-primary">Menú Usuarios Bloqueados</a>
          </div>
        </div>
      </div>
      
      <div class="animationload" id="loadingDivPadre">
       	   <img src="../images/animacionLogo.gif" style="margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;" alt="partypic"/>
      </div>
      
      <div class="container container-ppal-2">
        <table id="grid-command-buttons" class="table table-condensed table-hover table-striped" data-toggle="bootgrid" data-ajax="true" data-url="../endpoints/BackMenuBanneados.php">
          <thead style="border: 2px solid black;">
            <tr>
              <th data-column-id="id_profile" data-formatter="IDProfileColumn" data-type="numeric" data-header-css-class="IDProfileColumn">ID</th>
              <th data-column-id="nombre_banneado" data-formatter="NombreBanneadoColumn" data-header-css-class="NombreBanneadoColumn" data-sortable="true">Usuario Bloqueado</th>
              <th data-column-id="nombre_usuario" data-formatter="NombreColumn" data-header-css-class="NombreColumn" data-identifier="true" data-sortable="true">Encargado/Admin</th>
              <th data-column-id="rol" data-formatter="RolColumn" data-header-css-class="RolColumn" data-sortable="true">Rol</th>
              <th data-column-id="fecha_ban" data-formatter="FechaColumn" data-header-css-class="FechaColumn" data-sortable="true">Fecha del bloqueo</th>
              <th data-column-id="nombre_salon" data-formatter="NombreSalonColumn" data-header-css-class="NombreSalonColumn" data-sortable="true">Salón</th>
              <th data-column-id="nombre_evento" data-formatter="NombreEventoColumn" data-header-css-class="NombreEventoColumn" data-sortable="true">Evento</th>
              <th data-column-id="commands" data-formatter="commands" data-header-css-class="CommandColumn" data-sortable="false">Opciones</th>
            </tr>
          </thead>
        </table>
       </div>
       
        <div id="modalEliminar" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="mySmallModalLabel">Desbloquear Usuario</h4>
              </div>
              <div class="modal-body">
                &iquest;Estás seguro que deseás quitar el bloqueo al usuario seleccionado?
              </div>
              <div class="modal-footer">
                <button id="btnCancelDelete" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button id="btnConfirmDelete" type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div>

        <div id="modalSuccess" class="modal fade bs-example-modal-lg">
          <div class="modal-dialog modal-lg">
            <div class="modal-content" style="background-color:#dff0d8">
              <div class="modal-header">
                <button style="color:red" type="button" class="close" data-dismiss="modal" aria-label="Close"><span>×</span></button>
                <h4 style="color:black" class="modal-title" id="mySmallModalLabel2">OK<a class="anchorjs-link" href="#myLargeModalLabel"><span class="anchorjs-icon"></span></a></h4>
              </div>
              <div style="color:black" class="modal-body">
                ¡La acción fue completada con éxito!
              </div>
            </div>
          </div>
        </div>

        <div id="modalError" class="modal fade bs-example-modal-lg">
          <div class="modal-dialog modal-lg">
            <div class="modal-content" style="background-color: #f2dede">
              <div class="modal-header">
                <button style="color:red" type="button" class="close" data-dismiss="modal" aria-label="Close"><span>×</span></button>
                <h4 style="color:black" class="modal-title" id="mySmallModalLabel2">Ups!<a class="anchorjs-link" href="#myLargeModalLabel"><span class="anchorjs-icon"></span></a></h4>
              </div>
              <div style="color:black" class="modal-body" id="mensajeError">
              </div>
            </div>
          </div>
        </div>
      
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->
    <script type="text/javascript" src="../admin/js/menubanneadosEncargado.js"></script>
  </body>
</html>