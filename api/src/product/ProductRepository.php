<?php
namespace product;
use Exception;
use shared\Repository;


class ProductRepository extends Repository {
    private static $get_query =
        "
SELECT 
    p.id as id, 
    code_barre, 
    name, 
    marque, 
    refused, 
    expiration_date, 
    user_id, 
    h.id as harvest__id,
    schedule as harvest__schedule,
    s.id as harvest__sector__id,
    s.nom as harvest__sector__nom,
    a.id as harvest__sector__address__id, 
    address as harvest__sector__address__address, 
    postal_code as harvest__sector__address__postal_code, 
    city as harvest__sector__address__city, 
    instruction as harvest__sector__address__instruction, 
    kind as harvest__sector__address__kind
FROM product p
left join harvest h on h.id = p.harvest_id
left join sector s on s.id = h.sector_id
left join address a on a.id = s.address_id
";
    private string $get_stock =
"
SELECT 
    p.id as id, 
    code_barre, 
    name, 
    marque, 
    expiration_date, 
    user_id
FROM product p
left join harvest h on h.id = p.harvest_id
";

    public function __construct()
    {
        parent::__construct('product', new ProductModelType());
    }

    /**
     * @throws Exception
     */
    public function get_stocks(array $restrict): array
    {
        {
            $q = $this->get_stock . $this->restrict($restrict) . ';';
            return $this->query($q, $restrict);
        }
    }
}
