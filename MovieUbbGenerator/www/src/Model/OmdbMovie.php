<?php

namespace App\Model;

class OmdbMovie
{
    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $year;

    /**
     * @var string
     */
    private $rated;

    /**
     * @var string
     */
    private $released;

    /**
     * @var string
     */
    private $runtime;

    /**
     * @var string
     */
    private $genre;

    /**
     * @var string
     */
    private $director;

    /**
     * @var string
     */
    private $writer;

    /**
     * @var string
     */
    private $actors;

    /**
     * @var string
     */
    private $plot;

    /**
     * @var string
     */
    private $language;

    /**
     * @var string
     */
    private $country;

    /**
     * @var string
     */
    private $awards;

    /**
     * @var string
     */
    private $poster;

    /**
     * @var array
     */
    private $ratings;

    /**
     * @var string
     */
    private $metascore;

    /**
     * @var string
     */
    private $imdbRating;

    /**
     * @var string
     */
    private $imdbVotes;

    /**
     * @var string
     */
    private $imdbID;

    /**
     * @var string
     */
    private $type;

    /**
     * @var string
     */
    private $dVD;

    /**
     * @var string
     */
    private $boxOffice;

    /**
     * @var string
     */
    private $production;

    /**
     * @var string
     */
    private $website;

    /**
     * @var string
     */
    private $response;


    /**
     * @return string|null
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string|null $title
     */
    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    /**
     * @return string|null
     */
    public function getYear(): ?string
    {
        return $this->year;
    }

    /**
     * @param string|null $year
     */
    public function setYear(?string $year): void
    {
        $this->year = $year;
    }

    /**
     * @return string|null
     */
    public function getRated(): ?string
    {
        return $this->rated;
    }

    /**
     * @param string|null $rated
     */
    public function setRated(?string $rated): void
    {
        $this->rated = $rated;
    }

    /**
     * @return string|null
     */
    public function getReleased(): ?string
    {
        return $this->released;
    }

    /**
     * @param string|null $released
     */
    public function setReleased(?string $released): void
    {
        $this->released = $released;
    }

    /**
     * @return string|null
     */
    public function getRuntime(): ?string
    {
        return $this->runtime;
    }

    /**
     * @param string|null $runtime
     */
    public function setRuntime(?string $runtime): void
    {
        $this->runtime = $runtime;
    }

    /**
     * @return string|null
     */
    public function getGenre(): ?string
    {
        return $this->genre;
    }

    /**
     * @param string|null $genre
     */
    public function setGenre(?string $genre): void
    {
        $this->genre = $genre;
    }

    /**
     * @return string|null
     */
    public function getDirector(): ?string
    {
        return $this->director;
    }

    /**
     * @param string|null $director
     */
    public function setDirector(?string $director): void
    {
        $this->director = $director;
    }

    /**
     * @return string|null
     */
    public function getWriter(): ?string
    {
        return $this->writer;
    }

    /**
     * @param string|null $writer
     */
    public function setWriter(?string $writer): void
    {
        $this->writer = $writer;
    }

    /**
     * @return string|null
     */
    public function getActors(): ?string
    {
        return $this->actors;
    }

    /**
     * @param string|null $actors
     */
    public function setActors(?string $actors): void
    {
        $this->actors = $actors;
    }

    /**
     * @return string|null
     */
    public function getPlot(): ?string
    {
        return $this->plot;
    }

    /**
     * @param string|null $plot
     */
    public function setPlot(?string $plot): void
    {
        $this->plot = $plot;
    }

    /**
     * @return string|null
     */
    public function getLanguage(): ?string
    {
        return $this->language;
    }

    /**
     * @param string|null $language
     */
    public function setLanguage(?string $language): void
    {
        $this->language = $language;
    }

    /**
     * @return string|null
     */
    public function getCountry(): ?string
    {
        return $this->country;
    }

    /**
     * @param string|null $country
     */
    public function setCountry(?string $country): void
    {
        $this->country = $country;
    }

    /**
     * @return string|null
     */
    public function getAwards(): ?string
    {
        return $this->awards;
    }

    /**
     * @param string|null $awards
     */
    public function setAwards(?string $awards): void
    {
        $this->awards = $awards;
    }

    /**
     * @return string|null
     */
    public function getPoster(): ?string
    {
        return $this->poster;
    }

    /**
     * @param string|null $poster
     */
    public function setPoster(?string $poster): void
    {
        $this->poster = $poster;
    }

    /**
     * @return array|null
     */
    public function getRatings(): ?array
    {
        return $this->ratings;
    }

    /**
     * @param array|null $ratings
     */
    public function setRatings(?array $ratings): void
    {
        $this->ratings = $ratings;
    }

    /**
     * @return string|null
     */
    public function getMetascore(): ?string
    {
        return $this->metascore;
    }

    /**
     * @param string|null $metascore
     */
    public function setMetascore(?string $metascore): void
    {
        $this->metascore = $metascore;
    }

    /**
     * @return string|null
     */
    public function getImdbRating(): ?string
    {
        return $this->imdbRating;
    }

    /**
     * @param string|null $imdbRating
     */
    public function setImdbRating(?string $imdbRating): void
    {
        $this->imdbRating = $imdbRating;
    }

    /**
     * @return string|null
     */
    public function getImdbVotes(): ?string
    {
        return $this->imdbVotes;
    }

    /**
     * @param string|null $imdbVotes
     */
    public function setImdbVotes(?string $imdbVotes): void
    {
        $this->imdbVotes = $imdbVotes;
    }

    /**
     * @return string|null
     */
    public function getImdbID(): ?string
    {
        return $this->imdbID;
    }

    /**
     * @param string|null $imdbID
     */
    public function setImdbID(?string $imdbID): void
    {
        $this->imdbID = $imdbID;
    }

    /**
     * @return string|null
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * @param string|null $type
     */
    public function setType(?string $type): void
    {
        $this->type = $type;
    }

    /**
     * @return string|null
     */
    public function getDVD(): ?string
    {
        return $this->dVD;
    }

    /**
     * @param string|null $dVD
     */
    public function setDVD(?string $dVD): void
    {
        $this->dVD = $dVD;
    }

    /**
     * @return string|null
     */
    public function getBoxOffice(): ?string
    {
        return $this->boxOffice;
    }

    /**
     * @param string|null $boxOffice
     */
    public function setBoxOffice(?string $boxOffice): void
    {
        $this->boxOffice = $boxOffice;
    }

    /**
     * @return string|null
     */
    public function getProduction(): ?string
    {
        return $this->production;
    }

    /**
     * @param string|null $production
     */
    public function setProduction(?string $production): void
    {
        $this->production = $production;
    }

    /**
     * @return string|null
     */
    public function getWebsite(): ?string
    {
        return $this->website;
    }

    /**
     * @param string|null $website
     */
    public function setWebsite(?string $website): void
    {
        $this->website = $website;
    }

    /**
     * @return string|null
     */
    public function getResponse(): ?string
    {
        return $this->response;
    }

    /**
     * @param string|null $response
     */
    public function setResponse(?string $response): void
    {
        $this->response = $response;
    }
}