<?php
namespace secteur;

use Exception;
use shared\Service;

include_once "SecteurRepository.php";

class SecteurService extends Service
{
    public function __construct()
    {
        parent::__construct(new SecteurModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new SecteurRepository();

        $secteur = [];
        $result = $repo->readAll("unable to find any secteur");

        foreach($result as $row) {
            $secteur[] = $row;
        }

        return $secteur;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new SecteurRepository();
        return $repo->read($id, "secteur not found");
    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new SecteurRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->create($toquery, "unable to create secteur");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new SecteurRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->update($toquery, "unable to update secteur");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new SecteurRepository();
        $repo->delete($id);
    }
}