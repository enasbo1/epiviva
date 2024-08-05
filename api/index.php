<?php
namespace api;

use Exception;
use token\Token;
use user\UserController;

require_once 'src/shared/ModelType.php';
require_once 'src/shared/Repository.php';
require_once 'src/shared/Service.php';
require_once 'src/shared/CrudController.php';
require_once 'src/shared/Formater.php';
require_once 'src/shared/Verif.php';
require_once 'src/token/Privilege.php';
require_once 'src/token/Token.php';

// import {
require_once "crud/user/UserModelType.php";
require_once 'src/user/UserController.php';
// }


header('Access-Control-Allow-Methods: GET, POST,  PATCH, PUT, DELETE, OPTIONS');
header("Content-Type: application/json; charset=utf8");
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
    "user" => new UserController(),
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