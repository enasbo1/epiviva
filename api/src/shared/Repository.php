<?php
namespace shared;
use Exception;


class Repository
{
    public $connection = null;
    public string $modelName = "";

    public ModelType $modelType;

    /**
     * @throws Exception
     */
    public function __construct(string $modelName, ModelType $modelType)
    {
        $json_string = file_get_contents("./properties.json");
        $properties = json_decode($json_string,true);
        $this->modelName = $modelName;
        $this->modelType = $modelType;
        try {
            $connectionString =
                "host=".$properties["host"].
                " port=".$properties["port"].
                " dbname=".$properties["db-name"].
                " user=".$properties["username"].
                " password=".$properties["password"];
            $this->connection = pg_connect($connectionString);
            if ($this->connection === false) {
                throw new Exception("Could not connect to database.");
            }
        } catch (Exception $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    /**
     * @param array $params
     * @param string $error
     * @return string
     * @throws Exception
     */
    public function create(array $params, string $error = "", string $return = "id"): string
    {
        return ($this->post($params, $error, $return)[0][$return]);
    }

    /**
     * @param int $id
     * @param string $error
     * @return array
     * @throws Exception
     */
    public function read(int $id, string $error = ""):array{
        return $this->get([], ["id" => $id], $error);
    }

    /**
     * @throws Exception
     */
    public function readAll(string $error = ""):array{
        return $this->get([], [], $error);
    }

    /**
     * @throws Exception
     */
    public function readActive(string $error = ""):array{
        return $this->get([], ["active"=>true], $error);
    }

    /**
     * @throws Exception
     */
    public function update(array $params, string $error = ""): bool|Exception
    {
        if ($this->read($params['id'])!=[]){
            $this->update_abs($params, ["id"=>$params['id']], $error);
            return true;
        }
        else{
            $error = ($error == "") ? "$this->modelName instance not found: " : $error;
            throw new Exception($error, 404);
        }
    }

    /**
     * @throws Exception
     */
    public function delete(int $id, string $error = ""): void
    {
        if ($this->read($id)!=[]){
            $this->delete_abs("id", $id, $error);
        }
        else{
            $error = ($error == "") ? "$this->modelName instance not found: " : $error;
            throw new Exception($error, 404);
        }
    }

    /**
     * @throws Exception
     */
    public function delete_abs(string $attribute, string $value, string $error = ""): void
    {
        try{
            $q = 'DELETE FROM ' . strtoupper($this->modelName) . " WHERE  \"".$attribute."\" = $1";
            pg_prepare($this->connection, "", $q);
            pg_execute($this->connection, "", array($value));
        } catch (Exception $e) {
            $error = ($error == "") ? "$this->modelName instance delete failed: " : $error;
            throw new Exception($error . $e->getMessage(), 400);
        }
    }
    /**
     * @throws Exception
     */
    public function update_abs(array $updates, array $restrict, string $error = "")
    {
        try {
            foreach ($restrict as $key => $value) {
                unset($updates[$key]);
            }
            $q = "UPDATE $this->modelName SET ";
            $i = 1;
            foreach ($updates as $col => $value) {
                if ($value=='null'){
                    $q .= $col . " = null";
                    unset ($updates[$col]);
                }else{
                    $q .= $col . " = $" . $i;
                    $i += 1;
                }
                if ($i <= count($updates)) {
                    $q = $q . ",";
                }

            }
            $q.= $this->restrict($restrict, $i);
            pg_prepare($this->connection,"", $q);
            return pg_execute($this->connection,"",$updates+$restrict);
        } catch (Exception $e) {
            $error = ($error == "") ? "$this->modelName instance update failed: " : $error;
            throw new Exception($error . $e->getMessage(), 400);
        }
    }

    /**
     * @throws Exception
     */
    public function post(array $array, string $error = "", string $return = null): array
    {
        try {
            $q = 'INSERT INTO ' . strtoupper($this->modelName) . ' (';
            $i = 1;
            foreach ($array as $key => $value) {
                $q = $q . $key;
                if ($i < count($array)) {
                    $q = $q . ",";
                }
                $i += 1;
            }

            $q = $q . ') VALUES (';
            $i = 1;
            foreach ($array as $key => $value) {
                $q = $q  . '$' . "$i";
                if (($i) < count($array)) {
                    $q = $q . ",";
                }
                $i += 1;
            }
            $q = "$q) " . ($return?"RETURNING $return":'');
            pg_prepare($this->connection,"", $q);
            return pg_fetch_all(pg_execute($this->connection,"", $array));
        } catch (Exception $e) {
            $error = ($error=="")?"$this->modelName instance creation failed: ":$error;
            throw new Exception($error . $e->getMessage(), 400);
        }
    }

    /**
     * @throws Exception
     */
    public function get(array $attributes, array $restrict, string $error = ""):array{
        try{
            $r = '';
            if ($attributes!==[]){
                $i = 1;
                foreach ($attributes as $att) {
                    $r .= '"' . $att . '"';
                    if ($i < count($attributes)) {
                        $r = $r . ",";
                    }
                    $i += 1;
                }
            }else{
                $r="*";
            }

            $q = "SELECT $r FROM $this->modelName ";

            $q.= $this->restrict($restrict);

            pg_prepare($this->connection,"", $q);
            $elements = pg_execute($this->connection,"", $restrict);
            return pg_fetch_all($elements);
        }catch (Exception $e){
            $error = ($error=="")?"$this->modelName instance get failed: ":$error;
            throw new Exception($error . $e->getMessage(), 400);
        }

    }

    protected function restrict(array $restrict, int $start = 1):string
    {
        $q = '';
        $i = $start;
        $j = 1;
        foreach ($restrict as $key => $val) {
            if ($j == 1) {
                $q .= " WHERE ";
            } else {
                $q .= " AND ";
            }
            $q .= $key . ' = $' . $i;
            $i+=1;
            $j+=1;
        }
        return $q;
    }


    /**
     * @throws Exception
     */
    public function query(string $query, array $values, string $error=""): array
    {
    try{
        pg_prepare($this->connection,"", $query);
        $elements = pg_execute($this->connection,"", $values);
        return pg_fetch_all($elements);
    }catch (Exception $e){
        $error = ($error=="")?"$this->modelName instance get failed: ":$error;
        throw new Exception($error . $e->getMessage(), 400);
    }
    }
}