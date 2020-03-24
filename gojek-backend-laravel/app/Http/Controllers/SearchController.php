<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use Illuminate\Support\Facades\Response;
use App\Http\Service\SearchService;
use Validator;


Class  SearchController extends Controller
{

    /**
     * search restaurant api
     * @param  restaurantName,latitude,longitude
     * @return json
     */
    public function searchRestaurants(request $request)
    {
        $response   = new Response();
        $rules      = ['restaurantName' => 'required|min:3',
                       'latitude'       => 'required|numeric',
                       'longitude'      => 'required|numeric',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $searchService          = new SearchService();
            $response               = $searchService->searchRestaurants($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }
	
    /**
     * search searchDishes And Restaurants api
     * @param  restaurantName or dishesName,latitude,longitude
     * @return json
     */
    public function searchDishesAndRestaurants(request $request)
    {
        $response   = new Response();
        $rules      = ['restaurantName' => 'required|min:3',
                       'latitude'       => 'required|numeric',
                       'longitude'      => 'required|numeric',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $searchService          = new SearchService();
            $response               = $searchService->searchDishesAndRestaurants($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


}	