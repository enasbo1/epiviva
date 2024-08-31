<?php
namespace distribute;

use Exception;
use product\ProductRepository;
use shared\Formater;
use shared\Service;

include_once "DistributeRepository.php";

class DistributeService extends Service
{
    public function __construct()
    {
        parent::__construct(new DistributeModelType());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $repo = new DistributeRepository();

        $distribute = [];
        $result = $repo->readAll("unable to find any distribute");

        foreach($result as $row) {
            $distribute[] = Formater::prepareGet($row);
        }

        return $distribute;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $repo = new DistributeRepository();

        $distribute = [];
        $result = $repo->get_affected(['d.id'=>$id]);

        foreach($result as $row) {
            $distribute[] = Formater::prepareGet($row);
        }

        return $distribute;

    }

    /**
     * @throws Exception
     */
    public function save(object $input): string
    {
        $repo = new DistributeRepository();
        $toQuery = $this->modelType->isValidType($input);
        return $repo->create($toQuery, "unable to create distribute");
    }

    /**
     * @throws Exception
     */
    public function update(object $input): void
    {
        $repo = new DistributeRepository();
        $updated = $repo->read($input->id)[0] ?? [];
        $toQuery = $this->modelType->isValidType($input, $updated);
        $repo->update($toQuery, "unable to update distribute");
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): void
    {
        $repo = new DistributeRepository();
        $repo->delete($id);
    }

    /**
     * @throws Exception
     */
    public function get_affected(int $sector_id): array
    {
        $repo = new DistributeRepository();

        $distribute = [];
        $result = $repo->get_affected(['d.sector_id' => $sector_id]);

        foreach($result as $row) {
            $distribute[] = Formater::prepareGet($row);
        }

        return $distribute;

    }

    /**
     * @throws Exception
     */
    public function get_sector(int $user_id): array
    {
        $repo = new DistributeRepository();

        $distribute = [];

        $result = $repo->get_sector(['d.distributor_id' => $user_id]);

        foreach($result as $row) {
            $distribute[] = Formater::prepareGet($row);
        }

        return $distribute;

    }

    /**
     * @throws Exception
     */
    public function is_distributor(int $user_id, int $id):bool
    {
        $repo = new DistributeRepository();
        return count($repo->get(['id'],['id'=>$id, 'distributor_id'=>$user_id]))>0;
    }

    /**
     * @throws Exception
     */
    public function set_done($id): void
    {
        $repo = new DistributeRepository();
        $product = new ProductRepository();
        $product->update_abs(['gave'=>'true'], ['distribute_id'=>$id]);
        $repo->update(['id'=>$id, 'done'=>'true']);
    }
}