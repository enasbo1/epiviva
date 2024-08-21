<?php
namespace file;
use Exception;
use token\Privilege;

require_once 'FileService.php';



class FileController{

    function routes(array $id = null): void
    {
        try{
            switch ($_SERVER['REQUEST_METHOD']) {
                case "POST":
                    $body = file_get_contents("php://input");
                    $this->post($id, $body);
                    break;
                case "GET":
                   echo $this->get($id);
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

    /**
     * @throws Exception
     */
    function post(array $id, string $input): void
    {
        $request = new FileService();
        Privilege::allowed();
        if ($id==[]){
            throw new Exception("Id is null");
        }
        if ($id[0]=='caf'){
            if (!(($id[1]=='pdf')||($id[1]=='docx'))){
                Privilege::forbidden();
            }
            global $_TOKEN;
            $answer = $request->saveCaf($input, $_TOKEN->user_id, $id[1]);
        }else{
            $answer = $request->save($input, end($id));
        }

        http_response_code(201);
        echo('{"filename" : "'. $answer .'"}');
    }

    /**
     * @throws Exception
     */
    function patch(array $id, object $input): void
    {
        Privilege::forbidden();
    }

    /**
     * @throws Exception
     */
    function delete(array $id): void
    {
        Privilege::forbidden();
    }

    private function get(array $id):string
    {
        $request = new FileService();
        echo join('/',$id) . "\n";
        return $request->get(join('/',$id));
    }
}