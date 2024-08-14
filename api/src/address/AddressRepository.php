<?php
namespace address;
use shared\Repository;


class AddressRepository extends Repository {
    public function __construct()
    {
        parent::__construct('address', new AddressModelType());
    }
}
