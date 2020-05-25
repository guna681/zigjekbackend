<?php

namespace App\Http\Controllers\RestaurantAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Service\RestaurantAdmin\DishMangementService;
use App\Http\Utility\Defaults;
use App\Http\Utility\Common;
use Validator;

Class DishMangementController extends Controller
{

    /**
     * Dishes list api with pagination
     * @param pageNumber
     * @return json (disheslist)
     *  */

    public function listDishes(request $request)
    {
       
        $dishMangementService =  new DishMangementService();
        $response             =  $dishMangementService->listDishes($request->page);
        $responsedata         =  Defaults::encode($response);
        return $responsedata;
    }

    /**
     * Dishes list api with pagination
     * @param pageNumber
     * @return json (disheslist)
     *  */

    public function dishesList(request $request)
    {   

       $response   = new \stdClass();
        $rules      = ['pageNumber' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $dishMangementService = new DishMangementService();
            $response             =  $dishMangementService->listDishes($request->pageNumber);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /*
     * Dishes add api
     * @param dishname(char),image(varchar),isveg(int),isRecommended(int),categoryId(int),price(float)
     * customisationcategory
     * @param categoryId(int),item name ,price(float),isselected
     * @return json (boolean)
     */

    public function addDishes(request $request)
    {
        $response  = new \stdClass();
        $rules     = ['name'         => 'required',
                      'price'        => 'required',
                      'quantity'     => 'required',
                      'isRecommended'=> 'required',
                      'isVeg'        => 'required',
                      'categoryId'   => 'required',
                      'showFromTime' => 'required',
                      'showToTime'   => 'required',
                      'status'       => 'required',
                      'image'        => 'required',
                      'customisationCategory'  => 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();

        } else {

            $dishMangementService =  new DishMangementService();
            $response             =  $dishMangementService->addDishes($request);

        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    /**
     * Get the dishes details for given dishId
     * @param dishId
     * @return json
     * */

    public function getDishes(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['id' => 'required'];
        $validator  = Validator::make(['id' => $request->id], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $dishMangementService = new DishMangementService();
            $response             = $dishMangementService->getDishes($request->id);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * Update dishes details  api
     * @param dissId ,dishName,status
     * @param customisationCategory (array)
     * @return boolean
     */

    public function updateDishes(request $request)
    {
        $response  = new \stdClass();
        $rules     = ['dishId'       =>'required',
                      'name'         => 'required',
                      'price'        => 'required',
                      'quantity'     => 'required',
                      'isRecommended'=> 'required',
                      'isVeg'        => 'required',
                      'categoryId'   => 'required',
                      'showFromTime' => 'required',
                      'showToTime'   => 'required',
                      'status'       => 'required',
                      'customisationCategory'  => 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();

        } else {

            $dishMangementService =  new DishMangementService();
            $response             =  $dishMangementService->updateDishes($request);

        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * Handles the request to delete a Dish.
     * @param  int        $id
     * @param  DeleteRequest $request
     * @return Json
     */

    public function deleteDish(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['id' => 'required|exists:Dishes,id'];
        $validator  = Validator::make(['id' => $request->id], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $dishMangementService = new DishMangementService();
            $response             = $dishMangementService->deleteDishes($request->id);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * dish Search api with pagination
     * @param pageNumber
     * @return json (disheslist)
     *  */

    public function dishSearch(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['key' => 'required','pageNumber' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $dishMangementService = new DishMangementService();
            $response             = $dishMangementService->dishSearch($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * edit dishes details  api
     * @param dissId ,dishName,price
     * @return boolean
     */

    public function editDishes(request $request)
    {
        $response  = new \stdClass();
        $rules     = ['dishId'       =>'required',
                      'name'         => 'required',
                      'price'        => 'required',
                      'isVeg'        => 'required'
                  ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();

        } else {

            $dishMangementService =  new DishMangementService();
            $response             =  $dishMangementService->editDishes($request);

        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * upload file  api
     * @param file
     * @return boolean
     */

    public function fileUpload(request $request)
    {
        $response  = new \stdClass();
        $rules     = ['file'       =>'required'
                  ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();

        } else {

            $dishMangementService =  new DishMangementService();
            $response             =  $dishMangementService->fileUpload($request);

        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

}
