<?php

namespace message;

use shared\ModelType;
use shared\Verif;
use Exception;

class MessageModelType implements ModelType
{
    /**
     * @throws Exception
     */
    public function isValidType(object $params, array $default=[]): array
    {
        $arr_params = $this->toArray($params, $default);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"date_send" => ":d,MDY",
			"text" => "r",
			"sender_id" => "r !int",
			"receiver_id" => "!int",
			"candidate_id" => "!int"
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
			"date_send" => $params->date_send ?? $default["date_send"]  ?? null,
			"text" => $params->text ?? $default["text"]  ?? null,
			"sender_id" => $params->sender_id ?? $default["sender_id"]  ?? null,
			"receiver_id" => $params->receiver_id ?? $default["receiver_id"]  ?? null,
			"candidate_id" => $params->candidate_id ?? $default["candidate_id"]  ?? null
        ]);
    }
}