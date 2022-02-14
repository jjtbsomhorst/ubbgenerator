<?php
namespace App\model;
use DateTime;
use JetBrains\PhpStorm\Internal\TentativeType;
use jjtbsomhorst\omdbapi\model\response\MovieRating;
use ReflectionClass;
use ReflectionProperty;

class Movie implements \JsonSerializable{

    private string $imdbId;
    /**
     * @var string[]
     */
    private array $genre;
    private int $year;
    private float $imdbRating;
    private string $poster;

    /**
     * @return string
     */
    public function getImdbId(): string
    {
        return $this->imdbId;
    }

    /**
     * @param string $imdbId
     * @return Movie
     */
    public function setImdbId(string $imdbId): Movie
    {
        $this->imdbId = $imdbId;
        return $this;
    }

    /**
     * @return string[]
     */
    public function getGenre(): array
    {
        return $this->genre;
    }

    /**
     * @param string[] $genre
     * @return Movie
     */
    public function setGenre(array $genre): Movie
    {
        $this->genre = $genre;
        return $this;
    }

    /**
     * @return int
     */
    public function getYear(): int
    {
        return $this->year;
    }

    /**
     * @param int $year
     * @return Movie
     */
    public function setYear(int $year): Movie
    {
        $this->year = $year;
        return $this;
    }

    /**
     * @return float
     */
    public function getImdbRating(): float
    {
        return $this->imdbRating;
    }

    /**
     * @param float $imdbRating
     * @return Movie
     */
    public function setImdbRating(float $imdbRating): Movie
    {
        $this->imdbRating = $imdbRating;
        return $this;
    }

    /**
     * @return string
     */
    public function getPoster(): string
    {
        return $this->poster;
    }

    /**
     * @param string $poster
     * @return Movie
     */
    public function setPoster(string $poster): Movie
    {
        $this->poster = $poster;
        return $this;
    }


    public function jsonSerialize(): mixed
    {
        return array(
            "imdbid" => $this->imdbId,
            "imdbRating" => $this->imdbRating,
            "poster" => $this->poster,
            "year" => $this->year,
            "genre"=> $this->genre
        );
    }
}