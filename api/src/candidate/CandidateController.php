<?php
namespace candidate;
use token\Privilege;
use shared\CrudController;

require_once 'CandidateService.php';



class CandidateController extends CrudController{
    function get(array $id): void
    {
        $request = new CandidateService();
        if ($id == []) {
            Privilege::admin();
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
            Privilege::admin();
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
        }elseif ($id[0]== 'self') {
            Privilege::allowed();
            global $_TOKEN;
            $request->editCandidate($input, $_TOKEN->user_id);
        }
        echo('{"message" : "candidature modifiée avec succès"}');
    }

    function delete(array $id): void
    {
        $request = new CandidateService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}