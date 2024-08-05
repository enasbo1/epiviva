<?php
namespace shared;

interface ModelType{
    public function isValidType(object $params):array;

    public function toArray(object $params):array;
}