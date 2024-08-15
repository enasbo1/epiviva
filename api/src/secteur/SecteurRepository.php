<?php
namespace secteur;
use shared\Repository;


class SecteurRepository extends Repository {
    public function __construct()
    {
        parent::__construct('secteur', new SecteurModelType());
    }
}
