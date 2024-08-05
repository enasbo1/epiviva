<?php
namespace secteur;
use token\Privilege;
use shared\CrudController;

require_once 'SecteurService.php';



class SecteurController extends CrudController{
    function get(array $id): void
    {
        $request = new SecteurService();
        if ($id == []) {
            $secteur = $request->getAll();
        } else {
            $secteur = $request->findById($id[0]);
        }
        echo json_encode($secteur);
    }

    function post(array $id, object $input): void
    {
        $request = new SecteurService();

        Privilege::admin();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "secteur créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new SecteurService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new SecteurService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}