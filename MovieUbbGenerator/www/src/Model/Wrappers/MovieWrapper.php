<?php

namespace App\Model\Wrappers;

use App\model\Movie;
use jjtbsomhorst\omdbapi\model\response\MovieResult;
use phpDocumentor\Reflection\DocBlock\Tags\Source;

class MovieWrapper
{
    public static function wrapFromApi(MovieResult $source) : Movie{
        return (new Movie())
            ->setImdbId($source->getImdbID())
            ->setGenre(explode(",",$source->getGenre()))
            ->setImdbRating($source->getImdbRating())
            ->setYear(intval($source->getYear()))
            ->setPoster($source->getPoster());
    }
}