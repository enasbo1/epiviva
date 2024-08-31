<?php
namespace affect;

use Exception;
use shared\Formater;
use shared\Service;

include_once "AffectRepository.php";

class AffectService extends Service
{
    public function __construct()
    {
        parent::__construct(new AffectModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new AffectRepository();

        $distribute = [];
        $result = $repo->readAll("unable to find any distribute");

        foreach($result as $row) {
            $distribute[] = Formater::prepareGet($row);
        }

        return $distribute;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new AffectRepository();

        $distribute = [];
        $result = $repo->read($id, "distribute not found");

        foreach($result as $row) {
            $distribute[] = Formater::prepareGet($row);
        }

        return $distribute;

    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new AffectRepository();
        $toQuery = $this->modelType->isValidType($input);
        $repo->create($toQuery, "unable to create distribute");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new AffectRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update distribute");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new AffectRepository();
        $repo->delete($id);
    }

    /**
     * @throws Exception
     */
    public function get_affected(int $sector_id): array
    {
        $repo = new AffectRepository();

        $distribute = [];
        $result = $repo->get_affected(['d.sector_id' => $sector_id]);

        foreach($result as $row) {
            $distribute[] = Formater::prepareGet($row);
        }

        return $distribute;

    }

    /**
     * @throws Exception
     */
    public function get_sector(int $user_id): array
    {
        $repo = new AffectRepository();

        $distribute = [];

        $result = $repo->get_sector(['d.user_id' => $user_id]);

        foreach($result as $row) {
            $distribute[] = Formater::prepareGet($row);
        }

        return $distribute;

    }
}