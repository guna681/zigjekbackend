<?php

namespace App\Http\Service\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Repository\LocationRepository;
use App\Http\Service\AppconfigService;
use App\Http\Utility\Constant;
use App\Http\Libraries\ServiceProviders\GuzzleServiceProvider;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;


Class LocationService{


    public function selectCity($arg){
        $locationRepository=new LocationRepository();
        $city=$locationRepository->selectCity($arg);
        $data =new DataService();
        if($city){
            $data->error       =Common::error_false;
            $data->errorMessage=trans('Validation.success');           

        }else{
            $data->error       =Common::error_true;
            $data->errorMessage=trans('Validation.failure');    

        }
        return $data;
    }


    
}
