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

        Privilege::admin();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "benefit créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new BenefitService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new BenefitService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}