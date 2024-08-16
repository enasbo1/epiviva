<?php
namespace candidate;
use Exception;
use token\Privilege;
use shared\CrudController;

require_once 'CandidateService.php';



class CandidateController extends CrudController{
    function get(array $id): void
    {
        $request = new CandidateService();
        if ($id == []) {
            Privilege::rh();
            $candidate = $request->getAll();
        } elseif ($id[0] == 'self') {
            Privilege::allowed();
            global $_TOKEN;
            if (count($id) == 1){
                $candidate = $request->getFromUser($_TOKEN->user_id);
            }else{
                $candidate = $request->getOneFromUser($id[1], $_TOKEN->user_id);
            }
        }else{
            Privilege::rh();
            $candidate = $request->findById($id[0]);
        }
        echo json_encode($candidate);
    }

    function post(array $id, object $input): void
    {
        global $_TOKEN;
        $request = new CandidateService();
        if ($id == []) {
            Privilege::admin();
            $request->save($input);
        }elseif ($id[0]== 'self') {
            Privilege::allowed();
            $request->candidate($input, $_TOKEN->user_id);
        }

        http_response_code(201);
        echo('{"message" : "candidature créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new CandidateService();
        if ($id==[]){
            Privilege::admin();
            $request->update($input);
        }else {
            Privilege::allowed();
            global $_TOKEN;
            switch ($id[0]){
                case 'self':
                    $request->editCandidate($input, $_TOKEN->user_id);
                    break;
                case 'validate':
                    Privilege::rh();
                    $request->validate($input);
                    break;
                case 'reject':
                    Privilege::rh();
                    $request->reject($input);
                    break;
            }
        }
        echo('{"message" : "candidature modifiée avec succès"}');
    }

    function delete(array $id): void
    {
        $request = new CandidateService();
        if ($id==[]){
            throw new Exception('invalid request',404);
        }else{
            global $_TOKEN;
            Privilege::allowed();
            if (!$request->is_candidate($id[0], $_TOKEN->user_id)){
                Privilege::rh();
            }
            $request->delete($id[0]);
        }
    }
}