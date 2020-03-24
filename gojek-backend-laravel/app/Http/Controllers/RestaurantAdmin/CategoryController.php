<?php

namespace App\Http\Controllers\RestaurantAdmin;


use App\Http\Repository\CategoryRepostitory;
use App\Http\Utility\Common;
use Illuminate\Http\Request;
use App\Http\Utility\Defaults;
use App\Http\Controllers\Controller;
use App\Http\Service\RestaurantAdmin\CategoryService;
use Illuminate\Support\Facades\Response;
use Validator;

class CategoryController extends Controller
{
    /**
     * List the Outlet MenuCategory for given OutletId
     * @param
     * @return json (parentcategory,childCategory,status)
     * */
    public  function ListCategory(request $request)
    {
        $categoryService  = new CategoryService();
        $response         = $categoryService->listCategory($request->page);
        $responsedata     = Defaults::encode($response);
        return $responsedata;

    }

    /**
     * Get the all category one by one show (inside the add category)
     * @param  ouletId
     * @return json
     * */

    public function getMainCategoryList(request $request)
    {

        $categoryService = new CategoryService();
        $response        =  $categoryService->getListCategory();
        $responsedata    = Defaults::encode($response);
        return $responsedata;

    }


    /**
     * Add the new Category api
     * @param outletId
     * @param parentId is a optional
     * @param categoryName
     * @param status
     *
     * @return void
     **/

    public function addCategory(request $request)
    {
        $response  = new Response();
        $rules     = ['categoryName'=>'required',
                      'status'      =>'required',];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $categoryService  = new CategoryService();
            $response         = $categoryService->addCategory($request);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * Get the category Details for given categoryId
     * @param categoryId
     * @return json (category details)
     *
     */

    public function getCategory(request $request)
    {

        $response   = new Response();
        $rules      = ['categoryId' => 'required|exists:Outlet_MenuCategories,id'];
        $validator  = Validator::make(['categoryId' => $request->categoryId], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $categoryService        = new CategoryService();
            $response               = $categoryService->getCategory($request->categoryId);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }

    /**
     *Update the category details api
     * @param  categoryId (integer), categoryName(string) ,status(0 or 1)
     * @return  void (true or false)
     *
     */

    public function updateCategory(request $request)
    {
        $response  = new Response();
        $rules     = ['categoryId'     => 'required',
                      'categoryName'   => 'required',
                      'status'         => 'required'];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $categoryService        = new CategoryService();
            $response               = $categoryService->editCategory($request);

        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    public function getSubCategory(request $request)
    {
        $categoryService = new CategoryService();
        $response        = $categoryService->getSubCategory();
        $responsedata    = Defaults::encode($response);
        return $responsedata;
    }




    /**
     * Handles the request to delete a Category.
     * @param  int        $id
     * @param  DeleteRequest $request
     * @return Json
     */

    public function deleteCategory(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['id' => 'required|exists:Outlet_MenuCategories,id'];
        $validator  = Validator::make(['id' => $request->id], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $categoryService = new CategoryService();
            $response        = $categoryService->deleteCategory($request->id);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }




}


