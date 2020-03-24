<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Guzzle\Http\Exception\ServerErrorResponseException;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\RequestData;
use App\Http\Service\Admin\LocationService;
use App\Http\Repository\UserRepository;
use App\Http\Utility\BasicValidation;
use App\Http\Repository\LocationRepository;
use Validator;
use Illuminate\Support\Facades\Response;

class AvailableLocationController extends Controller {

  public function getCountry(){
    $response=new Response();
		$response->error=Common::error_false;
		$response->errorMessage=trans('validation.sucess');
    $locationRepository = new LocationRepository;
    $response->countryList = $locationRepository->getCountry();
    $responsedata=Defaults::encode($response);
    return $responsedata;

  }
  public function getCity(request $request){
    $response=new Response();
		$response->error=Common::error_false;
		$response->errorMessage=trans('validation.sucess');
    $countryId = $request->countryId;
    $locationRepository = new LocationRepository;
    $response->cityList = $locationRepository->getCity($countryId);
    $responsedata=Defaults::encode($response);
    return $responsedata;

  }

  public function  selectedCity(request $request){
    $response=new Response();
    $rules = array(
      'countryId'      => 'required|numeric',	
      'cityId'         =>'required',
      );   
    $validator = Validator::make($request->all(),$rules);        
    if ($validator->fails()) {    
        $data=$validator->messages();
        $response->error=Common::error_true;
        $response->errorMessage=$data->first();		
          
   }else{

      $locationService = new LocationService;
      $response=$locationService->selectCity($request);

              
   }	
    $responsedata=Defaults::encode($response);
    return $responsedata;
  }

}
