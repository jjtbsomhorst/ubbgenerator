<?php

class RequestValidator{

    public static function validate($body, $type = 'review'){
        try{
            $decoded = json_decode($body,true);
            $keys = ['movie','reviewScore','reviewText','Title'];

            foreach($keys as $k){
                if(!array_key_exists($k,$decoded)){
                    return false;
                }
            }

            if(!is_numeric($decoded['reviewScore'])){
                return false;
            }
            
            if(empty($decoded['reviewText'])){
                return false;
            }

            return true;
        }catch(Exception $e){
            return false;
        }
        
    }


    public static function toArray($body){
        return json_decode($body,true);
    }

}

?>