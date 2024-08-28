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
    b.sector_id as sector_id,
    u.id as user__id, 
    prenom as user__prenom, 
    nom as user__nom, 
    mail as user__mail, 
    status as user__status,
    a.id as user__address__id, 
    a.address as user__address__address, 
    a.postal_code as user__address__postal_code, 
    a.city as user__address__city, 
    a.instruction as user__address__instruction, 
    a.kind as user__address__kind, 
    a.sector_id as user__address__sector_id
from benefit b
inner join users u on b.id = u.benefit_id
inner join address a on a.id = u.address_id
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
