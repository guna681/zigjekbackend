<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Guzzle\Http\Exception\ServerErrorResponseException;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Service\UserdishService;

Class  DishController extends Controller
{
	public function dishList(request $request){
		$data=$request->all();
		$response=UserdishService::getDishes($data);

	}





}