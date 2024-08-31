<?php
namespace sector;

use address\AddressRepository;
use address\AddressService;
use distribute\AffectRepository;
use distribute\AffectService;
use Exception;
use shared\Formater;
use shared\Service;
use token\Privilege;

include_once "SectorRepository.php";

class SectorService extends Service
{
    public function __construct()
    {
        parent::__construct(new SectorModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new SectorRepository();

        $sector = [];
        $result = $repo->get_sector(['active' => "true"]);

        foreach($result as $row) {
            $sector[] = Formater::prepareGet($row);
        }

        return $sector;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new SectorRepository();

        $sector = [];
        $result = $repo->get_sector(['s.id'=>$id]);

        foreach($result as $row) {
            $sector[] = Formater::prepareGet($row);
        }

        return $sector;

    }

    /**
     * @throws Exception
     */
    public function save(object $input): string
    {
        $repo = new SectorRepository();
        $address = new AddressService();
        $input->address_id = $address->save($input->address);
        $toQuery = $this->modelType->isValidType($input);
        return $repo->create($toQuery, "unable to create sector");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new SectorRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        if ($updated['address_id']!==$input->address->id) {
            Privilege::forbidden();
        }
        $address = new AddressService();
        $address->update($input->address);
        $input->address_id = $input->address->id;
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update sector");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new SectorRepository();
        $address = new AddressRepository();
        $addesses = $address->get(['id'], ['sector_id' => $id]);
        foreach($addesses as $addes) {
            $address->update(['sector_id'=>"null" ,"id"=> $addes['id']]);
        }
        $distribute= new AffectRepository();
        if (count($distribute->get([], ['sector_id'=>$id]))==0){ // TODO: changer pour supprimer les lignes de "distribute"
            $repo->delete($id);
        }else{
            $repo->update(['id'=>$id, 'active'=>"false"]);
        }
    }
}