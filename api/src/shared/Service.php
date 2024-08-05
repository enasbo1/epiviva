<?php

namespace shared;

abstract class Service
{
    protected ModelType $modelType;

    public function __construct(modelType $modelType)
    {
        $this->modelType = $modelType;
    }

    abstract public function getAll(): array;

    abstract public function findById(int $id): array;

    abstract public function save(object $input): void;

    abstract public function update(object $input): void;

    abstract public function delete(int $id): void;

}