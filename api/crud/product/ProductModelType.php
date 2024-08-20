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
    public function isValidType(object $params, array $default=[]): array
    {
        $arr_params = $this->toArray($params, $default);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"code_barre" => ":M,24",
			"name" => ":M,128",
			"marque" => ":M,50",
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
			"code_barre" => $params->code_barre ?? $default["code_barre"]  ?? null,
			"name" => $params->name ?? $default["name"]  ?? null,
			"marque" => $params->marque ?? $default["marque"]  ?? null,
			"address_id" => $params->address_id ?? $default["address_id"]  ?? null
        ]);
    }
}