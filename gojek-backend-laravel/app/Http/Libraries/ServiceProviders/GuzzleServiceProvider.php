<?php

namespace App\Http\Libraries\ServiceProviders;

use App\Http\Libraries\GuzzleHttp\GuzzleServices;
use App\Http\Repository\OauthClientRepostitory;

use League\OAuth2\Server\AuthorizationServer;

use App\Oauthclients;
use Illuminate\Http\Request;


class GuzzleServiceProvider{


    public static function getToken($value,$clientId,$authServer)
    {


        $oauthClientRepostitory = new OauthClientRepostitory();
        $client        = $oauthClientRepostitory->getClientKey($clientId);
        $parsedBody = [
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' =>$client->secret,
            'username' => $value->email,
            'password' => $value->password,
            'scope' => '*',
        ];
        $guzzleServices = new GuzzleServices($value,$authServer);
        $accessToken=$guzzleServices->accesstokenProxy($parsedBody);
        return $accessToken;

    }


 	public static function  getUserToken($value){

 		$userClient=Oauthclients::getUserClient();

 		if($userClient){

			$data =(object) array();
			$data->clientId=$userClient->id;
			$data->clientSecret=$userClient->secret;
			$data->clientUrl=$value->configUrl.'/oauth/token';
			$data->userName=$value->email;
			$data->password=$value->password;
 			$res=GuzzleServices::getClientToken($data);

 		}
 		else{

 			return false;
 		}

 	    return $res;

 	}






}
