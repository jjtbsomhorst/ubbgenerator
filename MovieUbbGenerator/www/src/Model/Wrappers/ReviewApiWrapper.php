<?php
namespace App\Model\Wrappers;

use App\Entity\ReviewEntity;
use App\model\Review;

class ReviewApiWrapper
{
    private static function wrapFromArray( array $data) : Review{
                $r =(new Review())

            ->setSource($data['source'])
            ->setImdbId($data['imdbId'])
            ->setScore($data['score'])
            ->setUsername($data['username'])
            ->setBody($data['body']);

        if(isset($data['reviewId']) && !empty($data['reviewId'])){
            $r->setReviewId($data['reviewId']);
        }
        return $r;
    }
    private static function wrapFromEntity( ReviewEntity $data): Review{
        return (new Review())
            ->setBody($data->getBody())
            ->setSource($data->getSource())
            ->setImdbId($data->getImdbid())
            ->setScore($data->getScore())
            ->setUsername($data->getUsername())
            ->setReviewId($data->getReviewid());
}


    public static function wrap(ReviewEntity|array $data) : Review {
        if(is_array($data)){
            return self::wrapFromArray($data);
        }
        return self::wrapFromEntity($data);
    }

    /**
     * @param ReviewEntity[] $data
     * @return Review[]
     */
    public static function wrapCollection(array $data) : array{
        $list = [];
        foreach($data as $r){
            $list[] = self::wrap($r);
        }
        return $list;
    }

    public static function unwrap(Review $review) : ReviewEntity
    {
        return (new ReviewEntity())
                ->setImdbid($review->getImdbId())
                ->setUsername($review->getUsername())
                ->setScore($review->getScore())
                ->setSource($review->getSource())
                ->setBody($review->getBody());
    }
}