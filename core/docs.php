<?php
include_once "../docs/quickstart.php";

class Docs {
    private $client;

    public function __construct() {
        $this->client = getClient();
    }
}
