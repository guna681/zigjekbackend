<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Service\Admin\DeliveryStaffManagementService;
use App\Http\Utility\Defaults;
use App\Http\Utility\Common;
use Illuminate\Http\Request;
use Validator;
Class DeliveryStaffManagementController extends Controller
{

    public function listDeliveryStaff(request $request)
    {
        $deliveryStaff = new DeliveryStaffManagementService();
        $response      = $deliveryStaff->listDeliveryStaff($request->pageNumber);
        $responsedata  = Defaults::encode($response);
        return $responsedata;
    }


    public function listStaffDetails(request $request)
    {
        $deliveryStaff  = new DeliveryStaffManagementService();
        $response       = $deliveryStaff->listStaffDetails();
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }



    public function staffApproval(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['status'  => 'required','id'=>'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();
        } else {
            $deliveryStaffService      = new DeliveryStaffManagementService();
            $response                  = $deliveryStaffService->staffApproval($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    public function getStaffDetail(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['id'=>'required'];
        $validator  = Validator::make(['id'=>$request->id], $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();
        } else {
            $deliveryStaffService      = new DeliveryStaffManagementService();
            $response                  = $deliveryStaffService->getStaffDetail($request->id);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    public function getLables(request $request)
    {
        $deliveryStaff = new DeliveryStaffManagementService();
        $response      = $deliveryStaff->getLables();
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }



}

