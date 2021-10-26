<?php
include_once "docs.php";

class Member {
    public $fields = ["datatime", "name", "surname", "tel", "email", "gender", "stay", "transfer", "group", "social", "pair", "house", "comment", "kids", "cost", "ip"];

    public function all(){
        $cfg = new Config();
        $docs = new Docs();
        $service = $docs->getService();
        $range = 'Регистрации!A1:P';
        $response = $service->spreadsheets_values->get($cfg->docsSpreadsheet, $range);
        $values = $response->getValues();
        return $values;
    }

    public function get($find){
        $members = $this->all();
        $result = [];
        foreach($members as $i => $v)
            if ( isset($find["email"]) )
                if (strtoupper($find["email"]) == strtoupper($v[4]))
                    $result[] = $this->prepareResult($v);
        return $result;
    }

    public function login($find){
        $members = $this->all();
        foreach($members as $i => $v)
            if (strtoupper($find["email"]) == strtoupper($v[4]))
                return [];
        return ["error" => ["message" => "Пользователь не найден"]];
    }

    public function prepareResult($m) {
        $r = [];
        foreach($this->fields as $i => $f)
            $r[$f] = $m[$i];
        return $r;
    }

    public function execute($method, $params) {
        return $this->$method($params);
    }
}