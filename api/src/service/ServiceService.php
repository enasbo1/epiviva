<?php
namespace service;

use Exception;
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
        $result = $repo->readAll("unable to find any service");

        foreach($result as $row) {
            $service[] = $row;
        }

        return $service;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new ServiceRepository();
        return $repo->read($id, "service not found");
    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new ServiceRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->create($toquery, "unable to create service");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new ServiceRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->update($toquery, "unable to update service");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new ServiceRepository();
        $repo->delete($id);
    }
}