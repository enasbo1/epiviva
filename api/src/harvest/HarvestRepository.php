<?php
namespace harvest;
use shared\Repository;


class HarvestRepository extends Repository {
    public function __construct()
    {
        parent::__construct('harvest', new HarvestModelType());
    }
}
