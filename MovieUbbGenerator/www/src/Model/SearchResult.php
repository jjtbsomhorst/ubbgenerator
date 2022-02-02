<?php

namespace App\Model;

class SearchResult
{
    private array $Search;
    private int $totalResults;
    private bool $Response;

    /**
     * @return array
     */
    public function getSearch(): array
    {
        return $this->Search;
    }

    /**
     * @param array $Search
     */
    public function setSearch(array $Search): void
    {
        $this->Search = $Search;
    }


}