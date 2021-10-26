<?php
include_once "config.php";

if ( isset($_POST["request"]) || ( isset($_GET["r"]) && $_GET["r"] == "3567656765" )) {
    include_once "request.php";
    if ( isset($_POST["request"]) )
        $r = $_POST["request"];
    else {
        $r = [];
        $r["method"] = $_GET["m"];
        $r["object"] = $_GET["o"];
        $r["params"] = $_GET["p"];
    }
    $request = new Request($r["method"], $r["object"], $r["params"]);
    $response = $request->execute();
    echo json_encode($response);
}