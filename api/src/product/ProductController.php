<?php
namespace product;
use token\Privilege;
use shared\CrudController;

require_once 'ProductService.php';



class ProductController extends CrudController{
    function get(array $id): void
    {
        Privilege::allowed();
        $request = new ProductService();
        if ($id == []) {
            Privilege::admin();
            $product = $request->getAll();
        } else {
            switch ($id[0]){
                case 'self':
                    global $_TOKEN;
                    $product = $request->getFromUser($_TOKEN->user_id);
                    break;
                case 'user':
                    Privilege::rh();
                    $product = $request->getFromUser($id[1], false);
                    break;
                case 'stock':
                    Privilege::rh();
                    $product = $request->get_stock($id[1]);
                    break;
                case 'distribute':
                    Privilege::rh();
                    $product = $request->get_distribute($id[1]);
                    break;
                default:
                    Privilege::rh();
                    $product = $request->findById($id[0]);
                    break;
            }
        }
        echo json_encode($product);
    }

    function post(array $id, object $input): void
    {
        $request = new ProductService();

        if ($id == []) {
            Privilege::admin();
            $request->save($input);
        }else{
            switch ($id[0]){
                case 'self':
                    global $_TOKEN;
                    $input->user_id = $_TOKEN->user_id;
                    $request->save($input);
                    break;
                default:
                    Privilege::forbidden();
            }
        }

        http_response_code(201);
        echo('{"message" : "product créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new ProductService();
        if ($id == []) {
            Privilege::admin();
            $request->update($input);
        }else{
            switch ($id[0]){
                case 'self':
                    global $_TOKEN;
                    if (!$request->is_owner($input->id, $_TOKEN->user_id)) {
                        Privilege::rh();
                    }
                    $request->update($input);
                    break;
                case 'refuse':
                    Privilege::rh();
                    $request->refuse($input);
                    break;
                case 'harvest':
                    Privilege::rh();
                    $request->set_harvest($input);
                    break;
                case 'distribute':
                    Privilege::rh();
                    $request->distribute($input);
                    break;
                case 'unAffect':
                    Privilege::rh();
                    $request->unAffect($input);
                    break;
                default:
                    Privilege::forbidden();
            }
        }
        echo('{"message" : "product mis à jours avec succès"}');
    }

    function delete(array $id): void
    {
        $request = new ProductService();
        Privilege::allowed();
        global $_TOKEN;
        if (!$request->is_owner($id[0], $_TOKEN->user_id)) {
            Privilege::rh();
        }
        $request->delete($id[0]);
        echo('{"message" : "product supprimé avec succès"}');
    }
}