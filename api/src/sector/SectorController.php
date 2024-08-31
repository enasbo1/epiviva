<?php
namespace sector;
use token\Privilege;
use shared\CrudController;

require_once 'SectorService.php';



class SectorController extends CrudController{
    function get(array $id): void
    {
        Privilege::volunteer();
        $request = new SectorService();
        if ($id == []) {
            $sector = $request->getAll();
        } else {
            $sector = $request->findById($id[0]);
        }
        echo json_encode($sector);
    }

    function post(array $id, object $input): void
    {
        $request = new SectorService();

        Privilege::rh();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "sector créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new SectorService();

        Privilege::rh();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new SectorService();
        Privilege::rh();
        $request->delete($id[0]);
    }
}