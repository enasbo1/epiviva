<?php

namespace user;

use shared\ModelType;
use shared\Verif;
use Exception;

class UserModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"prenom" => "r :M,30",
			"nom" => "r :M,100",
			"mail" => "r :M,100",
			"mdp" => "r :M,255",
			"adresse" => "r :M,255",
			"pays" => "r :M,50",
			"ville" => "r :M,50",
			"code_postal" => "r !int",
			"numero" => "r !int",
			"date_inscription" => ":d,MDY",
			"date_modification" => ":d,MDY",
			"role" => "r !int",
			"rang" => "!int",
			"token" => ":M,255",
			"id_ENTREPRISE" => "!int"
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
			"mdp" => isset($params->mdp)?$params->mdp:null,
			"adresse" => isset($params->adresse)?$params->adresse:null,
			"pays" => isset($params->pays)?$params->pays:null,
			"ville" => isset($params->ville)?$params->ville:null,
			"code_postal" => isset($params->code_postal)?$params->code_postal:null,
			"numero" => isset($params->numero)?$params->numero:null,
			"date_inscription" => isset($params->date_inscription)?$params->date_inscription:null,
			"date_modification" => isset($params->date_modification)?$params->date_modification:null,
			"role" => isset($params->role)?$params->role:null,
			"rang" => isset($params->rang)?$params->rang:null,
			"token" => isset($params->token)?$params->token:null,
			"id_ENTREPRISE" => isset($params->id_ENTREPRISE)?$params->id_ENTREPRISE:null
        ]);
    }
}