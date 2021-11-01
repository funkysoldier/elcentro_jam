<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="shortcut icon" href="/favicon.ico"/>
    <title>Джем - Личный кабинет</title>
    <!-- Styles -->
    <link href="/css/my.css" rel="stylesheet">    
    <!-- Material Design -->
    <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet" crossorigin>
    <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js" crossorigin></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" >
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
    <!-- Scripts -->
<?php
include_once '../core/config.php';

$text = 'Страница не найдена :(';
$cfg = new Config;
$status = false;
if ( isset($_GET["auth"]) ) {
    include_once '../core/sendsmtp.php';

    $email = $_GET["auth"];
    $hash = hash("sha256", strtoupper($email) . $cfg->hashSalt);
    $msg = "<div style=\"border:0;padding:0;margin:0;background-color:#fff;font-family:'Segoe UI',Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;text-align:center\" bgcolor=\"white\"> 
    <div style=\"background-color:#fff\">
      <table align=\"center\" width=\"100%\" cellpadding=\"12\" cellspacing=\"0\" style=\"border-collapse:collapse\">
        <tbody><tr>
          <td>
            <div style=\"padding-top:16px;padding-bottom:24px\">
              <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" style=\"width:100%\">
                <tbody><tr>
                  <td valign=\"top\">
                    <div style=\"padding-top:2px;color:#383434;line-height:22px;font-weight:bold;font-size:25px;font-family:'Segoe UI',Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;text-align:left\">Личный кабинет {$cfg->jamName}</div>
                  </td>
                </tr></tbody>
              </table>
            </div>
            <div style=\"overflow:hidden;border-top:1px solid #f0f0f0;text-align:left\">
              <div>
                <p>Привет!</p>
                <p>Для подтверждения электронной почты и доступа в личный кабинет, необходимо пройди по ссылке:<br>
                  <a href=\"http://jam.elcentro.ru/auth/?email={$email}&code={$hash}\" target=\"_blank\">http://jam.elcentro.ru/auth/?email={$email}&code={$hash}</a>
                </p>
                <p>Если вы получили это письмо по ошибке, просто игнорируйте его.</p>
              </div>
            </div>  
          </td></tr>
        </tbody>
      </table>
    </div></div>";
    $status = smtpmail("", $email, "Подтверждение почты Личного кабинета", $msg);
    $text = ($status ?
        "<p>На адрес <b>{$email}</b> выслано письмо для подтверждения почты. В письме вы найдёте ссылку для перехода в личный кабинет.</p>
        <p>Если письмо не пришло, проверьте папку для спама ;)</p>" :
        "<p>Произошла ошибка при отправке письма на адрес <b>{$email}</b>. Попробуйте <a href=\"/login.html\">повторить ещё раз</a>.</p>");        
} elseif ( isset($_GET["email"]) && isset($_GET["code"]) ) {
    $email = $_GET["email"];
    $hash = hash("sha256", strtoupper($email) . $cfg->hashSalt);
    $status = ($hash == $_GET["code"]);
    $text = ($status?
            "<p>Авторизация прошла успешно! Сейчас вы будете перенаправлены на страницу личного кабинета.</p>
            <img src=\"/img/spinner-x26.gif\" title=\"Загрузка...\" alt=\"Загрузка...\"/>":
            "Ошибка авторизации!");
    if($status) {
        echo "<script type=\"text/javascript\">\n";
        echo "document.cookie = \"memberEmail={$email};path=/my;max-age=1555200\";\n";
        echo "setTimeout(function() { window.location.href = '/my/' }, 4000);\n";
        echo "</script>\n";
    } 
} 
?>
  </head>
  <body class="mdc-typography">
    <div class="page">
      <div class="mdc-layout-grid mdc-elevation--z1">
        <div class="mdc-layout-grid__inner header">
          <div class="mdc-layout-grid__cell--span-6">
            <span class="mdc-typography--headline5 title">Привет!</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__inner inner">
            <div class="mdc-layout-grid__cell--span-12">
                <span class="mdc-typography--body1"><?php echo $text; ?></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>