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
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
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

    public function toArray(object $params): array
    {
        return array_filter([
			"id" => $params->id ?? null,
			"address" => $params->address ?? null,
			"postal_code" => $params->postal_code ?? null,
			"instruction" => $params->instruction ?? null,
			"kind" => $params->kind ?? null,
			"id_secteur" => $params->id_secteur ?? null
        ]);
    }
}