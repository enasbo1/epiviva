<?php
namespace candidate;

use Exception;
use message\MessageRepository;
use shared\Formater;
use shared\Service;

include_once "CandidateRepository.php";

class CandidateService extends Service
{
    private string $query=
"SELECT 
    c.id as id, 
    answer, 
    validated, 
    creation_date, 
    validation_date, 
    last_edited,
    s.id as service__id,
    s.nom as service__nom, 
    form as service__form, 
    description as service__description,
    u.id as user__id, 
    prenom as user__prenom, 
    u.nom as user__nom, 
    mail as user__mail
FROM candidate c
inner join public.service s on s.id = c.service_id
inner join public.users u on u.id = c.user_id
";
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
        $result = $repo->readAll("unable to find any candidate");

        foreach($result as $row) {
            $candidate[] = $row;
        }

        return $candidate;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new CandidateRepository();
        return $repo->read($id, "candidate not found");
    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new CandidateRepository();
        $toQuery = $this->modelType->isValidType($input);
        $toQuery['creation_date'] = date("Y-m-d H:i:s");
        $toQuery['last_edited'] = date("Y-m-d H:i:s");
        $repo->create($toQuery, "unable to create candidate");
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
        $repo->delete($id);
    }

    /**
     * @throws Exception
     */
    public function candidate(object $input, int $user_id): void
    {
        $input->user_id = $user_id;
        $input->validated = "wait";
        $this->save($input);
    }

    /**
     * @throws Exception
     */
    public function getFromUser(int $user_id): array
    {
        $repo = new CandidateRepository();
        $candidate = [];
        $result = $repo->query($this->query.'where c.user_id = $1', ['user_id' => $user_id]);

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
        $result = $repo->query($this->query.'where c.user_id = $1 and c.id = $2', ['user_id' => $user_id, 'id'=>$id]);

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
            http_response_code(403);
            throw new Exception("not allowed");
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
}