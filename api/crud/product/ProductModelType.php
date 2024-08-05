<?php

namespace product;

use shared\ModelType;
use shared\Verif;
use Exception;

class ProductModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"code_barre" => ":M,24",
			"name" => ":M,128",
			"marque" => ":M,50",
			"id_address" => "r !int"
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
			"code_barre" => isset($params->code_barre)?$params->code_barre:null,
			"name" => isset($params->name)?$params->name:null,
			"marque" => isset($params->marque)?$params->marque:null,
			"id_address" => isset($params->id_address)?$params->id_address:null
        ]);
    }
}