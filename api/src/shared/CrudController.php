<?php
namespace shared;
use Exception;

abstract class  CrudController {
    /**
     * @throws Exception
     */
    abstract function get(array $id):void;
    /**
     * @throws Exception
     */
    abstract function post(array $id, object $input):void;
    /**
     * @throws Exception
     */
    abstract function patch(array $id, object $input):void;
    /**
     * @throws Exception
     */
    abstract function delete(array $id):void;

    public function routes(array $id = null): void
    {
        try{
            switch ($_SERVER['REQUEST_METHOD']) {
                case "GET":
                    $this->get($id);
                    break;
                case "POST":
                    $body = file_get_contents("php://input");
                    $input = json_decode($body);
                    $this->post($id, $input);
                    break;
                case "PATCH":
                    $body = file_get_contents("php://input");
                    $input = json_decode($body);
                    $this->patch($id, $input);
                    break;
                case "DELETE":
                    $this->delete($id);
                    break;
                case "OPTIONS":
                    break;
                default:
                    http_response_code(404);
            }
        }catch (exception $e) {
            http_response_code($e->getCode());
            echo $e->getMessage();
        }
    }
}
