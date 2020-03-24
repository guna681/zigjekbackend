<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Service\Admin\BannerService;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Validator;

Class BannerController extends Controller
{

    /**
     * List the all banners and status
     * @param pageNumber
     * return the perpage 10 bannersdetails
     * @return json
     */
    public function listBanners(request $request)
    {

        $bannerService  = new BannerService();
        $response       = $bannerService->listBanners($request->page);
        $responseData   = Defaults::encode($response);
        return $responseData;
    }


    /**
     * Add the banners for outlets.
     * @param  outletId ,bannerImage,status required
     * @retrun boolean
     *
      */
    public function addBanners(request $request)
    {
        $response   = new Response();
        $rules      = ['outletId'    => 'required|exists:Outlets,id',
                       'bannerImage' => 'image|mimes:jpeg,jpg,png,gif|required|max:10000',
                       'status'      => 'required',
                      ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();

        } else {

            $bannerService              = new BannerService();
            $response                   = $bannerService->addBanner($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return boolean
     */

    public function deleteBanner(request $request)
    {

        $response   = new Response();
        $rules      = ['id'    => 'required|exists:Outlets_OfferBanners,id'];
        $validator  = Validator::make(['id' => $request->id], $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();

        } else {

            $bannerService              = new BannerService();
            $response                   = $bannerService->deleteBanner($request->id);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }





}