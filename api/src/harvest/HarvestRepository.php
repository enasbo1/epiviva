<?php
namespace harvest;
use Exception;
use shared\Repository;


class HarvestRepository extends Repository {
    private string $get_harvest=
"
SELECT 
    h.id as id, 
    schedule,
    s.id as sector__id, 
    nom as sector__nom,
    a.id as sector__address__id, 
    a.address as sector__address__address, 
    a.postal_code as sector__address__postal_code, 
    a.city as sector__address__city, 
    a.instruction as sector__address__instruction, 
    a.kind as sector__address__kind
FROM harvest h
inner join sector s on s.id = h.sector_id and s.active
inner join address a on a.id = s.address_id
";

    public function __construct()
    {
        parent::__construct('harvest', new HarvestModelType());
    }

    /**
     * @throws Exception
     */
    public function get_harvest(array $restrict): array
    {
        $q = $this->get_harvest . $this->restrict($restrict) . ';';
        return $this->query($q, $restrict);
    }
}
