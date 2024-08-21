<?php
namespace message;
use candidate\CandidateService;
use Exception;
use token\Privilege;
use shared\CrudController;
use users\UsersRepository;
use users\UsersService;

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
                case 'notif':
                    $message = $request->getUnReads($_TOKEN->user_id);
                    break;
                case 'candidate':
                    $candidate = new CandidateService();
                    if (!$candidate->is_candidate($id[1], $_TOKEN->user_id)) {
                        Privilege::rh();
                    }
                    $message = $request->getFromCandidate($id[1]);
                    break;
                case 'benefit':
                    $user = new UsersService();
                    if (!$user->is_applicant($id[1], $_TOKEN->user_id)) {
                        Privilege::rh();
                    }
                    $message = $request->getFromBenefit($id[1]);
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
                    $target = 0;
                    if (!$candidate->is_candidate($input->candidate_id, $_TOKEN->user_id)) {
                        Privilege::rh();
                        $target = $candidate->findById($input->candidate_id)[0]['user']['id'];
                    }
                    $request->sendCandidate($input, $_TOKEN->user_id, $target);
                    break;
                case 'benefit':
                    $user = new UsersService();
                    $target = 0;
                    if (!$user->is_applicant($input->benefit_id, $_TOKEN->user_id)) {
                        Privilege::rh();
                        $target = $user->findByBenefitId($input->benefit_id)[0]['id'];
                    }
                    $request->sendBenefit($input, $_TOKEN->user_id, $target);
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
        Privilege::allowed();
        if ($id == []) {
            Privilege::admin();
            $request->update($input);
        }elseif ($id[0] == 'read') {
            global $_TOKEN;
            if (!$request->is_receiver($input->id, $_TOKEN->user_id)) {
                Privilege::forbidden();
            }
            $request->set_read($input->id);
        }

    }

    function delete(array $id): void
    {
        $request = new MessageService();
        Privilege::admin();
        $request->delete($id[0]);
    }


}