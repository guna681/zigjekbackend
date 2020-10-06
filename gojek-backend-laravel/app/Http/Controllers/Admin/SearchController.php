<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Service\Admin\SearchService;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Validator;

Class SearchController extends Controller
{

    /**
     * List the Search user
     * @param pageNumber
     * @param key
     * return the perpage 10 user
     * @return json
     */
    public function userSearch(request $request)
    {
        
        $response       = new Response();
        $rules          = ['key' => 'required','pageNumber' => 'required'];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $searchService            = new SearchService();
            $response               = $searchService->userSearch($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }

       /**
     * List the Search DeliveryBoy
     * @param pageNumber
     * @param key
     * return the perpage 10 DeliveryBoy
     * @return json
     */
    public function DeliveryBoySearch(request $request)
    {
        
        $response       = new Response();
        $rules          = ['key' => 'required','pageNumber' => 'required'];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $searchService            = new SearchService();
            $response               = $searchService->DeliveryBoySearch($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }

           /**
     * List the Search restaurants
     * @param pageNumber
     * @param key
     * return the perpage 10 restaurants
     * @return json
     */
    public function restaurantsSearch(request $request)
    {
        
        $response       = new Response();
        $rules          = ['key' => 'required','pageNumber' => 'required'];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $searchService            = new SearchService();
            $response               = $searchService->restaurantsSearch($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }


               /**
     * List the Search order
     * @param pageNumber
     * @param key
     * return the perpage 10 orderSearch
     * @return json
     */
    public function orderSearch(request $request)
    {
        
        $response       = new Response();
        $rules          = ['key' => 'required','pageNumber' => 'required'];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $searchService            = new SearchService();
            $response               = $searchService->orderSearch($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }

             /**
     * List the Search outlet
     * @param pageNumber
     * @param key
     * return the perpage 10 outletSearch
     * @return json
     */
    public function outletSearch(request $request)
    {
        
        $response       = new Response();
        $rules          = ['key' => 'required','pageNumber' => 'required'];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $searchService            = new SearchService();
            $response               = $searchService->outletSearch($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }


    public function payOutletSearch(request $request)
    {
        
        $response       = new Response();
        $rules          = ['key' => 'required','pageNumber' => 'required'];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $searchService            = new SearchService();
            $response               = $searchService->payOutletSearch($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }
 
    public function PayStaffSearch(request $request)
    {
        
        $response       = new Response();
        $rules          = ['key' => 'required','pageNumber' => 'required'];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $searchService            = new SearchService();
            $response               = $searchService->PayStaffSearch($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }      
      
}