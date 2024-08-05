<?php
namespace user;

use Exception;
use shared\Service;

include_once "UserRepository.php";

class UserService extends Service
{
    public function __construct()
    {
        parent::__construct(new UserModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new UserRepository();

        $user = [];
        $result = $repo->readAll("unable to find any user");

        foreach($result as $row) {
            $user[] = $row;
        }

        return $user;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new UserRepository();
        return $repo->read($id, "user not found");
    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new UserRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->create($toquery, "unable to create user");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new UserRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->update($toquery, "unable to update user");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new UserRepository();
        $repo->delete($id);
    }
}

