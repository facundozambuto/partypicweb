<?php
    session_start();
    if($_SESSION["usuarioLogueado"] == null)
    {
         header("Location:http://www.partypicapp.com/index.php");
    }
    else
    {
       if($_SESSION["rol"] == "administrador")
       {
            
       }
       else
       {
          header("Location:http://www.partypicapp.com/admin/dashboardEncargado.php");
       }
    }
?>

<!DOCTYPE html>

<html class="no-js" lang="es"><!--<![endif]-->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <title>Party Pic App - Menú de Usuarios</title>
    <link rel="shortcut icon" href="../images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/style_menu.css"/>
    <link rel="stylesheet" type="text/css" href="../css/jquery.bootgrid.min.css" />
    <link rel="stylesheet" type="text/css" href="../admin/css/menusalones.css" />
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
            <a href="../admin/menuusuarios.php" class="btn btn-primary">Menú Salones</a>
            <!--<a href="#" class="btn btn-primary">Primary</a>-->
          </div>
        </div>
      </div>
      
      <div class="animationload" id="loadingDivPadre">
       	   <img src="../images/animacionLogo.gif" style="margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;" alt="partypic"/>
      </div>
      
      <div class="container container-ppal-2">
        <table id="grid-command-buttons" class="table table-condensed table-hover table-striped" data-toggle="bootgrid" data-ajax="true" data-url="../endpoints/BackMenuUsuarios.php">
          <thead style="border: 2px solid black;">
            <tr>
              <th data-column-id="id_salon" data-formatter="IDColumn" data-type="numeric" data-header-css-class="IDColumn" data-identifier="true" data-sortable="true">ID</th>
              <th data-column-id="nombre_salon" data-formatter="NombreColumn" data-header-css-class="NombreColumn" data-sortable="true">Nombre Salón</th>
              <th data-column-id="domicilio_salon" data-formatter="DomicilioColumn" data-header-css-class="DomicilioColumn" data-sortable="true">Domicilio</th>
              <th data-column-id="telefono_salon" data-formatter="TelefonoColumn" data-header-css-class="TelefonoColumn" data-sortable="true">Teléfono</th>
              <th data-column-id="nombre_usuario" data-formatter="NombreUsuarioColumn" data-header-css-class="NombreUsuarioColumn" data-sortable="true">Encargado</th>
              <th data-column-id="eventos" data-formatter="EventosColumn" data-header-css-class="EventosColumn" data-sortable="true">Ver Eventos</th>
              <th data-column-id="commands" data-formatter="commands" data-header-css-class="CommandColumn" data-sortable="false">Opciones</th>
            </tr>
          </thead>
        </table>
       </div>
       
       <div class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel3" id="modalEditar" aria-hidden="true" tabindex="-1">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <form class="form-horizontal required" action="../endpoints/UpdateSalon.php" method="post" name="editForm" id="editForm">
                <div class="modal-header">
                  <h4 class="modal-title" id="gridSystemModalLabel3">Editar Salón</h4>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-xs-12 col-md-12 col-lg-12" style="margin-bottom:20px">    
                        <div class="form-group mb-7px">
                          <label for="id_salon" class="required col-md-3 control-label">ID</label>
                          <div class="col-md-3">
                              <input id="id_salon" disabled="disabled" type="text" class="form-control text-center"  name="id_salon" placeholder="ID">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="nombre_salon" class="col-md-3 control-label">Nombre</label>
                          <div class="col-md-9">
                              <input id="nombre_salon" type="text" class="form-control" name="nombre_salon" placeholder="Nombre del Salón">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="domicilio_salon" class="col-md-3 control-label">Domicilio</label>
                          <div class="col-md-9">
                            <input id="domicilio_salon" type="text" class="form-control" name="domicilio_salon" placeholder="Domicilio">
                          </div>
                        </div>   
                        <div class="form-group mb-7px">
                          <label for="telefono_salon" class="col-md-3 control-label">Teléfono</label>
                          <div class="col-md-6">
                            <input id="telefono_salon" type="text" class="form-control" name="telefono_salon" placeholder="Teléfono">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="id_usuario" class="col-md-3 control-label">Encargado</label>
                          <div class="col-md-6">
                            <select id="id_usuario" class="form-control" name="id_usuario">
                            </select>
                          </div>
                        </div>  
                      </div>    
                      <div id="errors" class="form-group div-errores"></div>             
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

        <div id="modalEliminar" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="mySmallModalLabel">Eliminar Salón</h4>
              </div>
              <div class="modal-body">
                &iquest;Estás seguro que deseás eliminar el salón seleccionado?
              </div>
              <div class="modal-footer">
                <button id="btnCancelDelete" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button id="btnConfirmDelete" type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div>

        <div class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel2" id="modalAgregar" aria-hidden="true" tabindex="-1">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <form class="form-horizontal required" action="../endpoints/AgregarSalon.php" method="post" name="addForm" id="addForm">
                <div class="modal-header">
                  <h4 class="modal-title" id="gridSystemModalLabel2">Agregar Salón</h4>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-xs-12 col-md-12 col-lg-12"  style="margin-bottom:20px"> 
                        <div class="form-group mb-7px">
                          <label for="nombre_salon2" class="col-md-3 control-label">Nombre</label>
                          <div class="col-md-9">
                              <input id="nombre_salon2" type="text" class="form-control" name="nombre_salon2" placeholder="Nombre del Salón">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="domicilio_salon2" class="col-md-3 control-label">Domicilio</label>
                          <div class="col-md-9">
                            <input id="domicilio_salon2" type="text" class="form-control" name="domicilio_salon2" placeholder="Domicilio">
                          </div>
                        </div>   
                        <div class="form-group mb-7px">
                          <label for="telefono_salon2" class="col-md-3 control-label">Teléfono</label>
                          <div class="col-md-6">
                            <input id="telefono_salon2" type="text" class="form-control" name="telefono_salon2" placeholder="Teléfono">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="id_usuario2" class="col-md-3 control-label">Encargado</label>
                          <div class="col-md-6">
                            <select id="id_usuario2" class="form-control" name="id_usuario2">
                            </select>
                          </div>
                        </div> 
                        <div id="errors2" class="form-group div-errores"></div>               
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
        
        <div class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel2" id="modalEncargado" aria-hidden="true" tabindex="-1">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	        <div class="modal-header">
	          <h4 class="modal-title" id="gridSystemModalLabel2">Encargado del Salón</h4>
	        </div>
	        <div class="modal-body">
	          <div class="container-fluid">
	            <div class="row">
	              <div class="col-xs-12 col-md-12 col-lg-12"  style="margin-bottom:20px"> 
	                <div class="col-md-offset-1 col-lg-offset-1 col-md-10 col-lg-10"> 
	                  <table class="table table-user-information">
	                    <tbody>
	                      <tr>
	                        <td>Encargado/a</td>
	                        <td id="nombre_usuario"></td>
	                      </tr>
	                      <tr>
	                        <td>E-mail</td>
	                        <td><a id="email" href=""></a></td>
	                      </tr>
	                      <tr>
	                        <td>Celular</td>
	                        <td id="celular_usuario"></td>
	                      </tr>
	                      <tr>
	                        <td>Teléfono</td>
	                        <td id="telefono_usuario"></td>
	                      </tr>
	                      <tr>
	                        <td>Domicilio</td>
	                        <td id="domicilio_usuario"></td>
	                      </tr>
	                      <tr>
	                        <td>CUIL</td>
	                        <td id="cuil_usuario"></td>
	                      </tr>
	
	                    </tbody>
	                  </table>
	          
	                  <a href="../admin/menuusuarios.php" class="btn btn-primary">Editar / Ver Encargados</a>
	                </div>         
	                  </div>                  
	            </div>
	          </div>
	        </div>  
	        <div class="modal-footer">
	          <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
	        </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
      
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->
    <script type="text/javascript" src="../admin/js/menusalones.js"></script>
  </body>
</html>