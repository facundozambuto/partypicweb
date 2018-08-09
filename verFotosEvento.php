<?php
    session_start();
    if($_SESSION["usuarioInvitado"] == null)
    {
         header("Location:http://www.partypicok.com/index.php");
    }
    else
    {
       if($_SESSION["id_evento"] == $_GET['id_evento'])
       {
            
       }
       else
       {
          header("Location:http://www.partypicok.com/index.php");
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
    <!-- Page Content -->
    <div id="page-content-wrapper" style="padding-top:40px">
		<div class="container container-ppal" style="margin-top:40px; margin-bottom:40px">
			<div class="row">
			  <a id="btnDescargaAlbum" href="http://www.partypicok.com/imagenes_eventos/DescargarAlbum.php" target="_blank" class="btn btn-md btn-primary pull-right"><span class="fa fa-download"></span> Descargar álbum</a>
			</div>
		</div>
		
		<div style="margin-left: auto; margin-right: auto; display: none" class="text-center" id="loading">
	        <img alt="cargando" src="../images/ajax-loader.gif">
	    </div>
		<h2 class="text-center" id="nombreEvento" style="display:none"></h2>
		<div id="contenedor-imagenes" class="container container-ppal-2" style="display:none">
		  
		  
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

      
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->
    <script type="text/javascript" src="../admin/js/verFotosEvento.js"></script>
	<script type="text/javascript" src="../js/navegacionGaleria.js"></script>
  </body>
</html>