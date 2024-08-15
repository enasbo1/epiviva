<?php
namespace address;

use Exception;
use shared\Formater;
use shared\Service;
use users\UsersRepository;

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
            $address[] = Formater::prepareGet($row);
        }

        return $address;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new AddressRepository();

        $address = [];
        $result = $repo->read($id, "address not found");

        foreach($result as $row) {
            $address[] = Formater::prepareGet($row);
        }

        return $address;

    }


    /**
     * @throws Exception
     */
    public function replaceFromUser(object $input, int $userId): void
    {
        $n = 0;
        $userRepo = new UsersRepository();
        $repo = new AddressRepository();
        $user = $userRepo->read($userId)[0] ?? [];
        if (isset($user['id_address'])) {
            $n = $userRepo->get(['id'], ['id_address' => $user['id_address']]);
            if (count($n) < 2) {
                $n = $user['id_address'];
            }
        }
        $toquery = $this->modelType->isValidType($input);;
        $userRepo->update(
            ['id_address' =>
                $repo->create($toquery, "unable to create address")
                , 'id' => $userId]);
        if ($n !== 0) {
            $repo->delete($n);
        }
    }
    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new AddressRepository();
        $toQuery = $this->modelType->isValidType($input);
        $repo->create($toQuery, "unable to create address");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new AddressRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update address");
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