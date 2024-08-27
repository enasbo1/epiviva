<?php
namespace harvest;

use Exception;
use shared\Formater;
use shared\Service;

include_once "HarvestRepository.php";

class HarvestService extends Service
{
    public function __construct()
    {
        parent::__construct(new HarvestModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new HarvestRepository();

        $harvest = [];
        $result = $repo->readAll("unable to find any harvest");

        foreach($result as $row) {
            $harvest[] = Formater::prepareGet($row);
        }

        return $harvest;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new HarvestRepository();

        $harvest = [];
        $result = $repo->read($id, "harvest not found");

        foreach($result as $row) {
            $harvest[] = Formater::prepareGet($row);
        }

        return $harvest;

    }

    /**
     * @throws Exception
     */
    public function save(object $input): string
    {
        $repo = new HarvestRepository();
        $toQuery = $this->modelType->isValidType($input);
        return $repo->create($toQuery, "unable to create harvest");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new HarvestRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update harvest");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new HarvestRepository();
        $repo->delete($id);
    }
}