<?php
namespace candidate;

use Exception;
use message\MessageRepository;
use shared\Formater;
use shared\Service;
use users\UsersRepository;

include_once "CandidateRepository.php";

class CandidateService extends Service
{
    public function __construct()
    {
        parent::__construct(new CandidateModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new CandidateRepository();

        $candidate = [];
        $result = $repo->get_candidates(['s.active' => "true"]);

        foreach($result as $row) {
            $candidate[] = Formater::prepareGet($row);
        }

        return $candidate;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new CandidateRepository();

        $candidate = [];
        $result = $repo->get_candidates(['c.id'=>$id, 's.active' => "true"]);

        foreach($result as $row) {
            $candidate[] = Formater::prepareGet($row);
        }

        return $candidate;
    }

    /**
     * @throws Exception
     */
    public function save(object $input): string
    {
        $repo = new CandidateRepository();
        $toQuery = $this->modelType->isValidType($input);
        $toQuery['creation_date'] = date("Y-m-d H:i:s");
        $toQuery['last_edited'] = date("Y-m-d H:i:s");
        return $repo->create($toQuery, "unable to create candidate");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new CandidateRepository();
        $toQuery = $this->modelType->isValidType($input);
        $toQuery['last_edited'] = date("Y-m-d H:i:s");
        $repo->update($toQuery, "unable to update candidate");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new CandidateRepository();
        $message = new MessageRepository();
        $message->delete_abs('candidate_id', $id);
        $repo->delete($id);
    }

    /**
     * @throws Exception
     */
    public function candidate(object $input, int $user_id): void
    {
        $input->user_id = $user_id;
        $input->validated = "wait";
        $id = $this->save($input);
        $message = new MessageRepository();
        $message->create(
            [
                'sender_id' => $user_id,
                'text'=>'candidate.createMessage',
                'candidate_id' => $id,
                'date_send' => date("Y-m-d H:i:s")
            ]
        );
    }

    /**
     * @throws Exception
     */
    public function getFromUser(int $user_id): array
    {
        $repo = new CandidateRepository();
        $candidate = [];
        $result = $repo->get_candidates(['c.user_id' => $user_id, 's.active' => "true"]);

        foreach($result as $row) {
            $candidate[] = Formater::prepareGet($row);
        }

        return $candidate;
    }

    /**
     * @throws Exception
     */
    public function getOneFromUser(int $id, int $user_id): array
    {
        $repo = new CandidateRepository();
        $candidate = [];
        $result = $repo->get_candidates(['c.user_id' => $user_id, 'c.id'=>$id, 's.active' => "true"]);

        foreach($result as $row) {
            $candidate[] = Formater::prepareGet($row);
        }

        return $candidate;
    }

    /**
     * @throws Exception
     */
    public function editCandidate(object $input, int $user_id): void
    {
        $repo = new CandidateRepository();
        $messages = new MessageRepository();
        $edited = $repo->read($input->id)[0];
        if (isset($edited) && ($edited['user_id'] == $user_id)){
            $input->last_edited = date("Y-m-d H:i:s");
            $input->validated = "wait";
            $toQuery = $this->modelType->isValidType($input, $edited);
            $toQuery['last_edited'] = date("Y-m-d H:i:s");
            $repo->update($toQuery, "unable to update candidate");

            $messages->create(
                [
                    'sender_id' => $user_id,
                    'text'=>'candidate.updateMessage',
                    'candidate_id' => $input->id,
                    'date_send' => date("Y-m-d H:i:s")
                ]
            );
        }else{
            throw new Exception("not allowed", 403);
        }
    }

    /**
     * @throws Exception
     */
    public function is_candidate(int $id, int $user_id): bool
    {
        $repo = new CandidateRepository();
        return count($repo->get(['id'], ['id'=>$id, 'user_id'=>$user_id]))>0;

    }

    /**
     * @throws Exception
     */
    public function validate(object $input):void
    {
        $this->update_status($input, 'valid', 'candidate.validateMessage');
    }

    /**
     * @throws Exception
     */
    public function reject(object $input):void
    {
        $this->update_status($input, 'reject', 'candidate.rejectMessage');
    }

    /**
     * @throws Exception
     */
    private function update_status(object $input, string $status, string $message): void
    {
        $repo = new CandidateRepository();
        $messages = new MessageRepository();
        $edited = $repo->read($input->id)[0];
        if (isset($edited)){
            if ($edited['validated'] !== $status) {
                $edited["validated"] = $status;
                $input->answer = $edited['answer']?? '{}';
                $toQuery = $this->modelType->isValidType($input, $edited);
                $repo->update($toQuery, "unable to update candidate");

                $messages->create(
                    [
                        'sender_id' => 1,
                        'receiver_id' => $edited['user_id']?? 1,
                        'text' => $message,
                        'candidate_id' => $input->id,
                        'date_send' => date("Y-m-d H:i:s"),
                        'link'=>"visitor/candidated/$input->id"
                    ]
                );
                if ($status == 'valid'){
                    $user = new UsersRepository();
                    $u = $user->get(['status'], ['id'=>$edited['user_id']?? 0]);
                    if ((count($u)>0) && ($u[0]['status']<2)){
                        $user->update(
                            ['id'=>$edited['user_id']?? 0,
                                'status'=>2]
                        );
                    }
                }
            }
        }else{
            throw new Exception("not found", 404);
        }
    }
}