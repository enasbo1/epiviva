<?php

namespace benefit;

use shared\ModelType;
use shared\Verif;
use Exception;

class BenefitModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params, array $default=[]): array
    {
        $arr_params = $this->toArray($params, $default);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"people" => "r !int",
			"diet" => "",
			"caf" => "r :M,255",
			"secteur_id" => "!int",
			"validated" => ":M,8"
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
			"people" => $params->people ?? $default["people"]  ?? null,
			"diet" => $params->diet ?? $default["diet"]  ?? null,
			"caf" => $params->caf ?? $default["caf"]  ?? null,
			"secteur_id" => $params->secteur_id ?? $default["secteur_id"]  ?? null,
			"validated" => $params->validated ?? $default["validated"]  ?? "wait"
        ]);
    }
}