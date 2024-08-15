<?php

namespace users;

use shared\ModelType;
use shared\Verif;
use Exception;

class UsersModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params, array $default=[]): array
    {
        $arr_params = $this->toArray($params, $default);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"prenom" => ":M,25",
			"nom" => ":M,100",
			"mail" => "r !email",
			"status" => "r :M,2",
			"num" => "r :e,10",
			"mdp" => "r :m,5",
			"id_service" => "!int",
			"id_secteur" => "!int",
			"id_address" => "!int"
        ]);
        if (
            $valid != "validated"
        ) {
            throw new Exception(json_encode($valid),400);
        }

        return $arr_params;
    }

    public function toArray(object $params, array $default=[]): array
    {
        return array_filter([
			"id" => $params->id ?? $default["id"]  ?? null,
			"prenom" => $params->prenom ?? $default["prenom"]  ?? null,
			"nom" => $params->nom ?? $default["nom"]  ?? null,
			"mail" => $params->mail ?? $default["mail"]  ?? null,
			"status" => $params->status ?? $default["status"]  ?? null,
			"num" => $params->num ?? $default["num"]  ?? null,
			"mdp" => $params->mdp ?? $default["mdp"]  ?? null,
			"id_service" => $params->id_service ?? $default["id_service"]  ?? null,
			"id_secteur" => $params->id_secteur ?? $default["id_secteur"]  ?? null,
			"id_address" => $params->id_address ?? $default["id_address"]  ?? null
        ]);
    }
}