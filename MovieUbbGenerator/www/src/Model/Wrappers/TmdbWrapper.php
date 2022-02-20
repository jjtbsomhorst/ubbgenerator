<?php

namespace App\Model\Wrappers;

use App\model\Movie;
use Kerox\Tmdb\Tmdb;

class TmdbWrapper
{
    private Tmdb $client;
    private $genres = [];
    public function __construct(Tmdb $client){
        $this->client = $client;
    }

    private function getGenreById($id): ?string{
        if(empty($this->genres)){
            $this->genres = json_decode($this->client->genres()->movieList()->getBody(),true);
        }


        foreach($this->genres['genres'] as $genre){
            if($genre['id'] == $id){
                return $genre['name'];
            }
        }
        return "";
    }

    /**
     * @return Movie[]
     */
    public function wrapCollection(array $objects): array{
        $returnValue = [];



        foreach($objects as $o){

            $genres = [];
            foreach($o['genre_ids'] as $genre_id){
                $name = $this->getGenreById($genre_id);
                if(!empty($name)){
                    $genres[] = $name;
                }
            }

            $externalIds = json_decode($this->client->movies()->externalIds($o['id'])->getBody(),true);

            $m = new Movie();
            $releaseDate = new \DateTime($o['release_date']);
            $m->setYear(intval($releaseDate->format("Y")));
            $m->setTitle($o['original_title']);
            $m->setPoster($o['poster_path']);
            $m->setImdbId($externalIds['imdb_id']);
            $m->setImdbRating(0);
            $m->setGenre($genres);
            $m->setPlot($o['overview']);
            $returnValue[] = $m;
        }

        return $returnValue;
    }
}