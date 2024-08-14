<?php
namespace candidate;

use Exception;
use shared\Service;

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
        $toquery = $this->modelType->isValidType($input);
        $toquery['creation_date'] = date("Y-m-d H:i:s");
        $toquery['last_edited'] = date("Y-m-d H:i:s");
        $repo->create($toquery, "unable to create candidate");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new CandidateRepository();
        $toquery = $this->modelType->isValidType($input);
        $toquery['last_edited'] = date("Y-m-d H:i:s");
        $repo->update($toquery, "unable to update candidate");
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
        $input->validated = false;
        $this->save($input);
    }
}