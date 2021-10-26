<?php

class Request {
    private $method;
    private $object;
    private $params;

    public function __construct($method, $object, $params){
        $this->method = $method;
        $this->object = $object;
        $this->params = $params;

        include_once $object.".php";
    }

    public function execute(){
        $class = ucfirst($this->object);
        $object = new $class();
        return $object->execute($this->method, $this->params);
    }
}