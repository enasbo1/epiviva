<?php
namespace service;
use shared\Repository;


class ServiceRepository extends Repository {
    public function __construct()
    {
        parent::__construct('"service"', new ServiceModelType());
    }
}
