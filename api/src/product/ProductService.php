<?php
namespace product;

use Exception;
use shared\Formater;
use shared\Service;

include_once "ProductRepository.php";

class ProductService extends Service
{
    public function __construct()
    {
        parent::__construct(new ProductModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new ProductRepository();

        $product = [];
        $result = $repo->readAll("unable to find any product");

        foreach($result as $row) {
            $product[] = Formater::prepareGet($row);
        }

        return $product;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new ProductRepository();

        $product = [];
        $result = $repo->read($id, "product not found");

        foreach($result as $row) {
            $product[] = Formater::prepareGet($row);
        }

        return $product;

    }

    /**
     * @throws Exception
     */
    public function save(object $input): void
    {
        $repo = new ProductRepository();
        $toQuery = $this->modelType->isValidType($input);
        $repo->create($toQuery, "unable to create product");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new ProductRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update product");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new ProductRepository();
        $repo->delete($id);
    }

    /**
     * @throws Exception
     */
    public function getFromUser(int $user_id, bool $withRefused = true): array
    {
        $repo = new ProductRepository();

        $product = [];
        if ($withRefused) {
            $result = $repo->get([], ['user_id' => $user_id]);
        }else{
            $result = $repo->get([], ['user_id' => $user_id, 'refused'=>"false"]);
        }

        foreach($result as $row) {
            $product[] = Formater::prepareGet($row);
        }

        return $product;
    }

    /**
     * @throws Exception
     */
    public function is_owner(int $id, int $user_id):bool
    {
        $repo = new ProductRepository();
        return count($repo->get(['id'], ["id"=> $id, "user_id" => $user_id])) > 0;
    }

    /**
     * @throws Exception
     */
    public function refuse(object $input): void
    {
        $input->refused = "true";
        $this->update($input);
    }

    /**
     * @throws Exception
     */
    public function set_harvest(object $input):void
    {
        $repo = new ProductRepository();
        $repo->update(["id"=>$input->id, "harvest_id"=>$input->harvest_idZ]);
    }
}