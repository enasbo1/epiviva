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
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"prenom" => ":M,25",
			"nom" => ":M,100",
			"mail" => "!email",
			"status" => "!int",
			"mdp" => ":m,1",
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

    public function toArray(object $params): array
    {
        return array_filter([
			"id" => isset($params->id)?$params->id:null,
			"prenom" => isset($params->prenom)?$params->prenom:null,
			"nom" => isset($params->nom)?$params->nom:null,
			"mail" => isset($params->mail)?$params->mail:null,
			"status" => isset($params->status)?$params->status:null,
			"mdp" => isset($params->mdp)?$params->mdp:null,
			"id_service" => isset($params->id_service)?$params->id_service:null,
			"id_secteur" => isset($params->id_secteur)?$params->id_secteur:null,
			"id_address" => isset($params->id_address)?$params->id_address:null
        ]);
    }
}