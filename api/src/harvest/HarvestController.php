<?php
namespace harvest;
use token\Privilege;
use shared\CrudController;

require_once 'HarvestService.php';



class HarvestController extends CrudController{
    function get(array $id): void
    {
        $request = new HarvestService();
        if ($id == []) {
            $harvest = $request->getAll();
        } else {
            $harvest = $request->findById($id[0]);
        }
        echo json_encode($harvest);
    }

    function post(array $id, object $input): void
    {
        $request = new HarvestService();

        Privilege::admin();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "harvest créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new HarvestService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new HarvestService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}