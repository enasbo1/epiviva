<?php

namespace sector;

use shared\ModelType;
use shared\Verif;
use Exception;

class SectorModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params, array $default=[]): array
    {
        $arr_params = $this->toArray($params, $default);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"nom" => "r",
			"active" => "",
			"address_id" => "r !int"
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
			"nom" => $params->nom ?? $default["nom"]  ?? null,
			"active" => $params->active ?? $default["active"]  ?? "true",
			"address_id" => $params->address_id ?? $default["address_id"]  ?? null
        ]);
    }
}