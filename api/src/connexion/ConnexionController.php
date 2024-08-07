<?php
namespace connexion;
use Exception;
use token\Privilege;
use shared\CrudController;

require_once 'ConnexionService.php';



class ConnexionController extends CrudController{
    function get(array $id): void
    {
        http_response_code(404);
        throw new Exception();
    }

    function post(array $id, object $input): void
    {
        $request = new ConnexionService();

        $answer =  $request->connect($input);
        http_response_code(201);
        echo(json_encode($answer));
    }

    function patch(array $id, object $input): void
    {
        http_response_code(404);
        throw new Exception();
    }

    function delete(array $id): void
    {
        http_response_code(404);
        throw new Exception();
    }
}