<?php
namespace distribute;

use Exception;
use shared\Service;

include_once "DistributeRepository.php";

class DistributeService extends Service
{
    public function __construct()
    {
        parent::__construct(new DistributeModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new DistributeRepository();

        $distribute = [];
        $result = $repo->readAll("unable to find any distribute");

        foreach($result as $row) {
            $distribute[] = $row;
        }

        return $distribute;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new DistributeRepository();
        return $repo->read($id, "distribute not found");
    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new DistributeRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->create($toquery, "unable to create distribute");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new DistributeRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->update($toquery, "unable to update distribute");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new DistributeRepository();
        $repo->delete($id);
    }
}