<?php
namespace benefit;
use shared\Repository;


class BenefitRepository extends Repository {
    public function __construct()
    {
        parent::__construct('benefit', new BenefitModelType());
    }
}
