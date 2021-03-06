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
    <title>Party Pic App - Menú de Usuarios</title>
    <link rel="shortcut icon" href="../images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/style_menu.css"/>
    <link rel="stylesheet" type="text/css" href="../css/jquery.bootgrid.min.css" />
    <link rel="stylesheet" type="text/css" href="../admin/css/menuusuarios.css" />
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
            <a href="../admin/menuusuarios.php" class="btn btn-primary">Menú Usuarios</a>
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
              <th data-column-id="id_usuario" data-formatter="IDColumn" data-type="numeric" data-header-css-class="IDColumn" data-identifier="true" data-sortable="true">ID</th>
              <th data-column-id="nombre_usuario" data-formatter="NombreColumn" data-header-css-class="NombreColumn" data-sortable="true">Nombre</th>
              <th data-column-id="rol" data-formatter="RolColumn" data-header-css-class="RolColumn" data-sortable="true">Rol</th>
              <th data-column-id="activo" data-formatter="ActivoColumn" data-header-css-class="ActivoColumn" data-identifier="true" data-sortable="true">Activo</th>
              <th data-column-id="fecha_alta" data-formatter="FechaColumn" data-header-css-class="FechaColumn" data-sortable="true">Fecha de Alta</th>
              <th data-column-id="email" data-formatter="EmailColumn" data-header-css-class="EmailColumn" data-sortable="true">Email</th>
              <th data-column-id="contrasenia" data-formatter="ContraseniaColumn" data-header-css-class="ContraseniaColumn" data-sortable="true">Contraseña</th>
              <th data-column-id="domicilio_usuario" data-formatter="DomicilioColumn" data-header-css-class="DomicilioColumn" data-sortable="true">Domicilio</th>
              <th data-column-id="telefono_usuario" data-formatter="TelefonoColumn" data-header-css-class="TelefonoColumn" data-sortable="true">Teléfono</th>
              <th data-column-id="celular_usuario" data-formatter="CelularColumn" data-header-css-class="CelularColumn" data-sortable="true">Celular</th>
              <th data-column-id="cuil_usuario" data-formatter="CuilColumn" data-header-css-class="CuilColumn" data-sortable="true">CUIL</th>
              <th data-column-id="commands" data-formatter="commands" data-header-css-class="CommandColumn" data-sortable="false">Opciones</th>
            </tr>
          </thead>
        </table>
       </div>
       
       <div class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel3" id="modalEditar" aria-hidden="true" tabindex="-1">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <form class="form-horizontal required" action="../endpoints/UpdateUsuario.php" method="post" name="editForm" id="editForm">
                <div class="modal-header">
                  <h4 class="modal-title" id="gridSystemModalLabel3">Editar Usuario</h4>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-xs-12 col-md-12 col-lg-12" style="margin-bottom:20px">    
                        <div class="form-group mb-7px">
                          <label for="id_usuario" class="required col-md-3 control-label">ID</label>
                          <div class="col-md-3">
                              <input id="id_usuario" disabled="disabled" type="text" class="form-control text-center"  name="id_usuario" placeholder="ID">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="nombre_usuario" class="col-md-3 control-label">Nombre</label>
                          <div class="col-md-9">
                              <input id="nombre_usuario" type="text" class="form-control" name="nombre_usuario" placeholder="Nombre">
                          </div>
                        </div>      
                        <div class="form-group mb-7px">
                          <label for="rol" class="col-md-3 control-label">Rol</label>
                          <div class="col-md-5">
                            <select id="rol" class="form-control" name="rol">
                              <option value="administrador">Administrador</option>
                              <option value="encargado_salon">Encargado de Salón</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="rol" class="col-md-3 control-label">Estado</label>
                          <div class="col-md-4">
                            <select id="activo" class="form-control" name="activo">
                              <option value="1">Activo</option>
                              <option value="0">Inactivo</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="fecha_alta" class="col-md-3 control-label">Fecha de Alta</label>
                          <div class="col-md-4">
                              <input id="fecha_alta" disabled="disabled" type="text" class="form-control" name="fecha_alta" placeholder="Fecha de Alta">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="email" class="col-md-3 control-label">Email</label>
                          <div class="col-md-9">
                              <input id="email" type="text" class="form-control" name="email" placeholder="Email">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="contrasenia" class="col-md-3 control-label">Contraseña</label>
                          <div class="col-md-9">
                            <input id="contrasenia" type="text" class="form-control password" name="contrasenia" placeholder="Contraseña">
                            <div class="pwstrength_viewport_progress"></div>
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="domicilio_usuario" class="col-md-3 control-label">Domicilio</label>
                          <div class="col-md-9">
                            <input id="domicilio_usuario" type="text" class="form-control" name="domicilio_usuario" placeholder="Domicilio">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="telefono_usuario" class="col-md-3 control-label">Teléfono</label>
                          <div class="col-md-6">
                            <input id="telefono_usuario" type="text" class="form-control" name="telefono_usuario" placeholder="Teléfono">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="celular_usuario" class="col-md-3 control-label">Celular</label>
                          <div class="col-md-6">
                            <input id="celular_usuario" type="text" class="form-control" name="celular_usuario" placeholder="Celular">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="cuil_usuario" class="col-md-3 control-label">CUIL</label>
                          <div class="col-md-6">
                            <input id="cuil_usuario" type="text" class="form-control" name="cuil_usuario" placeholder="CUIL">
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
                <h4 class="modal-title" id="mySmallModalLabel">Eliminar Usuario</h4>
              </div>
              <div class="modal-body">
                &iquest;Estás seguro que deseás eliminar el usuario seleccionado?
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
              <form class="form-horizontal required" action="../endpoints/AgregarUsuario.php" method="post" name="addForm" id="addForm">
                <div class="modal-header">
                  <h4 class="modal-title" id="gridSystemModalLabel2">Agregar Usuario</h4>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-xs-12 col-md-12 col-lg-12"  style="margin-bottom:20px"> 
                        <div class="form-group mb-7px">
                          <label for="nombre_usuario2" class="col-md-3 control-label">Nombre</label>
                          <div class="col-md-9">
                              <input id="nombre_usuario2" type="text" class="form-control" name="nombre_usuario2" placeholder="Nombre">
                          </div>
                        </div>      
                        <div class="form-group mb-7px">
                          <label for="rol" class="col-md-3 control-label">Rol</label>
                          <div class="col-md-5">
                            <select id="rol2" class="form-control" name="rol2">
                              <option value="administrador">Administrador</option>
                              <option value="encargado_salon">Encargado de Salón</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="rol" class="col-md-3 control-label">Estado</label>
                          <div class="col-md-4">
                            <select id="activo2" class="form-control" name="activo2">
                              <option value="1">Activo</option>
                              <option value="0">Inactivo</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="email2" class="col-md-3 control-label">Email</label>
                          <div class="col-md-9">
                              <input id="email2" type="text" class="form-control" name="email2" placeholder="Email">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="contrasenia2" class="col-md-3 control-label">Contraseña</label>
                          <div class="col-md-9">
                            <input id="contrasenia2" type="text" class="form-control password" name="contrasenia2" placeholder="Contraseña">
                            <div class="pwstrength_viewport_progress"></div>
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="domicilio_usuario2" class="col-md-3 control-label">Domicilio</label>
                          <div class="col-md-9">
                            <input id="domicilio_usuario2" type="text" class="form-control" name="domicilio_usuario2" placeholder="Domicilio">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="telefono_usuario2" class="col-md-3 control-label">Teléfono</label>
                          <div class="col-md-6">
                            <input id="telefono_usuario2" type="text" class="form-control" name="telefono_usuario2" placeholder="Teléfono">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="celular_usuario2" class="col-md-3 control-label">Celular</label>
                          <div class="col-md-6">
                            <input id="celular_usuario2" type="text" class="form-control" name="celular_usuario2" placeholder="Celular">
                          </div>
                        </div>
                        <div class="form-group mb-7px">
                          <label for="cuil_usuario2" class="col-md-3 control-label">CUIL</label>
                          <div class="col-md-6">
                            <input id="cuil_usuario2" type="text" class="form-control" name="cuil_usuario2" placeholder="CUIL">
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
      
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->
    <script type="text/javascript" src="../admin/js/menuusuarios.js"></script>
  </body>
</html>