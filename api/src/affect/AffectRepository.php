<?php
namespace affect;
use Exception;
use shared\Repository;


class AffectRepository extends Repository {

    private string $get_affected =
        "
select 
    d.id as id,
    d.sector_id as sector_id,
    u.id as user__id, 
    prenom as user__prenom, 
    nom as user__nom, 
    mail as user__mail, 
    status as user__status, 
    num as user__num, 
    a.id as user__address__id,
    a.address as user__address__address, 
    a.postal_code as user__address__postal_code, 
    a.city as user__address__city,
    a.instruction as user__address__instruction,
    a.kind as user__address__kind
from affect d
inner join users u on u.id = d.user_id
inner join address a on a.id = u.address_id
";
    private string $get_sector =
    "
select 
    d.id as id,
    d.user_id as user_id,
    s.id as sector__id,
    s.nom as sector__nom,
    a.id as sector__address__id,
    a.address as sector__address__address, 
    a.postal_code as sector__address__postal_code, 
    a.city as sector__address__city,
    a.instruction as sector__address__instruction,
    a.kind as sector__address__kind
from affect d
inner join sector s on s.id = d.sector_id
inner join address a on a.id = s.address_id
";
    public function __construct()
    {
        parent::__construct('affect', new AffectModelType());
    }

    /**
     * @throws Exception
     */
    public function get_affected(array $restrict):array
    {
        {
            $q = $this->get_affected . $this->restrict($restrict) . ';';
            return $this->query($q, $restrict);
        }
    }


    /**
     * @throws Exception
     */
    public function get_sector(array $restrict):array
    {
        {
            $q = $this->get_sector . $this->restrict($restrict) . ';';
            return $this->query($q, $restrict);
        }
    }
}
