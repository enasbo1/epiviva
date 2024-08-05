<?php
namespace message;

use Exception;
use shared\Service;

include_once "MessageRepository.php";

class MessageService extends Service
{
    public function __construct()
    {
        parent::__construct(new MessageModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new MessageRepository();

        $message = [];
        $result = $repo->readAll("unable to find any message");

        foreach($result as $row) {
            $message[] = $row;
        }

        return $message;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new MessageRepository();
        return $repo->read($id, "message not found");
    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new MessageRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->create($toquery, "unable to create message");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new MessageRepository();
        $toquery = $this->modelType->isValidType($input);
        $repo->update($toquery, "unable to update message");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new MessageRepository();
        $repo->delete($id);
    }
}