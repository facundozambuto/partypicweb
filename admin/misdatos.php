<?php
    session_start();
    if($_SESSION["usuarioLogueado"] == null)
    {
         header("Location:http://www.partypicok.com/index.php");
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
    <link rel="stylesheet" type="text/css" href="../admin/css/misdatos.css" />
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
    <script type="text/javascript" src="../admin/js/misdatos.js"></script>
      
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
              <a href="../admin/misdatos.php" class="btn btn-primary">Mis Datos</a>
            </div>
          </div>
        </div>
        
        <!--<div class="col-md-offset-5" id="loadingDivPadre" style="display:none">
            <div class="loadingDiv" id="loadingDiv"></div>
        </div>-->
        
        <div class="animationload" id="loadingDivPadre" sytle="display:none">
       	   <img src="../images/animacionLogo.gif" style="margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;" alt="partypic"/>
      	</div>
        
        <div class="container" id="contenidoMisDatos">        
		<div class="col-md-12 col-lg-12">
			<div class="col-lg-6 col-lg-offset-3">
			 <div class="well bs-component">
				<div id="source-button" class="btn btn-primary btn-xs pull-right" style="display: inline-block;"><span class="glyphicon glyphicon-pencil"></span></div>
				<form class="form-horizontal required" action="UpdateByUser.php" method="post" name="actualizarUserForm" id="actualizarUserForm">
				  <fieldset>
					<legend>Mis datos</legend>
					<div class="form-group">
					  <label for="email" class="col-lg-2 control-label">Email</label>
					  <div class="col-lg-10">
						<input id="email" type="text" class="form-control" name="email" placeholder="Email" disabled="disabled">
					  </div>
					</div>
					<div class="form-group">
					  <label for="contrasenia" class="col-lg-2 control-label">Contraseña</label>
					  <div class="col-lg-10">
						<a href="#" class="btn btn-link" id="btnCambiar">Cambiar</a>
					  </div>
					</div>
					<div class="form-group">
					  <label for="nombre_usuario" class="col-lg-2 control-label">Nombre</label>
					  <div class="col-lg-10">
						<input id="nombre_usuario" type="text" class="form-control" name="nombre_usuario" placeholder="Nombre" disabled="disabled">
					  </div>
					</div>
					<div class="form-group">
					  <label for="domicilio_usuario" class="col-lg-2 control-label">Domicilio</label>
					  <div class="col-lg-10">
						<input id="domicilio_usuario" type="text" class="form-control" name="domicilio_usuario" placeholder="Domicilio" disabled="disabled">
					  </div>
					</div>
					<div class="form-group">
					  <label for="telefono_usuario" class="col-lg-2 control-label">Teléfono</label>
					  <div class="col-lg-10">
						<input id="telefono_usuario" type="text" class="form-control" name="telefono_usuario" placeholder="Teléfono" disabled="disabled">
					  </div>
					</div>
					<div class="form-group">
					  <label for="celular_usuario" class="col-lg-2 control-label">Celular</label>
					  <div class="col-lg-10">
						<input id="celular_usuario" type="text" class="form-control" name="celular_usuario" placeholder="Celular" disabled="disabled">
					  </div>
					</div>
					<div class="form-group">
					  <label for="cuil_usuario" class="col-lg-2 control-label">CUIL</label>
					  <div class="col-lg-10">
						<input id="cuil_usuario" type="text" class="form-control" name="cuil_usuario" placeholder="CUIL" disabled="disabled">
					  </div>
					</div>
					<div class="form-group">
					  <div class="col-lg-10 col-lg-offset-2">
						<button type="submit" id="btnSave" class="btn btn-primary" disabled="disabled">Guardar</button>
					  </div>
					</div>
					<div id="errors" class="form-group"></div>    
				  </fieldset>
				</form>
			  </div>	
			</div>
		 </div>
	</div>
	<div class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel" id="modalContrasenia" aria-hidden="true" tabindex="-1">
  	<div class="modal-dialog" role="document">
			<div class="modal-content" style="width:680px">
		  	<form class="form-horizontal required" action="UpdateUserPassword.php" method="post" name="changePasswordForm" id="changePasswordForm">
				  <div class="modal-header">
						<h4 class="modal-title" id="gridSystemModalLabel">Cambiar contraseña</h4>
				  </div>
			  	<div class="modal-body">
						<div class="container-fluid">
					  	<div class="row">      
								<div class="col-lg-12">
									<div class="form-group">
									  <label for="oldpassword" class="col-lg-3 control-label">Contraseña</label>
									  <div class="col-lg-7">
										<input type="password" id="oldpassword" class="form-control" name="oldpassword" placeholder="Contraseña Actual">
									  </div>
									</div>
									<div class="form-group" id="divPassword">
									  <label for="password" class="col-lg-3 control-label">Nueva Contraseña</label>
									  <div class="col-lg-7">
										<input type="password" id="password" class="form-control password" name="password" placeholder="Nueva Contraseña">
										<div class="pwstrength_viewport_progress"></div>
									  </div>
									</div>
									<div class="form-group" id="divNewpassword2">
									  <label for="newpassword2" class="col-lg-3 control-label">Confirmac.</label>
									  <div class="col-lg-7">
										<input type="password" id="newpassword2" class="form-control" name="newpassword2" placeholder="Confirmar Nueva Contraseña">
									  </div>
									</div>			
							    <div id="errors2" class="form-group"></div>    
  	</div>								   
					 	 	</div>                  
						</div>
				  </div>
				  <div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
						<button type="submit" class="btn btn-primary">Guardar</button>
				  </div>
				</form>
			</div><!-- /.modal-content -->
  	</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
			
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
  </body>
</html>