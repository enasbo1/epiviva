<?php
namespace message;
use candidate\CandidateService;
use Exception;
use token\Privilege;
use shared\CrudController;

require_once 'MessageService.php';



class MessageController extends CrudController{
    function get(array $id): void
    {
        $request = new MessageService();
        if ($id == []) {
            Privilege::admin();
            $message = $request->getAll();
        } else {
            Privilege::allowed();
            global $_TOKEN;
            switch ($id[0]){
                case 'candidate':
                    $candidate = new CandidateService();
                    if (!$candidate->is_candidate($id[1], $_TOKEN->user_id)) {
                        Privilege::admin();
                    }
                    $message = $request->getFromCandidate($id[1]);
                    break;
                default:
                    $message = $request->findById($id[0]);
                    break;
            }
        }
        echo json_encode($message);
    }

    function post(array $id, object $input): void
    {
        $request = new MessageService();
        global $_TOKEN;
        Privilege::allowed();
        if ($id == []) {
            throw new Exception('invalid request', 404);
        }else{
            switch ($id[0]) {
                case 'candidate':
                    $candidate = new CandidateService();
                    if ($candidate->is_candidate($input->candidate_id, $_TOKEN->user_id)){
                        $request->send($input, $_TOKEN->user_id);
                    }else{
                        throw new Exception('{message:"not allowed"}', 403);
                    }
                    break;
                default:
                    Privilege::admin();
                    break;
            }
        }

        http_response_code(201);
        echo('{"message" : "message créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new MessageService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new MessageService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}