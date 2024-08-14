<?php
namespace address;
use token\Privilege;
use shared\CrudController;

require_once 'AddressService.php';



class AddressController extends CrudController{
    function get(array $id): void
    {
        $request = new AddressService();
        if ($id == []) {
            $address = $request->getAll();
        } else {
            $address = $request->findById($id[0]);
        }
        echo json_encode($address);
    }

    function post(array $id, object $input): void
    {
        global $_TOKEN;
        $request = new AddressService();
        if ($id == []) {
            Privilege::admin();
            $request->save($input);
        }elseif ($id[0] ==='user'){
            Privilege::allowed();
            $request->replaceFromUser($input, $_TOKEN->user_id);
        }

        http_response_code(201);
        echo('{"message" : "address créé avec succès"}');
    }

    function patch(array $id, object $input): void
    {
        $request = new AddressService();

        Privilege::admin();
        $request->update($input);
    }

    function delete(array $id): void
    {
        $request = new AddressService();
        Privilege::admin();
        $request->delete($id[0]);
    }
}