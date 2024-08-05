<?php
namespace message;
use shared\Repository;


class MessageRepository extends Repository {
    public function __construct()
    {
        parent::__construct('"message"', new MessageModelType());
    }
}
