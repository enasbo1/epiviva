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
            $candidate = $request->getAll();
        } else {
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
        echo('{"message" : "candidate créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new CandidateService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new CandidateService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}