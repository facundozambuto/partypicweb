<?php
//Verifica si llegan datos por ajax
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$recoveryEmail = $request->recoveryEmail;
post_data($recoveryEmail);

function post_data($recoveryEmail)
{
  $email = $recoveryEmail;
  
  $res = array();
  
  if($email == null)
  {
    $res['success'] = false;
    $res['mensajeError'] = "El campo Email está vacío" . ' email: ' . $email;
  }
  else
  {
    $usuario_ok = get_usuario($email);

    if(!$usuario_ok)
    {
      $res['success'] = false;
      $res['mensajeError'] = "No existe usuario registrado con ese email";
    }
    else
    {
      $contrasenia = get_contrasenia($email);

      $to = $email;
      //$to = 'facundozambuto@gmail.com';
      $subject = "Recuperar Credenciales - Party Pic ";

      $message = '<html class="no-js" lang="es">';
      $message .= '<head>';
      $message .= '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
      $message .= '<meta http-equiv="X-UA-Compatible" content="IE=edge">';
      $message .= '<meta name="viewport" content="initial-scale=1, maximum-scale=1">';
      $message .= '<title>Party Pic App - Recuperar Contraseña</title>';
      $message .= '<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />';
      $message .= '<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Oswald">';
      $message .= '<link rel="stylesheet" type="text/css" href="https://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">';
      $message .= '<link rel="stylesheet" type="text/css" href="http://www.facundozambuto/css/sendemail.css">';
      $message .= '</head>';

      $message .= '<body>';
      $message .= '<div class="wrapper">';
      $message .= '<header class="header">';
      $message .= '<div class="container">';
      $message .= '<div class="row">';
      $message .= '<div class="col-md-8 col-md-offset-1 text-center">';
      $message .= '<div class="content">';
      $message .= '<div class="pull-middle">';
      $message .= '<h1 class="page-header">Recuperando la contraseña.</h1>';
      $message .= '<p class="lead">Estimado Usuario, <br/>
                   ¡Gracias por utlizar en nuestro sitio! <br/>
                   Solicitaste el envío de tus credenciales para el ingreso a nuestro sitio. 
                   </br>Las mismas son las siguientes: <br/>
                   ------------------------<br/>
                   Usuario: '.$email.' <br/>
                   Contraseña: '.$contrasenia.' <br/>
                   ------------------------ <br/>
                   Hacé click en el siguiente link para ingresar a tu cuenta: http://www.partypicapp.com/login.php</p>';
      $message .= '</div>              ';
      $message .= '</div>';
      $message .= '</div>';
      $message .= '<div class="col-md-2 col-md-offset-1 text-center mt-100 mb-100">';
      $message .= '<div class="phone">';
      $message .= '<img class="img-responsive img-rounded" src="http://www.partypicapp.com/images/logopartypic.png">';
      $message .= '</div>';
      $message .= '</div>';
      $message .= '</div>';
      $message .= '</div>';
      $message .= '</header>';
      $message .= '<footer class="footer text-center" style="margin-top: 10em">';
      $message .= '<div class="container">';
      $message .= '<small>© Todos los derechos reservados 2017. Desarrollado por <a href="https://www.facundozambuto.com/">Facundo Zambuto</a></small>';
      $message .= '</div>';
      $message .= '</footer>';
      $message .= '</div>';
      $message .= '<style>';
      $message .='html {';
      $message .='  font-family: sans-serif;';
      $message .='  -webkit-text-size-adjust: 100%;';
      $message .='      -ms-text-size-adjust: 100%;';
      $message .='}';
      $message .='body {';
      $message .='  margin: 0;';
      $message .='}';
      $message .='article,';
      $message .='aside,';
      $message .='details,';
      $message .='figcaption,';
      $message .='figure,';
      $message .='footer,';
      $message .='header,';
      $message .='hgroup,';
      $message .='main,';
      $message .='menu,';
      $message .='nav,';
      $message .='section,';
      $message .='summary {';
      $message .='  display: block;';
      $message .='}';
      $message .='audio,';
      $message .='canvas,';
      $message .='progress,';
      $message .='video {';
      $message .='  display: inline-block;';
      $message .='  vertical-align: baseline;';
      $message .='}';
      $message .='audio:not([controls]) {';
      $message .='  display: none;';
      $message .='  height: 0;';
      $message .='}';
      $message .='[hidden],';
      $message .='template {';
      $message .='  display: none;';
      $message .='}';
      $message .='a {';
      $message .='  background-color: transparent;';
      $message .='}';
      $message .='a:active,';
      $message .='a:hover {';
      $message .='  outline: 0;';
      $message .='}';
      $message .='abbr[title] {';
      $message .='  border-bottom: 1px dotted;';
      $message .='}';
      $message .='b,';
      $message .='strong {';
      $message .='  font-weight: bold;';
      $message .='}';
      $message .='dfn {';
      $message .='  font-style: italic;';
      $message .='}';
      $message .='h1 {';
      $message .='  margin: .67em 0;';
      $message .='  font-size: 2em;';
      $message .='}';
      $message .='mark {';
      $message .='  color: #000;';
      $message .='  background: #ff0;';
      $message .='}';
      $message .='small {';
      $message .='  font-size: 80%;';
      $message .='}';
      $message .='sub,';
      $message .='sup {';
      $message .='  position: relative;';
      $message .='  font-size: 75%;';
      $message .='  line-height: 0;';
      $message .='  vertical-align: baseline;';
      $message .='}';
      $message .='sup {';
      $message .='  top: -.5em;';
      $message .='}';
      $message .='sub {';
      $message .='  bottom: -.25em;';
      $message .='}';
      $message .='img {';
      $message .='  border: 0;';
      $message .='}';
      $message .='svg:not(:root) {';
      $message .='  overflow: hidden;';
      $message .='}';
      $message .='figure {';
      $message .='  margin: 1em 40px;';
      $message .='}';
      $message .='hr {';
      $message .='  height: 0;';
      $message .='  -webkit-box-sizing: content-box;';
      $message .='     -moz-box-sizing: content-box;';
      $message .='          box-sizing: content-box;';
      $message .='}';
      $message .='pre {';
      $message .='  overflow: auto;';
      $message .='}';
      $message .='code,';
      $message .='kbd,';
      $message .='pre,';
      $message .='samp {';
      $message .='  font-family: monospace, monospace;';
      $message .='  font-size: 1em;';
      $message .='}';
      $message .='button,';
      $message .='input,';
      $message .='optgroup,';
      $message .='select,';
      $message .='textarea {';
      $message .='  margin: 0;';
      $message .='  font: inherit;';
      $message .='  color: inherit;';
      $message .='}';
      $message .='button {';
      $message .='  overflow: visible;';
      $message .='}';
      $message .='button,';
      $message .='select {';
      $message .='  text-transform: none;';
      $message .='}';
      $message .='button,';
      $message .='html input[type="button"],';
      $message .='input[type="reset"],';
      $message .='input[type="submit"] {';
      $message .='  -webkit-appearance: button;';
      $message .='  cursor: pointer;';
      $message .='}';
      $message .='button[disabled],';
      $message .='html input[disabled] {';
      $message .='  cursor: default;';
      $message .='}';
      $message .='button::-moz-focus-inner,';
      $message .='input::-moz-focus-inner {';
      $message .='  padding: 0;';
      $message .='  border: 0;';
      $message .='}';
      $message .='input {';
      $message .='  line-height: normal;';
      $message .='}';
      $message .='input[type="checkbox"],';
      $message .='input[type="radio"] {';
      $message .='  -webkit-box-sizing: border-box;';
      $message .='     -moz-box-sizing: border-box;';
      $message .='          box-sizing: border-box;';
      $message .='  padding: 0;';
      $message .='}';
      $message .='input[type="number"]::-webkit-inner-spin-button,';
      $message .='input[type="number"]::-webkit-outer-spin-button {';
      $message .='  height: auto;';
      $message .='}';
      $message .='input[type="search"] {';
      $message .='  -webkit-box-sizing: content-box;';
      $message .='     -moz-box-sizing: content-box;';
      $message .='          box-sizing: content-box;';
      $message .='  -webkit-appearance: textfield;';
      $message .='}';
      $message .='input[type="search"]::-webkit-search-cancel-button,';
      $message .='input[type="search"]::-webkit-search-decoration {';
      $message .='  -webkit-appearance: none;';
      $message .='}';
      $message .='fieldset {';
      $message .='  padding: .35em .625em .75em;';
      $message .='  margin: 0 2px;';
      $message .='  border: 1px solid #c0c0c0;';
      $message .='}';
      $message .='legend {';
      $message .='  padding: 0;';
      $message .='  border: 0;';
      $message .='}';
      $message .='textarea {';
      $message .='  overflow: auto;';
      $message .='}';
      $message .='optgroup {';
      $message .='  font-weight: bold;';
      $message .='}';
      $message .='table {';
      $message .='  border-spacing: 0;';
      $message .='  border-collapse: collapse;';
      $message .='}';
      $message .='td,';
      $message .='th {';
      $message .='  padding: 0;';
      $message .='}';
      $message .='@media print {';
      $message .='  *,';
      $message .='  *:before,';
      $message .='  *:after {';
      $message .='    color: #000 !important;';
      $message .='    text-shadow: none !important;';
      $message .='    background: transparent !important;';
      $message .='    -webkit-box-shadow: none !important;';
      $message .='            box-shadow: none !important;';
      $message .='  }';
      $message .='  a,';
      $message .='  a:visited {';
      $message .='    text-decoration: underline;';
      $message .='  }';
      $message .='  a[href]:after {';
      $message .='    content: " (" attr(href) ")";';
      $message .='  }';
      $message .='  abbr[title]:after {';
      $message .='    content: " (" attr(title) ")";';
      $message .='  }';
      $message .='  a[href^="#"]:after,';
      $message .='  a[href^="javascript:"]:after {';
      $message .='    content: "";';
      $message .='  }';
      $message .='  pre,';
      $message .='  blockquote {';
      $message .='    border: 1px solid #999;';
      $message .='';
      $message .='    page-break-inside: avoid;';
      $message .='  }';
      $message .='  thead {';
      $message .='    display: table-header-group;';
      $message .='  }';
      $message .='  tr,';
      $message .='  img {';
      $message .='    page-break-inside: avoid;';
      $message .='  }';
      $message .='  img {';
      $message .='    max-width: 100% !important;';
      $message .='  }';
      $message .='  p,';
      $message .='  h2,';
      $message .='  h3 {';
      $message .='    orphans: 3;';
      $message .='    widows: 3;';
      $message .='  }';
      $message .='  h2,';
      $message .='  h3 {';
      $message .='    page-break-after: avoid;';
      $message .='  }';
      $message .='  .navbar {';
      $message .='    display: none;';
      $message .='  }';
      $message .='  .btn > .caret,';
      $message .='  .dropup > .btn > .caret {';
      $message .='    border-top-color: #000 !important;';
      $message .='  }';
      $message .='  .label {';
      $message .='    border: 1px solid #000;';
      $message .='  }';
      $message .='  .table {';
      $message .='    border-collapse: collapse !important;';
      $message .='  }';
      $message .='  .table td,';
      $message .='  .table th {';
      $message .='    background-color: #fff !important;';
      $message .='  }';
      $message .='  .table-bordered th,';
      $message .='  .table-bordered td {';
      $message .='    border: 1px solid #ddd !important;';
      $message .='  }';
      $message .='}';

      $message .= '.big-btn{';
      $message .= 'padding: 10px 0px 11px 0px;';
      $message .= 'width: 215px;';
      $message .= 'margin-top:5px;';
      $message .= '}';
      $message .= '.big-btn i{';
      $message .= 'font-size: 65px;';
      $message .= 'margin-right: 0px !important;';
      $message .= '}';
      $message .= '.big-btn strong{';
      $message .= 'font-size: 25px;';
      $message .= 'text-shadow: 1px 2px 0px #34659B;';
      $message .= 'color: #fff;';
      $message .= 'line-height: 24px;';
      $message .= '}';
      $message .= '.big-btn .btn-text{';
      $message .= 'margin-top:6px;';
      $message .= '}';
      $message .= '.big-btn small{font-size: 75%;}';
      $message .= '.android-btn{';
      $message .= 'width: 240px;';
      $message .= 'padding: 13px 17px 13px 0px;';
      $message .= 'background-color: #000;';
      $message .= 'border-color: #000;';
      $message .= '}';
      $message .= '.android-btn:hover{';
      $message .= 'background-color: #272727;';
      $message .= '}';
      $message .= '.android-btn i{';
      $message .= 'font-size: 55px;';
      $message .= '}';
      $message .= '.android-btn .btn-text{';
      $message .= 'margin-top: 0px;';
      $message .= '}';
      $message .= '.android-btn strong{';
      $message .= 'font-size: 25px;';
      $message .= 'text-shadow: none;';
      $message .= 'color: #fff;';
      $message .= 'line-height: 24px;';
      $message .= '}';
      $message .= '.windows-btn{';
      $message .= 'background-color:#008A00;';
      $message .= 'width: 235px;';
      $message .= 'padding: 13px 5px 13px 10px;';
      $message .= 'border-color: #055805;';
      $message .= '}';
      $message .= '.windows-btn:hover{';
      $message .= 'background-color: #008A00;';
      $message .= '}';
      $message .= '.windows-btn .btn-text{';
      $message .= 'text-shadow: none;';
      $message .= 'font-size: 26px;';
      $message .= 'line-height: 25px;';
      $message .= '}';
      $message .= '</style>';
      $message .= '</body>';
      $message .= '</html>';

      $headers = "From: 'PartyPicApp Admin' <info@partypicapp.com> \r\n";
      $headers .= "MIME-Version: 1.0\r\n";
      $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
      mail($to, utf8_decode($subject), utf8_decode($message), $headers); 
      $res['success'] = true;
    }
  }
  echo json_encode($res);
}

function Conectarse()
{
  $hostname = "localhost";
  $username = "lajoseacevedo";
  $password = "Canalla2012";
  $database = "partypic";

  if(!($link=mysql_connect($hostname,$username,$password)))
  {
    echo "Error al conectar a la base de datos";
    exit();
  }

  if(!mysql_select_db($database, $link))
  {
    echo "Error seleccionando la base de datos";
    exit();
  }
  return $link;  
}

function get_usuario($email)
{
  $con = Conectarse();
  $sql = "SELECT * FROM usuarios WHERE email = '".$email."' ";

  $retval = mysql_query($sql, $con);
  if(!$retval)
  {
    die('Could not get data: ' . mysql_error());
  }

  if ($retval && mysql_num_rows($retval) > 0)
  {
    return true;
  }
  else
  {
    return false;
  }
}
 
 function get_contrasenia($email)
 {

  $con = Conectarse();
  $query="SELECT contrasenia FROM usuarios WHERE email = '{$email}'";
  $resultado = mysql_query($query, $con);
  $row = mysql_fetch_array($resultado);
  $contrasenia = $row['contrasenia'];

  if (!$resultado) 
  {
    //Este echo habria que sacarlo para no meter data el html
    echo 'No se pudo ejecutar la consulta: ' . mysql_error();
  }

  mysql_close($con); 

  return $contrasenia;
 } 

?>