<?php
namespace service;

use candidate\CandidateRepository;
use Exception;
use shared\Formater;
use shared\Service;

include_once "ServiceRepository.php";

class ServiceService extends Service
{
    public function __construct()
    {
        parent::__construct(new ServiceModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new ServiceRepository();

        $service = [];
        $result = $repo->readActive("unable to find any service");

        foreach($result as $row) {
            $service[] = Formater::prepareGet($row);
        }

        return $service;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new ServiceRepository();

        $service = [];
        $result = $repo->read($id, "service not found");

        foreach($result as $row) {
            $service[] = Formater::prepareGet($row);
        }

        return $service;

    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new ServiceRepository();
        $toQuery = $this->modelType->isValidType($input);
        $repo->create($toQuery, "unable to create service");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new ServiceRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update service");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new ServiceRepository();
        $candidate = new CandidateRepository();
        $n = $candidate->get(['id'], ['service_id' => $id]);
        if (count($n)==0){
            $repo->delete($id);
        }else{
            $repo->update(['id'=> $id, 'active' => "false"]);
        }
    }
}