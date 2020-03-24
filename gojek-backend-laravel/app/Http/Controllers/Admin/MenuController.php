<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\Constant;
use App\Http\Service\Admin\MenuService;
use Illuminate\Support\Facades\Response;
use Validator;
use Mail;


Class  MenuController extends Controller
{


    public function listCuisines(request $request)
    {
        $menuService    = new MenuService();
        $response       = $menuService->listCuisines($request->page);
        $responseData   = Defaults::encode($response);
        return $responseData;
    }


    public function addCuisines(request $request)
    {
        $response   = new Response();
        $rules      = ['cuisinesName' => 'required',
                       'status'       => 'required|numeric',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $menuService    =  new MenuService();
            $response       = $menuService->addCuisines($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    public function updateCuisines(request $request)
    {
        $response  = new Response();
        $rules     = ['cuisinesId'   => 'required',
                      'cuisinesName' => 'required',
                      'status'       => 'required|numeric',];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $menuService = new MenuService();
            $response    = $menuService->updateCuisines($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    public function getCuisine(request $request)
    {

        $response   = new Response();
        $rules      = ['cuisinesId' => 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $menuService    = new MenuService();
            $response       = $menuService->getCuisine($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    public function destroyCuisine(request $request)
    {
        $response   = new Response();
        $rules      = ['cuisinesId' => 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $menuService            = new MenuService();
            $response               = $menuService->destroyCuisine($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


}