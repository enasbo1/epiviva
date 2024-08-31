<?php
namespace benefit;

use Exception;
use message\MessageRepository;
use message\MessageService;
use shared\Formater;
use shared\Service;
use token\Privilege;
use users\UsersRepository;

include_once "BenefitRepository.php";

class BenefitService extends Service
{
    public function __construct()
    {
        parent::__construct(new BenefitModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new BenefitRepository();

        $benefit = [];
        $result = $repo->get_benefits([]);

        foreach($result as $row) {
            $benefit[] = Formater::prepareGet($row);
        }

        return $benefit;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new BenefitRepository();

        $benefit = [];
        $result = $repo->get_benefits(['b.id'=>$id]);

        foreach($result as $row) {
            $benefit[] = Formater::prepareGet($row);
        }

        return $benefit;

    }

    /**
     * @throws Exception
     */
    public function save(object $input): string
    {
        $repo = new BenefitRepository();
        $toQuery = $this->modelType->isValidType($input);
        return $repo->create($toQuery, "unable to create benefit");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new BenefitRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update benefit");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new BenefitRepository();
        $repo->delete($id);
    }

    /**
     * @throws Exception
     */
        public function findFromUser(int $user_id): array
    {
        $repo = new BenefitRepository();
        $userRepo = new UsersRepository();
        $user = $userRepo->read($user_id);
        if ($user!=[]) {
            if (isset($user[0]['benefit_id'])){
                return $repo->read($user[0]['benefit_id']);
            }else{
                return [];
            }
        }
        Privilege::forbidden();
    }

    /**
     * @throws Exception
     */
    public function save_form_user(object $input, int $user_id): void
    {
        $userRepo = new UsersRepository();
        $messages = new MessageRepository();
        $user = $userRepo->read($user_id);
        if ($user==[]) {
            Privilege::forbidden();
        }
        if (isset($user[0]['benefit_id'])){
            $input->id = $user[0]['benefit_id'];
            $this->update($input);
            $messages->create(
                [
                    'sender_id' => $user_id,
                    'text' => 'benefit.edited',
                    'benefit_id' => $input->id,
                    'date_send' => date("Y-m-d H:i:s")
                ]
            );
        }else{
            $id = $this->save($input);
            $userRepo->update(
                [
                    'id'=>$user_id,
                    'benefit_id'=>$id
                ]
            );
            $messages->create(
                [
                    'sender_id' => $user_id,
                    'text' => 'benefit.saved',
                    'benefit_id' => $id,
                    'date_send' => date("Y-m-d H:i:s")
                ]
            );
        }

    }

    /**
     * @throws Exception
     */
    public function validate(object $input):void
    {
        $this->update_status($input, 'valid', 'benefit.validateMessage');
    }

    /**
     * @throws Exception
     */
    public function reject(object $input):void
    {
        $this->update_status($input, 'reject', 'benefit.rejectMessage');
    }

    /**
     * @throws Exception
     */
    private function update_status(object $input, string $status, string $message): void
    {
        $repo = new BenefitRepository();
        $messages = new MessageRepository();
        $edited = $this->findById($input->id)[0];
        if (isset($edited)){
            if ($edited['validated'] !== $status) {
                $edited["validated"] = $status;
                $toQuery = $this->modelType->isValidType($input, $edited);
                $repo->update($toQuery, "unable to update candidate");

                $messages->create(
                    [
                        'sender_id' => 1,
                        'receiver_id' => $edited['user']['id'] ?? 0,
                        'text' => $message,
                        'benefit_id' => $input->id,
                        'date_send' => date("Y-m-d H:i:s"),
                        'link'=>"visitor/benefit/detail"
                    ]
                );
            }
        }else{
            throw new Exception("not found", 404);
        }
    }

    /**
     * @throws Exception
     */
    public function getValid(): array
    {
        $repo = new BenefitRepository();

        $benefit = [];
        $result = $repo->get_benefits(['validated'=>'valid']);

        foreach($result as $row) {
            $benefit[] = Formater::prepareGet($row);
        }

        return $benefit;
    }

    /**
     * @throws Exception
     */
    public function fire(object $input): void
    {
        $repo = new BenefitRepository();
        $messages = new MessageRepository();
        $edited = $this->findById($input->id)[0];

        $repo->update(['sector_id'=>"null" ,"id"=> $input->id]);
        $messages->create(
            [
                'sender_id' => 1,
                'receiver_id' => $edited['user']['id'] ?? 0,
                'text' => 'benefit.sector.fired',
                'benefit_id' => $input->id,
                'date_send' => date("Y-m-d H:i:s"),
                'link'=>"visitor/benefit/detail"
            ]
        );
    }

    /**
     * @throws Exception
     */
    public function affect(object $input): void
    {
        $repo = new BenefitRepository();
        $messages = new MessageRepository();
        $edited = $this->findById($input->id)[0];
        $repo->update(['sector_id'=>$input->sector_id ,"id"=> $input->id]);
        $messages->create(
            [
                'sender_id' => 1,
                'receiver_id' => $edited['user']['id'] ?? 0,
                'text' => 'benefit.sector.affected',
                'benefit_id' => $input->id,
                'date_send' => date("Y-m-d H:i:s"),
                'link'=>"visitor/benefit/detail"
            ]
        );
    }

    /**
     * @throws Exception
     */
    public function getFromSector(int $sector_id):array
    {
        $repo = new BenefitRepository();

        $benefit = [];
        $result = $repo->get_benefits(['b.sector_id'=>$sector_id, 'b.validated'=>'valid']);

        foreach($result as $row) {
            $benefit[] = Formater::prepareGet($row);
        }

        return $benefit;

    }
}