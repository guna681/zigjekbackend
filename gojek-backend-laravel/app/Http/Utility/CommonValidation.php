<?php

function validateEmail($email){
	$error=array();
	if ((mb_strlen($email) > 96) || !filter_var($email, FILTER_VALIDATE_EMAIL)){
            $error='true';
        }    

	return $error;
}

function validateMobileNumber($mobileNumber){
	$error=array();
	 if (!preg_match('/^[0-9]+$/', $mobileNumber)){	
           $error='true';
        }
     if ((mb_strlen($mobileNumber) < 3) || (mb_strlen($mobileNumber) > 15)){
     	$error='true';          
        }      
	return $error;
}


function validateCountryCode($countryCode){
    $error=array();
     if (!preg_match('/^[0-9 +]*$/', $countryCode)){    
          $error='true';
        } 

    return $error;    
}





function required($str,$max=false,$min=false){

    $error=array();
    $len = strlen($str);

    if(!empty( $min )){

        if($len < $min){
            $error='true';        
        }    
    }
    
    if(!empty( $min )){
      
      if($len > $max){
       $error='true';
      }
    } 
    if(empty($len)){
        $error='true';
    }
     return $error; 
}
