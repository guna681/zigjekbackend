<?php

namespace App\Http\Libraries\GuzzleHttp;

use App\Http\Controllers\Controller;
use League\OAuth2\Server\AuthorizationServer;
use Illuminate\Auth\AuthenticationException;
use Zend\Diactoros\ServerRequest;
use Zend\Diactoros\Response as Psr7Response;
use Illuminate\Http\Request;
use Laravel\Passport\Http\Controllers\ConvertsPsrResponses;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Guzzle\Http\Exception\ServerErrorResponseException;

Class  GuzzleServices{

    use ConvertsPsrResponses;
    private  $request;
    private  $authServer;


    public function __Construct(request $request,AuthorizationServer $authServer){

        $this->request = $request;
        $this->authServer = $authServer;
    }



    public  function  accesstokenProxy($parsedBody){

        $serverRequest = new ServerRequest(
            $this->request->server(),
            [],
            null,
            $this->request->method(),
            'php://input',
            $this->request->header(),
            [],
            [],
            $parsedBody
        );

        $response = $this->convertResponse(
            $this->authServer->respondToAccessTokenRequest($serverRequest, new Psr7Response)
        );
        $token= json_decode($response->getContent());
        return $token->access_token;
    }





	public static function  getClientToken($value){

         $client = new Client();
         try{
		 $res = $client->request('POST', $value->clientUrl, [
                'form_params' => [
                'client_id' => $value->clientId,
                'client_secret' =>$value->clientSecret,
                'grant_type' => 'password',
                'username' => $value->userName,
                'password' => $value->password,
                'scope' => '*'               
            ]
            
        ]);
         $accessToken = json_decode((string) $res->getBody(), true)['access_token'];   
          }catch(\GuzzleHttp\Exception\BadResponseException $ex) {
                $jsonresp=$ex->getMessage();
                return false;
            }

         return $accessToken;

	}





	
}