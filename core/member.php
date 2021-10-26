<?php

class Member {
    public function get(){
        return ['id'=> 1];
    }

    public function execute($method, $params) {
        return $this->$method($params);
    }
}