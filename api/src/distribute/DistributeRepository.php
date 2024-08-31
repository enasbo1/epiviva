<?php
namespace distribute;
use Exception;
use shared\Repository;


class DistributeRepository extends Repository {

    private string $get_affected =
        "
select 
    d.id as id,
    d.done as done,
    d.sector_id as sector_id,
    d.schedule as schedule,
    u.id as distributor__id,
    prenom as distributor__prenom, 
    nom as distributor__nom, 
    mail as distributor__mail, 
    status as distributor__status, 
    num as distributor__num, 
    a.id as distributor__address__id,
    a.address as distributor__address__address, 
    a.postal_code as distributor__address__postal_code, 
    a.city as distributor__address__city,
    a.instruction as distributor__address__instruction,
    a.kind as distributor__address__kind
from distribute d
inner join users u on u.id = d.distributor_id
inner join address a on a.id = u.address_id
";
    private string $get_sector =
    "
select 
    d.id as id,
    d.done as done,
    d.distributor_id as distributor_id,
    d.schedule as schedule,
    s.id as sector__id,
    s.nom as sector__nom,
    a.id as sector__address__id,
    a.address as sector__address__address, 
    a.postal_code as sector__address__postal_code, 
    a.city as sector__address__city,
    a.instruction as sector__address__instruction,
    a.kind as sector__address__kind
from distribute d
inner join sector s on s.id = d.sector_id
inner join address a on a.id = s.address_id
";
    public function __construct()
    {
        parent::__construct('distribute', new DistributeModelType());
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
