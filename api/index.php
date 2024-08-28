<?php
namespace api;

use address\AddressController;
use benefit\BenefitController;
use candidate\CandidateController;
use connexion\ConnexionController;
use distribute\DistributeController;
use Exception;
use file\FileController;
use harvest\HarvestController;
use message\MessageController;
use product\ProductController;
use sector\SectorController;
use service\ServiceController;
use token\Token;
use users\UsersController;

require_once 'src/shared/ModelType.php';
require_once 'src/shared/Repository.php';
require_once 'src/shared/Service.php';
require_once 'src/shared/CrudController.php';
require_once 'src/shared/Formater.php';
require_once 'src/shared/Verif.php';
require_once 'src/token/Privilege.php';
require_once 'src/token/Token.php';

// import {
// Imports pour le modèle et le contrôleur des utilisateurs
require_once "crud/users/UsersModelType.php";
require_once 'src/users/UsersController.php';

// Imports pour le modèle et le contrôleur des messages
require_once "crud/message/MessageModelType.php";
require_once 'src/message/MessageController.php';

// Imports pour le modèle et le contrôleur des services
require_once "crud/service/ServiceModelType.php";
require_once 'src/service/ServiceController.php';

// Imports pour le modèle et le contrôleur des sectors
require_once "crud/sector/SectorModelType.php";
require_once 'src/sector/SectorController.php';

// Imports pour le modèle et le contrôleur des adresses
require_once "crud/address/AddressModelType.php";
require_once 'src/address/AddressController.php';

// Imports pour le modèle et le contrôleur des produits
require_once "crud/product/ProductModelType.php";
require_once 'src/product/ProductController.php';

// Imports pour le modèle et le contrôleur de la distribution
require_once "crud/distribute/DistributeModelType.php";
require_once 'src/distribute/DistributeController.php';

require_once "crud/connexion/ConnexionModelType.php";
require_once 'src/connexion/ConnexionController.php';

require_once "crud/candidate/CandidateModelType.php";
require_once 'src/candidate/CandidateController.php';

require_once "crud/benefit/BenefitModelType.php";
require_once 'src/benefit/BenefitController.php';

require_once "crud/harvest/HarvestModelType.php";
require_once 'src/harvest/HarvestController.php';

require_once 'src/file/FileController.php';

// }


header('Access-Control-Allow-Methods: GET, POST,  PATCH, PUT, DELETE, OPTIONS');
header("Content-Type: application/json, multipart/form-data; charset=utf8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: TOKEN");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

if (isset($_SERVER["HTTP_TOKEN"]) && (strlen($_SERVER["HTTP_TOKEN"])>20)){
    try{
        $_TOKEN = Token::decodeToken($_SERVER["HTTP_TOKEN"])['payload'];
    }catch (Exception $e){
        http_response_code($e->getCode());
        echo $e->getMessage();
        exit;
    }
}else{
    $_TOKEN = json_decode(json_encode([
        'user_id' => 0,
        'user_firstname' => '',
        'user_lastname' => '',
        'user_role' => 0,
        'user_enterprise' => 0
    ]));
};

// controllerList {
$controllerList = [
    "users"     => new UsersController(),
    "message"   => new MessageController(),
    "service"   => new ServiceController(),
    "sector"    => new SectorController(),
    "address"   => new AddressController(),
    "product"   => new ProductController(),
    "distribute"=> new DistributeController(),
    "connection"=> new ConnexionController(),
    "candidate" => new CandidateController(),
    "benefit"   => new BenefitController(),
    "file"      => new FileController(),
    "harvest"   => new HarvestController(),
];
// }

if ($_SERVER['REQUEST_METHOD']=="OPTIONS"){
    echo('{"options":"coucou"}');
}
else
{
    if (isset($controllerList[$uri[2]])){
        $controller = $controllerList[$uri[2]];
        $controller->routes(array_slice($uri, 3));
    } else {
        // Page non trouve
        http_response_code(404);
        echo "Page not found";
    }
}