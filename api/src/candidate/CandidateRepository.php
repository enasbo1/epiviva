<?php
namespace candidate;
use shared\Repository;


class CandidateRepository extends Repository {
    public function __construct()
    {
        parent::__construct('candidate', new CandidateModelType());
    }
}
