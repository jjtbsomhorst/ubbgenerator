<?php
namespace App\Services;

use aharen\OMDbApi;

class MovieService{

    private OMDbAPI $api;

    /**
     * Class constructor.
     */
    public function __construct(OMDbApi $api)
    {
        $this->api = $api;
    }

    public function getMovieByName($name) {
        return $this->api->fetch('t',$name,['type'=>'movie']);
    }
    public function getMovieById($id){
        return $this->api->fetch('i',$id,['type'=>'movie']);
    }
    public function getSerieByName($name){
        return $this->api->fetch('t',$name,['type'=>'series']);
    }

    public function getSerieById($id){
        return $this->api->fetch('i',$id,['type'=>'series']);
    }

    public function isImdbId(string $term) : bool
    {
        return OMDbApi::validateIMDBid($term);
    }

}