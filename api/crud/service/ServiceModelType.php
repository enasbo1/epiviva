<?php

namespace service;

use shared\ModelType;
use shared\Verif;
use Exception;

class ServiceModelType implements ModelType
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
			"form" => "",
			"description" => ""
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
			"form" => $params->form ?? $default["form"]  ?? null,
			"description" => $params->description ?? $default["description"]  ?? null
        ]);
    }
}