<?php

namespace shared;

use Exception;

class Formater
{
    /**
     * @throws Exception
     */
    public static function prepareGet(array $values):array{
        $val = [];
        foreach($values as $col=>$value){
            $i = explode("__",$col);
            self::unref($value, $val, $i);
        }
        return $val;
    }

    private static function unref(&$value, array &$val, array &$ref, int $index = 0): void
    {
        if ($index==(count($ref)-1)){
            $val[$ref[$index]] = $value;
        }else{
            if (!isset($val[$ref[$index]])){
                $val[$ref[$index]] = [];
            }
            self::unref($value, $val[$ref[$index]], $ref, $index+1);
        }

    }
}