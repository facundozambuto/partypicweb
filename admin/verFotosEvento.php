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
            
       }
       else
       {
          header("Location:http://www.partypicok.com/admin/dashboardEncargado.php");
       }
    }
?>
<!DOCTYPE html>

<html class="no-js" lang="es"><!--<![endif]-->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <title>Party Pic App - Menú de Eventos</title>
    <link rel="shortcut icon" href="../images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/style_menu.css"/>
    <link rel="stylesheet" type="text/css" href="../css/jquery.bootgrid.min.css" />
    <link rel="stylesheet" type="text/css" href="../admin/css/verFotosEvento.css" />
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
				<a href="../admin/menueventos.php" class="btn btn-primary">Imágenes de Evento</a>
				<!--<a href="#" class="btn btn-primary">Primary</a>-->
			  </div>
			  <a id="btnDescargaAlbum" href="http://www.partypicok.com/imagenes_eventos/DescargarAlbum.php" target="_blank" class="btn btn-md btn-primary pull-right"><span class="fa fa-download"></span> Descargar álbum</a>
			</div>
		</div>
		
	    <!--<div style="margin-left: auto; margin-right: auto; display: none" class="text-center" id="loading">
           		<img alt="cargando" src="../images/ajax-loader.gif">
             	</div>-->
	    	<div class="animationload" id="loadingDivPadre">
	       	   <img src="../images/animacionLogo.gif" style="margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;" alt="partypic"/>
	        </div>
		<h2 class="text-center" id="nombreEvento" style="display:none"></h2>
		<div id="contenedor-imagenes" class="container container-ppal-2" style="display:none">
		  
		  
		</div>
       		<div class="container text-center" id="contenedor-error" style="display:none" >
	       		<div class="alert alert-dismissible alert-warning">
			  <h4>Evento sin imágenes</h4>
			  <p>Al parecer no se han subido imágenes aún. Por favor, esperá y volvé a intentar nuevamente en unos minutos.</p>
			</div>
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
		
		<!-- Modal -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
			  <div class="modal-content">
				<div class="modal-header">
				  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				  <div class="row">				  
					  <nav id="navGaleria">
					  </nav>
					  <div class="col-lg-12">
					        <div class="media">
					            <div class="media-body-custom">
					                <h4 class="media-heading" id="nombreUsuario"></h4>
					                <hr style="margin:8px auto">
					            </div>
								<a class="pull-right img-profile" href="#">
					                <img id="imagenUsuario" class="media-object dp img-circle" onerror="if (this.src != '../images/mobile-user.png') this.src = '../images/mobile-user.png';" src="" style="width: 100px;height:100px;">
					            </a>
					      	</div>
					  </div>
				  </div>
				</div>
				<div class="modal-body clearfix">
				   <h4 class='modal-image-caption'></h4>
				   <img id="modal-image" class="img-responsive" src=""><br/>
				</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal-dialog -->
		</div><!-- /.modal -->

		<div id="modalEliminar" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="mySmallModalLabel">Eliminar Imagen</h4>
              </div>
              <div class="modal-body">
                &iquest;Estás seguro que deseás eliminar la imagen?
              </div>
              <div class="modal-footer">
                <button id="btnCancelDelete" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button id="btnConfirmDelete" type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div>
		
		<div id="modalBloquear" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="mySmallModalLabel">Eliminar Imagen y bloquear Usuario</h4>
              </div>
              <div class="modal-body">
                &iquest;Estás seguro que deseás eliminar la imagen y bloquear al usuario que subió la misma?
              </div>
              <div class="modal-footer">
                <button id="btnCancelDeleteBlock" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button id="btnConfirmDeleteBlock" type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div>
      
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->
    <script type="text/javascript" src="../admin/js/verFotosEvento.js"></script>
	<script type="text/javascript" src="../admin/js/navegacionGaleria.js"></script>
  </body>
</html>