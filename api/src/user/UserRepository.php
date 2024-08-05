<?php
namespace user;
use shared\Repository;


class UserRepository extends Repository {
    public function __construct()
    {
        parent::__construct('"user"', new UserModelType());
    }
}
