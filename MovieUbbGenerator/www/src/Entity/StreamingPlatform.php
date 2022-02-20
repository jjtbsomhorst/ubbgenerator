<?php

namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\StreamingRespository;
/**
 * @ORM\Entity
 * @ORM\Table(name="streamingplatforms")
 * @ORM\Entity(repositoryClass=StreamingRespository::class)
 */
class StreamingPlatform
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private int $id;

    /**
     * @ORM\Column(type="text")
     */
    private string $name;


    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    public function setId(int $id){
        $this->id = $id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return StreamingPlatform
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }


}
