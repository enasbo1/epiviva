<?php
namespace benefit;

use Exception;
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
        $result = $repo->readAll("unable to find any benefit");

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
        $result = $repo->read($id, "benefit not found");

        foreach($result as $row) {
            $row['diet'] = json_decode($row['diet']);
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
        if (isset($input->diet)){
            $input->diet = json_encode($input->diet);
        }
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
        if (isset($input->diet)){
            $input->diet = json_encode($input->diet);
        }
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
}