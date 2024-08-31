<?php
namespace helped;
use token\Privilege;
use shared\CrudController;

require_once 'HelpedService.php';



class HelpedController extends CrudController{
    function get(array $id): void
    {
        $request = new HelpedService();
        if ($id == []) {
            $helped = $request->getAll();
        } else {
            switch ($id[0]){
                case 'benefit':
                    Privilege::volunteer();
                    $helped = $request->get_benefit($id[1]);
                    break;
                default:
                    $helped = $request->findById($id[0]);
                    break;
            }

        }
        echo json_encode($helped);
    }

    function post(array $id, object $input): void
    {
        $request = new HelpedService();

        Privilege::rh();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "helped créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new HelpedService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new HelpedService();
        Privilege::rh();
        $request->delete($id[0]);
    }
}