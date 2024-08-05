<?php
namespace distribute;
use shared\Repository;


class DistributeRepository extends Repository {
    public function __construct()
    {
        parent::__construct('"distribute"', new DistributeModelType());
    }
}
