<?php

namespace connexion;

use shared\ModelType;
use shared\Verif;
use Exception;

class ConnexionModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
        $valid = Verif::verification($arr_params,[
			"mail" => "r !email",
			"mdp" => "r"
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
			"mail" => $params->mail ?? null,
			"mdp" => $params->mdp ?? null
        ]);
    }
}