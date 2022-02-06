<?php
namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ReviewRepository;
/**
 * @ORM\Entity
 * @ORM\Table(name="review")
 * @ORM\Entity(repositoryClass=ReviewRepository::class)
 */
class ReviewEntity
{

    /**
     * @ORM\Column(type="string")
     */
    private string $imdbid;
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private int $reviewid;
    /**
     * @ORM\Column(type="text")
     */
    private string $body;
    /**
     * @ORM\Column(type="decimal")
     */
    private string $score;
    /**
     * @ORM\Column(type="string")
     */
    private string $username;
    /**
     * @ORM\Column(type="string")
     */
    private string $source;

    /**
     * @return string
     */
    public function getImdbid(): string
    {
        return $this->imdbid;
    }

    /**
     * @param string $imdbid
     * @return ReviewEntity
     */
    public function setImdbid(string $imdbid): ReviewEntity
    {
        $this->imdbid = $imdbid;
        return $this;
    }

    /**
     * @return int
     */
    public function getReviewid(): int
    {
        return $this->reviewid;
    }

    /**
     * @param int $reviewid
     * @return ReviewEntity
     */
    public function setReviewid(int $reviewid): ReviewEntity
    {
        $this->reviewid = $reviewid;
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
     * @return ReviewEntity
     */
    public function setBody(string $body): ReviewEntity
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
     * @return ReviewEntity
     */
    public function setScore(string $score): ReviewEntity
    {
        $this->score = $score;
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
     * @return ReviewEntity
     */
    public function setUsername(string $username): ReviewEntity
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @return string
     */
    public function getSource(): string
    {
        return $this->source;
    }

    /**
     * @param string $source
     * @return ReviewEntity
     */
    public function setSource(string $source): ReviewEntity
    {
        $this->source = $source;
        return $this;
    }

}