<?php
namespace benefit;
use token\Privilege;
use shared\CrudController;

require_once 'BenefitService.php';



class BenefitController extends CrudController{
    function get(array $id): void
    {
        Privilege::allowed();
        $request = new BenefitService();
        if ($id == []) {
            Privilege::rh();
            $benefit = $request->getAll();
        } else {
            switch ($id[0]){
                case 'self':
                    global $_TOKEN;
                    $benefit = $request->findFromUser($_TOKEN->user_id);
                    break;
                case 'valid':
                    Privilege::rh();
                    $benefit = $request->getValid();
                    break;
                case 'sector':
                    Privilege::rh();
                    $benefit = $request->getFromSector($id[1]);
                    break;
                default:
                    Privilege::rh();
                    $benefit = $request->findById($id[0]);
                    break;
            }
        }
        echo json_encode($benefit);
    }

    function post(array $id, object $input): void
    {
        $request = new BenefitService();
        if ($id == []) {
            Privilege::forbidden();
        }else{
            switch ($id[0]){
                case 'self':
                    Privilege::allowed();
                    global $_TOKEN;
                    $request->save_form_user($input, $_TOKEN->user_id);
                    break;
                default:
                    Privilege::forbidden();
            }
        }

        http_response_code(201);
        echo('{"message" : "benefit créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new BenefitService();
        if ($id==[]){
            Privilege::admin();
            $request->update($input);
        }else {
            Privilege::allowed();
            global $_TOKEN;
            switch ($id[0]){
                case 'validate':
                    Privilege::rh();
                    $request->validate($input);
                    break;
                case 'reject':
                    Privilege::rh();
                    $request->reject($input);
                    break;
                case 'fire':
                    Privilege::rh();
                    $request->fire($input);
                    break;
                case 'affect':
                    Privilege::rh();
                    $request->affect($input);
                    break;
            }
        }
        echo('{"message" : "benefit modifié avec succès"}');
    }

    function delete(array $id): void
    {
        $request = new BenefitService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}