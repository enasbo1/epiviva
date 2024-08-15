<?php
namespace message;
use Exception;
use shared\Repository;


class MessageRepository extends Repository {
    private string $get_query =
"SELECT 
    m.id as id,
    text,
    date_send,
    u.id as sender__id,
    u.nom as sender__nom,
    u.prenom as sender__prenom
from message m
inner join users u on u.id = m.sender_id
";

    public function __construct()
    {
        parent::__construct('message', new MessageModelType());
    }

    /**
     * @throws Exception
     */
    public function get_message(array $restrict):array
    {
        $q = $this->get_query . $this->restrict($restrict);
        return $this->query($q, $restrict);
    }
}
