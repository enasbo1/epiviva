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
            Privilege::admin();
            $users = $request->getAll();
        } else {
            switch ($id[0]) {
                case 'self':
                    Privilege::allowed();
                    global $_TOKEN;
                    $users = $request->findById($_TOKEN->user_id);
                    break;
                case 'giving':
                    Privilege::rh();
                    $users = $request->get_giving();
                    break;
                case 'volunteer':
                    Privilege::rh();
                    if (count($id)>1){
                        $users = $request->get_volunteer($id[1]);
                    }else{
                        $users = $request->get_volunteer();
                    }
                    break;
                default:
                    Privilege::rh();
                    $users = $request->findById($id[0]);
                    break;
            }
        }

        echo json_encode($users);
    }

    function post(array $id, object $input): void
    {
        $request = new UsersService();

        if ($id[0]=="inscription"){
            $answer = $request->inscrit($input);
            http_response_code(201);
            echo(json_encode($answer));
        }else{
            Privilege::admin();
            $request->save($input);
            http_response_code(201);
            echo('{"message" : "users créé avec succès"}');
        }

    }

    function patch(array $id, object $input): void
    {
        $request = new UsersService();
        Privilege::allowed();
        global $_TOKEN;
        if ($input->id == $_TOKEN->user_id) {
            $input->status = null;
        }else{
            Privilege::admin();
        }
        $request->update($input);
        echo('{"message" : "users modifié avec succès"}');

    }

    function delete(array $id): void
    {
        $request = new UsersService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}