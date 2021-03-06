<?php
    session_start();
    if($_SESSION["usuarioLogueado"] != null)
    {
      if($_SESSION["rol"] == "administrador")
        {
            header("Location:http://www.partypicok.com/admin/dashboard.php");
        }
    }
    else
    {
       
    }
?>

<!DOCTYPE html>

<html class="no-js" lang="es"><!--<![endif]-->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <title>Party Pic App - Iniciar Sesión</title>
    <link rel="shortcut icon" href="../images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Oswald">
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../css/styleLogin.css">
    <link rel="stylesheet" href="../css/animate.min.css" />
    <link rel="stylesheet" href="../css/gorilla.css" />
    
    <script src="../js/jquery-3.2.1.min.js"></script>
    <script src="../js/angular.min.js"></script>
    <script type="text/javascript" src="../js/bootstrap.min.js"></script>   
    <script type="text/javascript" src="../js/jquery.validate.min.js"></script>
    <script src="../js/gorilla.js"></script>
  </head>
  
  <body>
    <div ng-app="myApp" ng-controller="MainCtrl" class="text-center banner-two overlay-fader" style="height:100%">
      <div class="animate-cloud"></div>
      <div class="animationload" ng-if="loadingGif">
        <img src="../images/animacionLogo.gif" style="margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;" alt="partypic"/>
      </div>
      <div class="container" ng-if="!loadingGif">
        <div style="margin:0 auto; color:white; display:inline-block; margin-top:8em; opacity: 0.99;">
		<img src="../images/favicon.png" class="img-responsive" style="margin:0 auto; width:10%; display: inline-block; opactity:0.99">
	  	<img src="../images/logotipoGrisNav.png" class="img-responsive" style="margin:0 auto; display: inline-block; opactity:0.99">
	</div>
        <div id="flip" ng-if="showLoginError === false && showRecoveryMessage === false" style="margin-top:4em">
          <div class="front">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-info">
                  <div class="panel-heading">
                    <h3 class="panel-title">Iniciar Sesión</h3>
                  </div>
                  <div class="panel-body">
                    <form role="form" ng-submit="iniciarSesion(loginEmail, loginPassword)">
                      <fieldset>
                          <div class="form-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input class="form-control text-center" ng-model="loginEmail" placeholder="Ingresá tu email" name="email" type="email" autofocus="" required>
                          </div>
                          <div class="form-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input class="form-control text-center" ng-model="loginPassword" placeholder="Ingresá la contraseña" name="password" type="password" autofocus="" required>
                          </div>
                         <!-- Change this to a button or input when using this as a form -->
                        <input class="btn btn-sm btn-success" type="submit" value="Ingresar">
                        <div class="form-group" style="margin-top:2em">
                        <div class="col-md-12 control">
                            <div style="border-top: 1px solid#888; padding-top:9px; font-size:85%">
                                ¿Te olvidaste la contraseña?
                            <a href="#" onclick="$('.front').hide(500); $('.back').show(500);">
                                Clickeá para recuperarla.
                            </a>
                            </div>
                        </div>
                       </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
            </div>
          </div>
          <div class="back" style="display:none">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-info">
                  <div class="panel-heading">
                    <h3 class="panel-title">Recuperar Contraseña</h3>
                  </div>
                  <div class="panel-body">
                    <form role="form" ng-submit="recuperarPassword(recoveryEmail)">
                      <fieldset>
                          <div class="form-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input class="form-control text-center" ng-model="recoveryEmail" placeholder="Ingresá tu email para recuperar la contraseña" name="email" type="email" autofocus="" required>
                          </div>
                         <!-- Change this to a button or input when using this as a form -->
                        <input class="btn btn-sm btn-success" type="submit" value="Recuperar">
                        <div class="form-group" style="margin-top:2em">
                        <div class="col-md-12 control">
                            <div style="border-top: 1px solid#888; padding-top:9px; font-size:85%">
                            <a href="#" onclick="$('.back').hide(500); $('.front').show(500);">
                                Volver
                            </a>
                            </div>
                        </div>
                       </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
            </div>
          </div>
          
        </div>
       
        <div class="alert alert-dismissible alert-danger" ng-if="showLoginError"  style="margin-top:4em; opacity:0.99">
          <h4>Ups!</h4>
          <p>Los datos proporcionados no son correctos. Intentá de nuevo o comunicate con el administrador.</p>
          <br/>
          <input value="Intentar de nuevo" class="btn btn-sm btn-danger" type="button" ng-click="goBack();"/>
        </div>
        
        <div class="alert alert-dismissible alert-success" ng-if="showRecoveryMessage"  style="margin-top:4em; opacity:0.99">
          <h4>Recuperación de contraseña en proceso</h4>
          <p>Enviamos a tu correo un email con tus credenciales para que puedas iniciar sesión. Si el email no aparece en la bandeja de entrada, recomendamos revisar la carpeta "Spam".</p>
          <br/>
          <input value="Volver" class="btn btn-sm btn-default" type="button" ng-click="goBack();"/>
        </div>
        
      </div>
       <a href="../index.php" style="opacity: 0.99">
               Volver a la página principal
        </a>
    </div>
     
    <script src="../js/app.js"></script>
    <script src="../js/insuranceService.js"></script>
    <script src="https://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.14.3.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-aria.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-messages.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.js"></script>
    <script src="https://angular-data-grid.github.io/dist/pagination.js"></script>
    <script src="https://angular-data-grid.github.io/dist/JSONToCSVConvertor.js"></script>
    <script src="https://angular-data-grid.github.io/dist/dataGrid.js"></script>
  </body>
</html>