<?php
include_once "docs.php";

class Member {
    public $fields = ["datetime", "name", "surname", "tel", "email", "gender", "stay", "transfer", "group", "social", "pair", "house", "comment", "kids", "cost", "ip", "state"];

    public function _list(){
        $cfg = new Config();
        $docs = new Docs();
        $service = $docs->getService();
        $range = $cfg->docsRegistrationList .'!A1:Q';
        $response = $service->spreadsheets_values->get($cfg->docsSpreadsheet, $range);
        $values = $response->getValues();
        return $values;
    }

    public function get($find){
        $members = $this->_list();
        $result = [];
        foreach($members as $i => $v)
            if ( isset($find["email"]) )
                if (strtoupper($find["email"]) == strtoupper($v[4]))
                    $result[] = $this->prepareResult($v, $i);
        return $result;
    }

    public function all($void){
        $members = $this->_list();
        $result = [];
        foreach($members as $i => $v)
            $result[] = $this->prepareResult($v, $i);
        return $result;
    }

    public function login($find){
        $members = $this->_list();
        foreach($members as $i => $v)
            if (strtoupper($find["email"]) == strtoupper($v[4])){
                // $cfg = new Config;
                // $hash = hash("sha256", strtoupper($find["email"]) . $cfg->hashSalt);
                return [];
            }
        return ["error" => ["message" => "Пользователь не найден"]];
    }

    public function prepareResult($m, $id = null) {
        $r = [];
        if ($id) $r["id"] = $id;
        foreach($this->fields as $i => $f)
            $r[$f] = $m[$i];
        return $r;
    }

    public function execute($method, $params) {
        return $this->$method($params);
    }
}