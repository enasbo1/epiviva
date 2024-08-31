<?php

namespace helped;

use shared\ModelType;
use shared\Verif;
use Exception;

class HelpedModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params, array $default=[]): array
    {
        $arr_params = $this->toArray($params, $default);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"benefit_id" => "r !int",
			"distribute_id" => "r !int"
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
			"benefit_id" => $params->benefit_id ?? $default["benefit_id"]  ?? null,
			"distribute_id" => $params->distribute_id ?? $default["distribute_id"]  ?? null
        ]);
    }
}