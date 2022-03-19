<?php

namespace App\Model\Wrappers;

use App\model\Movie;
use jjtbsomhorst\omdbapi\model\util\MediaType;
use Kerox\Tmdb\Tmdb;
use jjtbsomhorst\omdbapi\OmdbApiClient;

class TmdbWrapper
{
    private Tmdb $client;
    private OmdbApiClient $omdb;

    private $genres = [];
    public function __construct(Tmdb $client,OmdbApiClient $omdb){
        $this->client = $client;
        $this->omdb = $omdb;
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
            if(!empty($o['original_title'])){
                $m->setTitle($o['original_title']);
            }

            if(!empty($o['poster_path'])){
                $m->setPoster($o['poster_path']);
            }
            if(!empty($externalIds['imdb_id'])){
                $m->setImdbId($externalIds['imdb_id']);
            }           

            if(!empty($o['overview'])){
                $m->setPlot($o['overview']);
            }    
           
            if(!empty($externalIds['imdb_id'])){
                $omdbMovie = $this->omdb->byIdRequest($externalIds['imdb_id'],MediaType::Movie)->execute();
                if(!is_null($omdbMovie)){
                    $m->setImdbRating(floatval($omdbMovie->getImdbRating()));
                }
            }

            $m->setGenre($genres);
           
            $returnValue[] = $m;
        }

        return $returnValue;
    }
}