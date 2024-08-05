<?php
namespace users;

use Exception;
use shared\Service;

include_once "UsersRepository.php";

class UsersService extends Service
{
    public function __construct()
    {
        parent::__construct(new UsersModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new UsersRepository();

        $users = [];
        $result = $repo->readAll("unable to find any users");

        foreach($result as $row) {
            $users[] = $row;
        }

        return $users;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new UsersRepository();
        return $repo->read($id, "users not found");
    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new UsersRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->create($toquery, "unable to create users");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new UsersRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->update($toquery, "unable to update users");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new UsersRepository();
        $repo->delete($id);
    }
}