<?php
namespace connexion;
use shared\Repository;


class ConnexionRepository extends Repository {
    public function __construct()
    {
        parent::__construct('connexion', new ConnexionModelType());
    }
}
