<?php

namespace App\Http\Service;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Guzzle\Http\Exception\ServerErrorResponseException;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use DB;
use App;

Class AppconfigService{



    private $configUrl;
    private $perPage;



    public function  getConfigUrl(){

    	 return $this->configUrl;
    }

    public function setConfigUrl(string $configurl){
    	$this->configUrl=$configurl;

    }


    public function getPerpage(){
        return $this->perPage;
    }

    public function setPerpage($perpage){
        $this->perPage=$perpage;
    }


    public static function getConfig()
    {

        $language = DB::table('Languages')->where('iso',App::getLocale())->first();
        $data = new \stdClass();
        $data->languagId =$language->id;
        $data->languageCode=$language->iso;

        return $data;
    }

}