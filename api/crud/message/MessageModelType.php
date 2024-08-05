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
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"date_envoie" => ":d,MDY",
			"text" => "r",
			"sender_id" => "r !int",
			"receiver_id" => "r !int"
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
			"date_envoie" => isset($params->date_envoie)?$params->date_envoie:null,
			"text" => isset($params->text)?$params->text:null,
			"sender_id" => isset($params->sender_id)?$params->sender_id:null,
			"receiver_id" => isset($params->receiver_id)?$params->receiver_id:null
        ]);
    }
}