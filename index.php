<!DOCTYPE html>
<html ng-app="app">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Git Search</title>

    <!-- Themed Bootstrap for enhanced experience-->
    <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/cerulean/bootstrap.min.css" rel="stylesheet"
          integrity="sha256-obxCG8hWR3FEKvV19p/G6KgEYm1v/u1FnRTS7Bc4Ii8= sha512-8Xs5FuWgtHH1JXye8aQcxVEtLqozJQAu8nhPymuRqeEslT6nJ2OgEYeS3cKiXasOVxYPN80DDoOTKWgOafU1LQ=="
          crossorigin="anonymous">
    <!-- App custom css for spinner and stuff-->
    <link rel="stylesheet" href="app-content/app.css" type="text/css">
</head>


<!-- BODY START -->
<body>

<!-- HEADER DIRECTIVE -->
<header></header>

<!-- MAIN CONTENT -->
<div class="container-fluid" style="position: absolute;margin-top: 60px;width: 100%;">
    <div class="col-sm-12">
        <div ng-view></div>
    </div>
</div>

<!-- SCRIPTS-->
<script type="application/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="application/javascript"
        src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
<script type="application/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.1/angular-route.min.js"></script>

<!-- APP SPECIFIC JS-->
<!-- Latest compiled and minified JavaScript -->
<script type="application/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"
        integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ=="
        crossorigin="anonymous"></script>

<!-- MAIN APP SCRIPT -->
<script type="application/javascript" src="app.js"></script>

<!-- DIRECTIVES -->
<script type="application/javascript" src="app-directives/header.directive.js"></script>

<!-- SERVICES -->
<script type="application/javascript" src="app-services/flash.service.js"></script>
<script type="application/javascript" src="app-services/git.service.js"></script>
<script type="application/javascript" src="app-services/properties.service.js"></script>

<!-- CONTROLLERS -->
<!-- HOME CONTROLLER -->
<script type="application/javascript" src="home/home.controller.js"></script>

<!-- BODY END-->
</body>
</html>
