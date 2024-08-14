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
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
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

    public function toArray(object $params): array
    {
        return array_filter([
			"id" => $params->id ?? null,
			"nom" => $params->nom ?? null,
			"form" => $params->form ?? null,
			"description" => $params->description ?? null
        ]);
    }
}