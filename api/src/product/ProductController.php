<?php
namespace product;
use token\Privilege;
use shared\CrudController;

require_once 'ProductService.php';



class ProductController extends CrudController{
    function get(array $id): void
    {
        $request = new ProductService();
        if ($id == []) {
            $product = $request->getAll();
        } else {
            $product = $request->findById($id[0]);
        }
        echo json_encode($product);
    }

    function post(array $id, object $input): void
    {
        $request = new ProductService();

        Privilege::admin();
        $request->save($input);
        http_response_code(201);
        echo('{"message" : "product créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new ProductService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new ProductService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}