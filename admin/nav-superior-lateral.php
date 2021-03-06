<nav class="navbar navbar-default navbar-fixed-top text-center" style="height: 50px; background-color: #1A1A1A">
  <div class="container-fluid"   style="background-color:white">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="hamburger is-closed" data-toggle="offcanvas">
        <span style="background-color:white" class="hamb-top"></span>
        <span style="background-color:white" class="hamb-middle"></span>
        <span style="background-color:white" class="hamb-bottom"></span>
      </button>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
  <div style="margin:0 auto; color:white; display:inline-block; width:20%; margin-top:5px">
	<img src="../images/favicon.png" class="img-responsive" style="margin:0 auto; width:10%; display: inline-block;">
  	<img src="../images/logotipoGrisNav.png" class="img-responsive" style="margin:0 auto; display: inline-block;">
  </div>
  <ul class="nav navbar-nav navbar-right" style="margin-right: 15px;">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-user"></span> 
                        <strong><?php echo $_SESSION["nombre"]?></strong>
                        <span class="glyphicon glyphicon-chevron-down"></span>
                    </a>
                    <ul class="dropdown-menu" style="margin-top: 5px;">
                        <li>
                            <div class="navbar-login">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <p class="text-center">
                                            <span class="glyphicon glyphicon-user icon-size"></span>
                                        </p>
                                    </div>
                                    <div class="col-lg-8">
                                        <p class="text-left"><strong><?php echo $_SESSION["nombre"]?></strong></p>
                                        <p class="text-left small"><?php echo $_SESSION["usuario"]?></p>
                                        <p class="text-left small">[<?php echo $_SESSION["rol"]?>]</p>
                                        <p class="text-left">
                                            <a href="../admin/misdatos.php" class="btn btn-primary btn-block btn-sm">Actualizar Datos</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <div class="navbar-login navbar-login-session">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <p>
                                            <a href="../endpoints/CerrarSesion.php" class="btn btn-danger btn-block btn-cerrar-sesion">Salir <span class="pull-right hidden-xs showopacity glyphicon glyphicon-log-out"></span></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
</nav>
<div id="wrapper">
<div class="overlay"></div>
<!-- Sidebar -->
<nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper">
  <ul class="nav sidebar-nav">
    <li class="sidebar-brand" style="line-height: 20px;">
	<span style="margin-left:1.5em; color:white"><?php echo $_SESSION["nombre"]?></span>
	<span style="margin-left:4.5em; font-size:14px; color:white">[<?php echo $_SESSION["rol"]?>]</span>
    </li>
    <li>
	   <?php
	   
	    if ($_SESSION["rol"] == "administrador") {
	    	echo '<a href="../admin/dashboard.php">Inicio <span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></a>';
     		}
     		else {
     			echo '<a href="../admin/dashboardEncargado.php">Inicio <span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></a>';
     		}?>	
    </li>
    <li>
    <?php if ($_SESSION["rol"] == "administrador") {
        echo  '<a href="../admin/menueventos.php">Menú Eventos <span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-calendar"></span></a>';
        }
        else {
          echo '<a href="../admin/menueventosEncargado.php">Menú Eventos <span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-calendar"></span></a>';
        }?>
      
    </li>
    <?php if ($_SESSION["rol"] == "administrador") {
      echo '<li>
        <a href="../admin/menusalones.php">Menú Salones <span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-modal-window"></span></a>
      </li>
      <li>
        <a href="../admin/menuusuarios.php">Menú Usuarios <span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon glyphicon-user"></span></a>
      </li>
      <li>
        <a href="../admin/menubanneados.php">Menú Banneados <span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon glyphicon-ban-circle"></span></a>
      </li>';
      }?>
      <?php if ($_SESSION["rol"] == "encargado_salon") {
      echo '<li>
        <a href="../admin/menubanneadosEncargado.php">Menú Bloqueados<span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon glyphicon-ban-circle"></span></a>
      </li>';
      }?>
    <li>
      <a href="../admin/misdatos.php">Mi Perfil<span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-align-justify"></span></a>
    </li>
    <li>
      <a href="../endpoints/CerrarSesion.php">Salir <span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-log-out"></span></a>
    </li>
    
  </ul>
</nav>