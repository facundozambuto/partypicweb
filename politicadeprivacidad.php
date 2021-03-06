<!DOCTYPE html>

<html class="no-js" lang="es"><!--<![endif]-->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <title>Party Pic App - Política de Privacidad</title>
    <link rel="shortcut icon" href="../images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Oswald">
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../css/styleLogin.css">
    
    <script src="../js/jquery-3.2.1.min.js"></script>
    <script src="../js/angular.min.js"></script>
    <script type="text/javascript" src="../js/bootstrap.min.js"></script>   
    <script type="text/javascript" src="../js/jquery.validate.min.js"></script>
  </head>
  
  <body>
    <div ng-app="myApp" ng-controller="MainCtrl" class="text-center">
      <div class="container">
        <h1 style="margin-top:1em;">Party Pic App - Política de Privacidad</h1>
      </div>
      <div class="animationload" ng-if="loadingGif">
        <div class="osahanloading"></div>
      </div>
      <div class="container" ng-if="!loadingGif">
        <div id="flip" ng-if="showLoginError === false && showRecoveryMessage === false" style="margin-top:4em">
          <div class="front">
            <div class="col-md-10 col-md-offset-1">
                <div class="login-panel panel panel-info">
                  <div class="panel-heading">
                    <h3 class="panel-title">Política de Privacidad</h3>
                  </div>
                  <div class="panel-body">
                    <p>El presente Política de Privacidad establece los términos en que FZ Mobile usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.</p><p><strong>Información que es recogida</strong></p><p>Nuestro sitio web y apliacación móvil podrá recoger información personal por ejemplo: Nombre,&nbsp; información de contacto como&nbsp; su dirección de correo electrónica e información demográfica y las fotografías que tome y suba con la cámara del teléfono celular. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.</p><p><strong>Uso de la información recogida</strong></p><p>Nuestro sitio web y aplicación móvil emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios. &nbsp;Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos, actualizaciones y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.</p><p>FZ Mobile está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.</p><p><strong>Cookies</strong></p><p>Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su web.</p><p>Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente, <a href="https://www.partypicok.com" target="_blank">Party Pic</a>. Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.</p><p><strong>Enlaces a Terceros</strong></p><p>Este sitio web pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez que usted de click en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.</p><p><strong>Control de su información personal</strong></p><p>En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web y aplicación móvil.&nbsp; Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, o realizar una autenticación con alguna red social, puede marcar o desmarcar la opción de recibir información por correo electrónico. &nbsp;En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.</p><p>Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.</p><p>FZ Mobile se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.</p>
                  </div>
                </div>
            </div>
          </div>
          
        </div>
        <div class="alert alert-dismissible alert-danger" ng-if="showLoginError"  style="margin-top:4em">
          <h4>Ups!</h4>
          <p>Los datos proporcionados no son correctos. Intentá de nuevo o comunicate con el administrador.</p>
          <br/>
          <input value="Intentar de nuevo" class="btn btn-sm btn-danger" type="button" ng-click="goBack();"/>
        </div>
        
      </div>
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