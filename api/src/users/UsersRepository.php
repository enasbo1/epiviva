<?php
namespace users;
use Exception;
use shared\Repository;


class UsersRepository extends Repository {
    private string $get_giving =
"
select * from (
select
    u.id as id, 
    prenom, 
    nom, 
    mail, 
    status, 
    num, 
    (select count(p.id) from product p where  u.id = p.user_id and not p.refused) as gift,
    a.id as address__id, 
    address as address__address, 
    postal_code as address__postal_code, 
    instruction as address__instruction, 
    kind as address__kind, 
    city as address__city,
    sector_id as address__sector_id
from users u
inner join address a on a.id = u.address_id
) as giving
where gift>0
";

    private string $get_volunteer =
        "
select * from (
select
    u.id as id, 
    prenom, 
    nom, 
    mail, 
    status, 
    num, 
    a.id as address__id, 
    address as address__address, 
    postal_code as address__postal_code, 
    instruction as address__instruction, 
    kind as address__kind, 
    city as address__city,
    sector_id as address__sector_id
from users u
inner join address a on a.id = u.address_id
where (select count(c.id) from candidate c where  u.id = c.user_id) > 0 
) as volunteer
";

    public function __construct()
    {
        parent::__construct('users', new UsersModelType());
    }

    /**
     * @throws Exception
     */
    public function connect(string $email, string $password): array
    {
        return $this->get(["id", "prenom", "nom", "status"], ["mail" => $email, "mdp"=>$password], "users not found");
    }

    /**
     * @throws Exception
     */
    public function get_giving(array $restrict): array{
        $q = $this->get_giving . $this->restrict($restrict) . ';';
        return $this->query($q, $restrict);
    }

    /**
     * @throws Exception
     */
    public function get_volunteer(array $restrict): array{
        $q = $this->get_volunteer . $this->restrict($restrict) . ';';
        return $this->query($q, $restrict);
    }
}
