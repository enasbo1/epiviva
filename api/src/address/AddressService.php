<?php
namespace address;

use Exception;
use shared\Service;

include_once "AddressRepository.php";

class AddressService extends Service
{
    public function __construct()
    {
        parent::__construct(new AddressModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new AddressRepository();

        $address = [];
        $result = $repo->readAll("unable to find any address");

        foreach($result as $row) {
            $address[] = $row;
        }

        return $address;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new AddressRepository();
        return $repo->read($id, "address not found");
    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new AddressRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->create($toquery, "unable to create address");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new AddressRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->update($toquery, "unable to update address");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new AddressRepository();
        $repo->delete($id);
    }
}