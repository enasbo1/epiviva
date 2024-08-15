<?php
namespace secteur;

use Exception;
use shared\Formater;
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
            $secteur[] = Formater::prepareGet($row);
        }

        return $secteur;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new SecteurRepository();

        $secteur = [];
        $result = $repo->read($id, "secteur not found");

        foreach($result as $row) {
            $secteur[] = Formater::prepareGet($row);
        }

        return $secteur;

    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new SecteurRepository();
        $toQuery = $this->modelType->isValidType($input);
        $repo->create($toQuery, "unable to create secteur");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new SecteurRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update secteur");
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