<?php
namespace users;
use Exception;
use shared\Repository;


class UsersRepository extends Repository {
    public function __construct()
    {
        parent::__construct('users', new UsersModelType());
    }

    /**
     * @throws Exception
     */
    public function connect(string $email, string $password): array
    {
        return $this->get($this->modelName, ["id", "prenom", "nom", "status"], ["mail" => $email, "mdp"=>$password], "users not found");
    }
}
