<?php
namespace candidate;
use shared\Repository;


class CandidateRepository extends Repository {
    private string $get_query=
"SELECT 
    c.id as id, 
    answer, 
    validated, 
    creation_date, 
    validation_date, 
    last_edited,
    s.id as service__id,
    s.nom as service__nom, 
    form as service__form, 
    description as service__description,
    u.id as user__id, 
    prenom as user__prenom, 
    u.nom as user__nom, 
    mail as user__mail,
    status as user__status,
    address_id as user__address_id
FROM candidate c
inner join service s on s.id = c.service_id
inner join users u on u.id = c.user_id
";

    public function __construct()
    {
        parent::__construct('candidate', new CandidateModelType());
    }

    /**
     * @throws \Exception
     */
    public function get_candidates(array $restrict):array
    {
        $q = $this->get_query . $this->restrict($restrict) . ';';
        return $this->query($q, $restrict);
    }
}
