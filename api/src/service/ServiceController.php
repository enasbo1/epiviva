<?php
namespace service;
use token\Privilege;
use shared\CrudController;

require_once 'ServiceService.php';



class ServiceController extends CrudController{
    function get(array $id): void
    {
        $request = new ServiceService();
        if ($id == []) {
            $service = $request->getAll();
        } else {
            $service = $request->findById($id[0]);
        }
        echo json_encode($service);
    }

    function post(array $id, object $input): void
    {
        $request = new ServiceService();

        Privilege::admin();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "service créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new ServiceService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new ServiceService();
        Privilege::admin();
        $request->delete($id[0]);
        http_response_code(201);
        echo('{"message" : "service supprimé avec succès"}');

    }
}