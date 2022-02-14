<?php

namespace App\Model\Wrappers;

use JetBrains\PhpStorm\Internal\TentativeType;
use ReflectionClass;
use ReflectionProperty;

class ListResult implements \JsonSerializable
{
    private array $search = [];
    private int $totalResults;
    private int $currentPage;

    /**
     * @return array
     */
    public function getSearch(): array
    {
        return $this->search;
    }

    /**
     * @param array $search
     */
    public function setSearch(array $search): void
    {
        $this->search = $search;
    }

    /**
     * @return int
     */
    public function getTotalResults(): int
    {
        return $this->totalResults;
    }

    /**
     * @param int $totalResults
     */
    public function setTotalResults(int $totalResults): void
    {
        $this->totalResults = $totalResults;
    }

    /**
     * @return int
     */
    public function getCurrentPage(): int
    {
        return $this->currentPage;
    }

    /**
     * @param int $currentPage
     */
    public function setCurrentPage(int $currentPage): void
    {
        $this->currentPage = $currentPage;
    }


    public function jsonSerialize(): mixed
    {
        $content = [];
        $content['totalResults'] = $this->totalResults;
        $content['currentPage'] = $this->currentPage;
        $content['search'] = $this->getSearch();
        return $content;
    }
}