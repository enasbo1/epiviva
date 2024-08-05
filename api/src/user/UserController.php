<?php
namespace user;
use token\Privilege;
use shared\CrudController;

require_once 'UserService.php';



class UserController extends CrudController{
    function get(array $id): void
    {
        $request = new UserService();
        if ($id == []) {
            $user = $request->getAll();
        } else {
            $user = $request->findById($id[0]);
        }
        echo json_encode($user);
    }

    function post(array $id, object $input): void
    {
        $request = new UserService();

        Privilege::admin();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "user créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new UserService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new UserService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}
