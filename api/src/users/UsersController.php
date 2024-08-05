<?php
namespace users;
use token\Privilege;
use shared\CrudController;

require_once 'UsersService.php';



class UsersController extends CrudController{
    function get(array $id): void
    {
        $request = new UsersService();
        if ($id == []) {
            $users = $request->getAll();
        } else {
            $users = $request->findById($id[0]);
        }
        echo json_encode($users);
    }

    function post(array $id, object $input): void
    {
        $request = new UsersService();

        Privilege::admin();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "users créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new UsersService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new UsersService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}