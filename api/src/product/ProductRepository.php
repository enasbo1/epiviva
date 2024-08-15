<?php
namespace product;
use shared\Repository;


class ProductRepository extends Repository {
    public function __construct()
    {
        parent::__construct('product', new ProductModelType());
    }
}
