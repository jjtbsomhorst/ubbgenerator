<?php

namespace App\Validators;

use Selective\Validation\Exception\ValidationException;
use Selective\Validation\Factory\CakeValidationFactory;
use Selective\Validation\ValidationError;
use Selective\Validation\ValidationResult;

final class ReviewValidator
{
    /**
     * @param array $data
     * @return void
     * @throws ValidationException
     */
    public static function validate(array $data) :void{
        $validationFactory = new CakeValidationFactory();
        $validator = $validationFactory->createValidator();
        $validator
            ->requirePresence(['imdbId','body','source','score','username'])
            ->notEmptyString('imdbId', 'Input required')
            ->notEmptyString('body', 'Input required')
            ->notEmptyString('source','Input required')
            ->notEmptyString('score','Input required')
            ->greaterThan('score',1,'Score must be a value ranging from 1 till 10')
            ->lessThan('score',11,'Score must be a value ranging from 1 till 10');

        $oldImdbIdValidator = $validationFactory->createValidator();
        $newImdbIdValidator = $validationFactory->createValidator();
        $oldImdbIdValidator->regex("imdbId","/tt\\d{7}/","Invalid IMDB ID");
        $newImdbIdValidator->regex('imdbId',"/tt\\d{8}/","Invalid IDMB ID");


        $validationResult = $validationFactory->createValidationResult(
            $validator->validate($data)
        );

        $oldImdbIdResult = $validationFactory->createValidationResult($oldImdbIdValidator->validate($data));
        $newImdbIdResult = $validationFactory->createValidationResult($newImdbIdValidator->validate($data));

        if($validationResult->fails()){
            throw new ValidationException('invalid_data',$validationResult);
        }

        if($oldImdbIdResult->fails() && $newImdbIdResult->fails()){
           throw new ValidationException("invalid_data",$oldImdbIdResult);
        }
    }
}