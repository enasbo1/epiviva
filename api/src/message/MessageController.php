<?php
namespace message;
use token\Privilege;
use shared\CrudController;

require_once 'MessageService.php';



class MessageController extends CrudController{
    function get(array $id): void
    {
        $request = new MessageService();
        if ($id == []) {
            $message = $request->getAll();
        } else {
            $message = $request->findById($id[0]);
        }
        echo json_encode($message);
    }

    function post(array $id, object $input): void
    {
        $request = new MessageService();

        Privilege::admin();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "message créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new MessageService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new MessageService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}