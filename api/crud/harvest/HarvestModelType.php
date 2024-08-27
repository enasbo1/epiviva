<?php

namespace harvest;

use shared\ModelType;
use shared\Verif;
use Exception;

class HarvestModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params, array $default=[]): array
    {
        $arr_params = $this->toArray($params, $default);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"schedule" => "r :d,DMY",
			"sector_id" => "r !int"
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
			"schedule" => $params->schedule ?? $default["schedule"]  ?? null,
			"sector_id" => $params->sector_id ?? $default["sector_id"]  ?? null
        ]);
    }
}