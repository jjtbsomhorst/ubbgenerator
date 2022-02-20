<?php

namespace App\model;

use JetBrains\PhpStorm\Internal\TentativeType;

class StreamingPlatform implements \JsonSerializable
{
    private int $id;
    private string $name;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return int
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }



    public function jsonSerialize(): mixed
    {
        return array(
            'id' => $this->id,
            'name' => $this->name
        );
    }
}