<?php
namespace distribute;
use token\Privilege;
use shared\CrudController;

require_once 'DistributeService.php';



class DistributeController extends CrudController{
    function get(array $id): void
    {
        $request = new DistributeService();
        if ($id == []) {
            $distribute = $request->getAll();
        } else {
            $distribute = $request->findById($id[0]);
        }
        echo json_encode($distribute);
    }

    function post(array $id, object $input): void
    {
        $request = new DistributeService();

        Privilege::admin();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "distribute créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new DistributeService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new DistributeService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}