<?php
namespace benefit;
use Exception;
use shared\Repository;


class BenefitRepository extends Repository {
    private string $get_query =
"SELECT 
    b.id as id, 
    people, 
    diet, 
    caf, 
    validated, 
    secteur_id,
    u.id as user__id, 
    prenom as user__prenom, 
    nom as user__nom, 
    mail as user__mail, 
    status as user__status
from benefit b
inner join public.users u on b.id = u.benefit_id
";

    public function __construct()
    {
        parent::__construct('benefit', new BenefitModelType());
    }

    /**
     * @throws Exception
     */
    public function get_benefits(array $restrict): array
    {
        $q = $this->get_query . $this->restrict($restrict) . ';';
        return $this->query($q, $restrict);
    }
}
