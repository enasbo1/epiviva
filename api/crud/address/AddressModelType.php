<?php

namespace address;

use shared\ModelType;
use shared\Verif;
use Exception;

class AddressModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params, array $default=[]): array
    {
        $arr_params = $this->toArray($params, $default);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"address" => "r",
			"postal_code" => "r",
			"instruction" => "",
			"kind" => ":M,50",
			"id_secteur" => "!int"
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
			"address" => $params->address ?? $default["address"]  ?? null,
			"postal_code" => $params->postal_code ?? $default["postal_code"]  ?? null,
			"instruction" => $params->instruction ?? $default["instruction"]  ?? null,
			"kind" => $params->kind ?? $default["kind"]  ?? null,
			"id_secteur" => $params->id_secteur ?? $default["id_secteur"]  ?? null
        ]);
    }
}