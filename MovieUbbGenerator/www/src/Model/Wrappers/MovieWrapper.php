<?php

namespace App\Model\Wrappers;

use App\model\Movie;
use jjtbsomhorst\omdbapi\model\response\MovieResult;

class MovieWrapper
{
    public static function wrapFromApi(MovieResult $source) : Movie{
        return (new Movie())
            ->setImdbId($source->getImdbID())
            ->setGenre(explode(", ",$source->getGenre()))
            ->setImdbRating($source->getImdbRating())
            ->setYear(intval($source->getYear()))
            ->setTitle($source->getTitle())
            ->setPoster($source->getPoster());

    }
}