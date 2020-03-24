<?php

namespace App\Http\Controllers\RestaurantAdmin;


use App\Http\Controllers\Controller;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use App\Http\Service\RestaurantAdmin\CustomisationCategoryService;
use Validator;
use App\Http\Utility\Common;

Class CustomisationCategoryController extends Controller
{

    /**
     * List the Customisation Category in given outletId'
     * @param pageNumber
     * @return json
     * */
    public function ListCustoimsationCategory(request $request)
    {
        $customisationCategoryService =  new CustomisationCategoryService();
        $response                     =  $customisationCategoryService->ListCustomisationCategory($request->page);
        $responsedata                 =  Defaults::encode($response);
        return $responsedata;

    }

    /*
     * Get the  DishCustomisation Category  in given categoryId and outletId
     * @param customisationcategory Id
     * @return json
     */

    public function getCustomisationCategory(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['id' => 'required|exists:Customisation_Category,id'];
        $validator  = Validator::make(['id' => $request->id], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $customisationCategoryService =  new CustomisationCategoryService();
            $response                     = $customisationCategoryService->getCustomisationCategory($request->id);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }

    /**
     * Add the customisationCategory api
     * @param name(categoryName),type(single or double),status
     * @return boolean
     * **/

    public function addCustomisationCategory(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['name' => 'required', 'type' => 'required', 'status' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $customisationCategoryService =  new CustomisationCategoryService();
            $response                     =  $customisationCategoryService->addCustomisationCategory($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    /**
     * update the DishCustomisationCategory
     * @param id(categoryId),name,type,status
     * @return boolean
     * */
    public function updateCustomisationCategory(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['id'    => 'required',
                       'name'  => 'required',
                       'type'  => 'required',
                       'status'=> 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $customisationCategoryService =  new CustomisationCategoryService();
            $response                     =  $customisationCategoryService->updateCustomisationCategory($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    /*
     * List the customisation category without pagination
     * @param
     * @return json(id,name)
      */

    public function getListCustomisationCategory(request $request)
    {

        $customisationCategoryService =  new CustomisationCategoryService();
        $response                     =  $customisationCategoryService->getListCustomisationCategory();
        $responsedata                 =  Defaults::encode($response);
        return $responsedata;

    }





    /**
     * Handles the request to delete a CustomisationCategory.
     * @param  int        $id
     * @param  DeleteRequest $request
     * @return Json
     */


    public function deleteCustomisationCategory(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['id' => 'required|exists:Customisation_Category,id'];
        $validator  = Validator::make(['id' => $request->id], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $customisationCategoryService =  new CustomisationCategoryService();
            $response             = $customisationCategoryService->deleteCustomisationCategory($request->id);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }





}