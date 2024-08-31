<?php
namespace helped;

use Exception;
use shared\Formater;
use shared\Service;

include_once "HelpedRepository.php";

class HelpedService extends Service
{
    public function __construct()
    {
        parent::__construct(new HelpedModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new HelpedRepository();

        $helped = [];
        $result = $repo->readAll("unable to find any helped");

        foreach($result as $row) {
            $helped[] = Formater::prepareGet($row);
        }

        return $helped;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new HelpedRepository();

        $helped = [];
        $result = $repo->read($id, "helped not found");

        foreach($result as $row) {
            $helped[] = Formater::prepareGet($row);
        }

        return $helped;

    }

    /**
     * @throws Exception
     */
    public function save(object $input): string
    {
        $repo = new HelpedRepository();
        $toQuery = $this->modelType->isValidType($input);
        return $repo->create($toQuery, "unable to create helped");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new HelpedRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update helped");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new HelpedRepository();
        $repo->delete($id);
    }

    /**
     * @throws Exception
     */
    public function get_benefit(int $id): array
    {
        $repo = new HelpedRepository();

        $helped = [];
        $result = $repo->get_benefit(['h.distribute_id'=>$id]);

        foreach($result as $row) {
            $helped[] = Formater::prepareGet($row);
        }

        return $helped;
    }

}