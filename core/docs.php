<?php
include_once "../docs/quickstart.php";

class Docs {
    private $service;

    public function __construct() {
        $client = getClient();
        $this->service = new Google_Service_Sheets($client);
    }

    public function getService() {
        return $this->service;
    }
}
