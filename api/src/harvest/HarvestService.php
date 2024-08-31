<?php
namespace harvest;

use Exception;
use product\ProductRepository;
use shared\Formater;
use shared\Service;

include_once "HarvestRepository.php";

class HarvestService extends Service
{
    public function __construct()
    {
        parent::__construct(new HarvestModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new HarvestRepository();

        $harvest = [];
        $result = $repo->get_harvest([]);

        foreach($result as $row) {
            $harvest[] = Formater::prepareGet($row);
        }

        return $harvest;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new HarvestRepository();

        $harvest = [];
        $result = $repo->get_harvest(['h.id' => $id]);

        foreach($result as $row) {
            $harvest[] = Formater::prepareGet($row);
        }

        return $harvest;
    }

    /**
     * @throws Exception
     */
    public function save(object $input): string
    {
        $repo = new HarvestRepository();
        $toQuery = $this->modelType->isValidType($input);
        return $repo->create($toQuery, "unable to create harvest");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new HarvestRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update harvest");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new HarvestRepository();
        $repo->delete($id);
    }

    /**
     * @throws Exception
     */
    public function findFormSector(int $id):array
    {
        $repo = new HarvestRepository();

        $harvest = [];
        $result = $repo->get_harvest(['h.sector_id' => $id, 'h.collected'=>"false"]);

        foreach($result as $row) {
            $harvest[] = Formater::prepareGet($row);
        }

        return $harvest;
    }

    /**
     * @throws Exception
     */
    public function collect(int $id):void{
        $repo = new HarvestRepository();
        $product = new ProductRepository();
        $product->update_abs(['collected'=>"true"], ['harvest_id'=>$id, 'refused'=>'false']);
        $repo->update(['id'=>$id, 'collected'=>"true"]);
    }

    /**
     * @throws Exception
     */
    public function findProgressing(): array
    {
        $repo = new HarvestRepository();

        $harvest = [];
        $result = $repo->get_harvest(['h.collected'=>"false"]);

        foreach($result as $row) {
            $harvest[] = Formater::prepareGet($row);
        }

        return $harvest;
    }

}