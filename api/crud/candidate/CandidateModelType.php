<?php

namespace candidate;

use shared\ModelType;
use shared\Verif;
use Exception;

class CandidateModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params, array $default=[]): array
    {
        $arr_params = $this->toArray($params, $default);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"user_id" => "r",
			"service_id" => "r",
			"answer" => "r",
			"validated" => ""
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
			"user_id" => $params->user_id ?? $default["user_id"]  ?? null,
			"service_id" => $params->service_id ?? $default["service_id"]  ?? null,
			"answer" => $params->answer ?? $default["answer"]  ?? null,
			"validated" => $params->validated ?? $default["validated"]  ?? "wait"
        ]);
    }
}