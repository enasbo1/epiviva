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
			"address" => ":m,1",
			"postal_code" => ":m,1",
			"instruction" => "r",
			"kind" => ":M,50",
			"id_secteur" => "r !int"
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
			"address" => isset($params->address)?$params->address:null,
			"postal_code" => isset($params->postal_code)?$params->postal_code:null,
			"instruction" => isset($params->instruction)?$params->instruction:null,
			"kind" => isset($params->kind)?$params->kind:null,
			"id_secteur" => isset($params->id_secteur)?$params->id_secteur:null
        ]);
    }
}