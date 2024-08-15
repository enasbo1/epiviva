<?php
namespace message;

use Exception;
use shared\Formater;
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
            $message[] = Formater::prepareGet($row);
        }

        return $message;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new MessageRepository();

        $message = [];
        $result =  $repo->read($id, "message not found");

        foreach($result as $row) {
            $message[] = Formater::prepareGet($row);
        }

        return $message;
    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new MessageRepository();
        $toQuery = $this->modelType->isValidType($input);
        $repo->create($toQuery, "unable to create message");
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

    /**
     * @throws Exception
     */
    public function send(object $input, int $user_id): void
    {
        $input->sender_id = $user_id;
        $input->date_send = date("Y-m-d H:i:s");
        $input->text = '*'.$input->text.'*';
        $this->save($input);
    }

    /**
     * @throws Exception
     */
    public function getFromCandidate(int $candidate_id): array
    {
        $repo = new MessageRepository();

        $message = [];
        $result = $repo->get_message(['m.candidate_id'=>$candidate_id]);

        foreach($result as $row) {
            $message[] = Formater::prepareGet($row);
        }

        return $message;
    }
}