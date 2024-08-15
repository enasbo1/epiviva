<?php

namespace distribute;

use shared\ModelType;
use shared\Verif;
use Exception;

class DistributeModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params, array $default=[]): array
    {
        $arr_params = $this->toArray($params, $default);
        $valid = Verif::verification($arr_params,[
			"user_id" => "r !int",
			"secteur_id" => "r !int"
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
			"user_id" => $params->user_id ?? $default["user_id"]  ?? null,
			"secteur_id" => $params->secteur_id ?? $default["secteur_id"]  ?? null
        ]);
    }
}