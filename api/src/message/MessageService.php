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

    /**
     * @throws Exception
     */
    public function getFromBenefit(int $benefit_id): array
    {
        $repo = new MessageRepository();

        $message = [];
        $result = $repo->get_message(['m.benefit_id'=>$benefit_id]);

        foreach($result as $row) {
            $message[] = Formater::prepareGet($row);
        }

        return $message;
    }

    /**
     * @throws Exception
     */
    public function send(object $input, int $user_id,string $link=''): void
    {
        $input->sender_id = $user_id;
        $input->link = $link;
        $input->date_send = date("Y-m-d H:i:s");
        $input->text = '*'.$input->text.'*';
        $this->save($input);
    }

    /**
     * @throws Exception
     */
    public function sendBenefit(object $input, int $user_id, int $target): void
    {
        $input->receiver_id = $target;
        $this->send($input, $user_id, "visitor/benefit/detail");
    }

    /**
     * @throws Exception
     */
    public function sendCandidate(object $input, int $user_id, int $target): void
    {
        $input->receiver_id = $target;
        $this->send($input, $user_id, "visitor/candidated/$input->candidate_id");
    }

    /**
     * @throws Exception
     */
    public function getUnReads(int $user_id):array
    {
        $repo = new MessageRepository();
        $message = [];
        $result = $repo->get_message(['m.receiver_id'=>$user_id, 'm.read'=>'false']);

        foreach($result as $row) {
            $message[] = Formater::prepareGet($row);
        }

        return $message;
    }

    /**
     * @throws Exception
     */
    public function is_receiver($id, $user_id):bool
    {
        $repo = new MessageRepository();
        return count($repo->get_message(['m.id'=>$id, 'm.receiver_id'=>$user_id]))>0;
    }

    /**
     * @throws Exception
     */
    public function set_read(int $id):void
    {
        $repo = new MessageRepository();
        $repo->update(['id'=>$id, 'read'=>'true']);
    }
}