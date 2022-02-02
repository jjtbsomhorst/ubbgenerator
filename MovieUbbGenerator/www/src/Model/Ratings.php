<?php

namespace App\Model;

class Ratings
{
    /**
     * @var string
     */
    private $source;

    /**
     * @var string
     */
    private $value;


    /**
     * @return string|null
     */
    public function getSource(): ?string
    {
        return $this->source;
    }

    /**
     * @param string|null $source
     */
    public function setSource(?string $source): void
    {
        $this->source = $source;
    }

    /**
     * @return string|null
     */
    public function getValue(): ?string
    {
        return $this->value;
    }

    /**
     * @param string|null $value
     */
    public function setValue(?string $value): void
    {
        $this->value = $value;
    }
}