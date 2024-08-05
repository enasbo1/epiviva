<?php
namespace users;
use shared\Repository;


class UsersRepository extends Repository {
    public function __construct()
    {
        parent::__construct('"users"', new UsersModelType());
    }
}
