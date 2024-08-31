<?php
namespace affect;
use mysql_xdevapi\Exception;
use token\Privilege;
use shared\CrudController;

require_once 'AffectService.php';



class AffectController extends CrudController{
    function get(array $id): void
    {
        Privilege::volunteer();
        $request = new AffectService();
        if ($id == []) {
            $distribute = $request->getAll();
        } else {
            switch ($id[0]){
                case 'affected':
                    Privilege::rh();
                    if (isset($id[1])){
                        $distribute = $request->get_affected($id[1]);
                    }else{
                        throw new Exception('not found', 404);
                    }
                    break;
                case 'sector':
                    if (isset($id[1])){
                        if ($id[1]=='self'){
                            global $_TOKEN;
                            $distribute = $request->get_sector($_TOKEN->user_id);
                        }else {
                            Privilege::rh();
                            $distribute = $request->get_sector($id[1]);
                        }
                    }else{
                        throw new Exception('not found', 404);
                    }
                    break;
                default:
                    $distribute = $request->findById($id[0]);
                    break;
            }
        }
        echo json_encode($distribute);
    }

    function post(array $id, object $input): void
    {
        $request = new AffectService();

        Privilege::rh();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "distribute créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new AffectService();

        Privilege::rh();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new AffectService();
        Privilege::rh();
        $request->delete($id[0]);
    }
}