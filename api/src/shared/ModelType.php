<?php
namespace shared;

interface ModelType{
    public function isValidType(object $params, array $default=[]):array;

    public function toArray(object $params, array $default=[]):array;
}