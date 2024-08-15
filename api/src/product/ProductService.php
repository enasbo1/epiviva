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
}