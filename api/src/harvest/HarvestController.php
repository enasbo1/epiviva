<?php
namespace harvest;
use token\Privilege;
use shared\CrudController;

require_once 'HarvestService.php';



class HarvestController extends CrudController{
    function get(array $id): void
    {
        Privilege::volunteer();
        $request = new HarvestService();
        if ($id == []) {
            Privilege::rh();
            $harvest = $request->getAll();
        } else {
            switch ($id[0]){
                case 'sector':
                    $harvest = $request->findFormSector($id[1]);
                    break;
                default:
                    $harvest = $request->findById($id[0]);
                    break;
            }
        }
        echo json_encode($harvest);
    }

    function post(array $id, object $input): void
    {
        $request = new HarvestService();

        Privilege::rh();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "harvest créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new HarvestService();

        Privilege::rh();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new HarvestService();
        Privilege::rh();
        $request->delete($id[0]);
    }
}