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
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
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

    public function toArray(object $params): array
    {
        return array_filter([
			"user_id" => $params->user_id ?? null,
			"secteur_id" => $params->secteur_id ?? null
        ]);
    }
}