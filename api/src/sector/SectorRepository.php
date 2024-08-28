<?php
namespace sector;
use Exception;
use shared\Repository;


class SectorRepository extends Repository {

    private string $get_query =
"
select
    s.id as id, 
    nom,
    a.id as address__id, 
    address as address__address, 
    postal_code as address__postal_code, 
    city as address__city, 
    instruction as address__instruction, 
    kind as address__kind
from sector s
inner join address a on s.address_id = a.id
";

    public function __construct()
    {
        parent::__construct('sector', new SectorModelType());
    }

    /**
     * @throws Exception
     */
    public function get_sector(array $restrict):array
    {
        {
            $q = $this->get_query . $this->restrict($restrict) . ';';
            return $this->query($q, $restrict);
        }
    }
}
