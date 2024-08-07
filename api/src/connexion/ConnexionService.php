<?php
namespace connexion;

use Exception;
use token\Token;
use users\UsersRepository;


class ConnexionService
{
    private const SECRET = "d5aatda&-dsgveskfe354/*-+44&";

    public static function hash_password(string $password): string
    {
        return hash_hmac('sha256',$password, ConnexionService::SECRET);
    }


    /**
     * @throws Exception
     */
    public function connect(object $params) : array {
        $modelType = new ConnexionModelType();
        $params = $modelType->isValidType($params);
        $user = new UsersRepository();
        $values = $user->connect($params["mail"], ConnexionService::hash_password($params["mdp"]));
        if (count($values) != 0){
            $value = $values[0];
            return [
                "token" =>Token::createToken(
                    $value["id"],
                    $value["prenom"],
                    $value["nom"],
                    $value["status"],
                ),
                "user" => $value
            ];
        }
        throw new Exception("bad identifiants", 401);
    }
}