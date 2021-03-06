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
    <title>Party Pic App - Menú de Eventos</title>
    <link rel="shortcut icon" href="../images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/style_menu.css"/>
    <link rel="stylesheet" type="text/css" href="../css/jquery.bootgrid.min.css" />
    <link rel="stylesheet" type="text/css" href="../admin/css/menueventos.css" />
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
            <a href="../admin/menueventos.php" class="btn btn-primary">Menú Eventos</a>
            <!--<a href="#" class="btn btn-primary">Primary</a>-->
          </div>
        </div>
      </div>
      
      <div class="animationload" id="loadingDivPadre">
       	   <img src="../images/animacionLogo.gif" style="margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;" alt="partypic"/>
      </div>
      
      <div class="container container-ppal-2">
        <table id="grid-command-buttons" class="table table-condensed table-hover table-striped" data-toggle="bootgrid" data-ajax="true" data-url="../endpoints/BackMenuEventos.php">
          <thead style="border: 2px solid black;">
            <tr>
              <th data-column-id="id_evento" data-formatter="IDColumn" data-type="numeric" data-header-css-class="IDColumn" data-identifier="true" data-sortable="true">ID</th>
              <th data-column-id="codigo" data-formatter="CodigoColumn" data-header-css-class="CodigoColumn" data-sortable="true">Código</th>
              <th data-column-id="nombre_evento" data-formatter="NombreEventoColumn" data-header-css-class="NombreEventoColumn" data-sortable="true">Nombre</th>
              <th data-column-id="descripcion" data-formatter="DescripcionColumn" data-header-css-class="DescripcionColumn" data-identifier="true" data-sortable="true">Descripción</th>
              <th data-column-id="fecha" data-formatter="FechaColumn" data-header-css-class="FechaColumn" data-sortable="true">Fecha</th>
              <th data-column-id="nombre_salon" data-formatter="NombreSalonColumn" data-header-css-class="NombreSalonColumn" data-sortable="true">Salón</th>
              <th data-column-id="codigo_qr" data-formatter="CodigoQRColumn" data-header-css-class="CodigoQRColumn" data-sortable="true">Código QR</th>
              <th data-column-id="habilitado" data-formatter="HabilitadoColumn" data-header-css-class="HabilitadoColumn" data-sortable="true">Estado</th>
              <th data-column-id="ver_fotos" data-formatter="VerFotosColumn" data-header-css-class="VerFotosColumn" data-sortable="true">Ver Imágenes</th>
              <th data-column-id="commands" data-formatter="commands" data-header-css-class="CommandColumn" data-sortable="false">Opciones</th>
            </tr>
          </thead>
        </table>
       </div>
       
       <div class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel3" id="modalEditar" aria-hidden="true" tabindex="-1">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <form class="form-horizontal required" action="../endpoints/UpdateEvento.php" method="post" name="editForm" id="editForm">
                <div class="modal-header">
                  <h4 class="modal-title" id="gridSystemModalLabel3">Editar Evento</h4>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-xs-12 col-md-12 col-lg-12" style="margin-bottom:20px">    
                        <div class="form-group mb-7px">
                          <label for="id_evento" class="required col-md-3 control-label">ID</label>
                          <div class="col-md-3">
                              <input id="id_evento" disabled="disabled" type="text" class="form-control text-center"  name="id_evento" placeholder="ID">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="codigo" class="col-md-3 control-label">Código</label>
                          <div class="col-md-9">
                              <input id="codigo" disabled="disabled" type="text" class="form-control" name="codigo" placeholder="Código">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="nombre_evento" class="col-md-3 control-label">Nombre Evento</label>
                          <div class="col-md-9">
                              <input id="nombre_evento" type="text" class="form-control" name="nombre_evento" placeholder="Nombre del Evento">
                          </div>
                        </div>      
                        <div class="form-group mb-7px">
                          <label for="descripcion" class="required col-md-3 control-label">Descripción</label>
                          <div class="col-md-9">
                              <input id="descripcion" type="text" class="form-control"  name="descripcion" placeholder="Descripción">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="fecha" class="col-md-3 control-label">Fecha</label>
                          <div class="col-md-9">
                              <input id="fecha" type="text" class="form-control some_class" name="fecha" placeholder="Fecha" disabled="disabled">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="id_salon" class="col-md-3 control-label">Salón</label>
                          <div class="col-md-6">
                            <select id="id_salon" class="form-control" name="id_salon">
                            </select>
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="habilitado" class="col-md-3 control-label">Estado</label>
                          <div class="col-md-4">
                            <select id="habilitado" class="form-control" name="habilitado" disabled="disabled">
                              <option value="1">Habilitado</option>
                              <option value="0">No Habilitado</option>
                            </select>
                          </div>
                        </div>    
                        <div class="form-group mb-7px">
                          <label for="codigo_qr" class="col-md-3 control-label">Código QR</label>
                          <div class="col-md-9">
                              <img id="codigo_qr" src="" class="" name="codigo_qr" placeholder="Código QR">
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
                <h4 class="modal-title" id="mySmallModalLabel">Eliminar Evento</h4>
              </div>
              <div class="modal-body">
                &iquest;Estás seguro que deseás eliminar el Evento seleccionado?
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
              <form class="form-horizontal required" action="../endpoints/AgregarEvento.php" method="post" name="addForm" id="addForm">
                <div class="modal-header">
                  <h4 class="modal-title" id="gridSystemModalLabel2">Agregar Evento</h4>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                	<div class="row">
                      <div class="col-xs-12 col-md-12 col-lg-12"  style="margin-bottom:20px"> 
                        <div class="form-group mb-7px">
                          <label for="nombre_evento2" class="col-md-3 control-label">Nombre Evento</label>
                          <div class="col-md-9">
                              <input id="nombre_evento2" type="text" class="form-control" name="nombre_evento2" placeholder="Nombre del Evento">
                          </div>
                        </div>      
                        <div class="form-group mb-7px">
                          <label for="descripcion2" class="required col-md-3 control-label">Descripción</label>
                          <div class="col-md-9">
                              <input id="descripcion2" type="text" class="form-control"  name="descripcion2" placeholder="Descripción">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="fecha2" class="col-md-3 control-label">Fecha</label>
                          <div class="col-md-9">
                              <input id="fecha2" type="text" class="form-control some_class2" name="fecha2" placeholder="Fecha">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="id_salon2" class="col-md-3 control-label">Salón</label>
                          <div class="col-md-6">
                            <select id="id_salon2" class="form-control" name="id_salon2">
                            </select>
                          </div>
                        </div> 
                        <!--<div class="form-group mb-7px">
                          <label for="habilitado2" class="col-md-3 control-label">Estado</label>
                          <div class="col-md-4">
                            <select id="habilitado2" class="form-control" name="habilitado2">
                              <option value="1">Habilitado</option>
                              <option value="0">No Habilitado</option>
                            </select>
                          </div>
                        </div>-->
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

        <div class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel2" id="modalSalon" aria-hidden="true" tabindex="-1">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
	            <div class="modal-header">
	              <h4 class="modal-title" id="gridSystemModalLabel2">Salón del Evento</h4>
	            </div>
	            <div class="modal-body">
	              <div class="container-fluid">
	            	<div class="row">
	                  <div class="col-xs-12 col-md-12 col-lg-12"  style="margin-bottom:20px"> 
	                    <div class="col-md-offset-1 col-lg-offset-1 col-md-10 col-lg-10"> 
			              <table class="table table-user-information">
			                <tbody>
			                  <tr>
			                    <td>ID Salón:</td>
			                    <td id="id_salon3"></td>
			                  </tr>
			                  <tr>
			                    <td>Salón</td>
			                    <td id="nombre_salon"></td>
			                  </tr>
			                  <tr>
			                    <td>Dirección</td>
			                    <td id="domicilio_salon"></td>
			                  </tr>
			                  <tr>
			                    <td>Teléfono Salón</td>
			                    <td id="telefono_salon"></td>
			                  </tr>
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

        <div id="modalEnviar" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="mySmallModalLabel">Reenviar E-mail</h4>
              </div>
              <div class="modal-body">
                Se reenviará al encargado del salón un correo con las instrucciones para el uso de la aplicación. &iquest;Estás seguro?
              </div>
              <div class="modal-footer">
                <button id="btnCancelSend" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button id="btnConfirmSend" type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
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
    <script type="text/javascript" src="../admin/js/menueventosEncargado.js"></script>
  </body>
</html>