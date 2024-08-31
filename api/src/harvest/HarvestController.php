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
            $harvest = match ($id[0]) {
                'sector' => $request->findFormSector($id[1]),
                'progressing' => $request->findProgressing(),
                default => $request->findById($id[0]),
            };
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
        if (count($id)>0){
            if ($id[0]=='collect'){
                $request->collect($input->id);
            }
        }else{
            $request->update($input);
        }
        echo('{"message" : "harvest mis à jours avec succès"}');

    }

    function delete(array $id): void
    {
        $request = new HarvestService();
        Privilege::rh();
        $request->delete($id[0]);
    }
}