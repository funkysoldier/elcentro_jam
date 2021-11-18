<?php
if (!isset($_COOKIE["memberEmail"]))
  header("Location: /my/login.html");
include_once "../core/config.php"; 
$cfg = new Config;
?>
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
    <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet" crossorigin="">
    <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js" crossorigin=""></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" >
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
    <script src="/js/main.js" type="text/javascript"></script>
    <script src="/js/view.js" type="text/javascript"></script>
    <script src="/js/my.js" type="text/javascript"></script>
  </head>
  <body class="mdc-typography">
    <div class="page">
      <div class="mdc-layout-grid mdc-elevation--z1">
        <div class="mdc-layout-grid__inner header">
          <div class="mdc-layout-grid__cell--span-6">
            <span class="mdc-typography--headline5 title"><a href="/"><?php echo $cfg->jamName; ?></a></span>
          </div>
          <div class="mdc-layout-grid__cell--span-6 right">
            <button class="mdc-button mdc-button--outlined">
              <span class="mdc-button__ripple"></span>
              <span class="mdc-button__label">Выйти</span>
            </button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__inner inner">
          </div>
        </div>
      </div>
    </div>
  </body>
</html>