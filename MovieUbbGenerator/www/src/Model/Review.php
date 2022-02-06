<?php
namespace App\model;
use JetBrains\PhpStorm\Internal\TentativeType;
use ReflectionClass;
use ReflectionProperty;

class Review implements \JsonSerializable
{
    private string $imdbId;
    private string $body;
    private string $score;
    private String $source;
    private string $username;
    private string $reviewId;

    /**
     * @return string
     */
    public function getImdbId(): string
    {
        return $this->imdbId;
    }

    /**
     * @param string $imdbId
     * @return Review
     */
    public function setImdbId(string $imdbId): Review
    {
        $this->imdbId = $imdbId;
        return $this;
    }

    /**
     * @return string
     */
    public function getBody(): string
    {
        return $this->body;
    }

    /**
     * @param string $body
     * @return Review
     */
    public function setBody(string $body): Review
    {
        $this->body = $body;
        return $this;
    }

    /**
     * @return string
     */
    public function getScore(): string
    {
        return $this->score;
    }

    /**
     * @param string $score
     * @return Review
     */
    public function setScore(string $score): Review
    {
        $this->score = $score;
        return $this;
    }

    /**
     * @return String
     */
    public function getSource(): string
    {
        return $this->source;
    }

    /**
     * @param String $source
     * @return Review
     */
    public function setSource(string $source): Review
    {
        $this->source = $source;
        return $this;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $username
     * @return Review
     */
    public function setUsername(string $username): Review
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @return string
     */
    public function getReviewId(): string
    {
        return $this->reviewId;
    }

    /**
     * @param string $reviewId
     * @return Review
     */
    public function setReviewId(string $reviewId): Review
    {
        $this->reviewId = $reviewId;
        return $this;
    }


    public function jsonSerialize(): mixed
    {
        $reflect = new ReflectionClass($this);
        $props   = $reflect->getProperties(ReflectionProperty::IS_PRIVATE);
        $jsonrep = [];

        foreach($props as $p){
            $jsonrep[$p->getName()] = $p->getValue($this);
        }
        return $jsonrep;
    }
}