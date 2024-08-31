<?php
namespace helped;
use Exception;
use shared\Repository;


class HelpedRepository extends Repository {
    private string $get_benefit =
"
select 
    h.id as help_id,
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
from helped h
inner join benefit b on b.id =h.benefit_id
inner join users u on b.id = u.benefit_id
inner join address a on a.id = u.address_id
";

    public function __construct()
    {
        parent::__construct('helped', new HelpedModelType());
    }

    /**
     * @throws Exception
     */
    public function get_benefit(array $restrict):array
    {
        {
            $q = $this->get_benefit . $this->restrict($restrict) . ';';
            return $this->query($q, $restrict);
        }
    }
}
