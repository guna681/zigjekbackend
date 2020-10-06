<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Service\Admin\DeliveryStaffManagementService;
use App\Http\Service\Admin\PaymentManagementService;
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


      public function listPayStaffDetails(request $request)
    {
        $deliveryStaff  = new DeliveryStaffManagementService();
        $response       = $deliveryStaff->listPayStaffDetails($request->deliveryOpt);
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }

    public function listPayStaffBookDetails(request $request)
    {
       
        $response    = new \stdClass();
       $rules       = ['deliveryStaffId' => 'required'];
        $validator   = Validator::make(['deliveryStaffId' => $request->deliveryStaffId], $rules);
        if ($validator->fails()) {
            
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $restaurantMangementService = new DeliveryStaffManagementService();
            $response                   = $restaurantMangementService->listPayStaffBookDetails($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    
    public function listBookDetails(request $request)
    {
       
        $response    = new \stdClass();
       $rules       = ['outletId' => 'required'];
        $validator   = Validator::make(['outletId' => $request->outletId], $rules);
        if ($validator->fails()) {
            
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $restaurantMangementService = new DeliveryStaffManagementService();
            $response                   = $restaurantMangementService->listBookDetails($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

 
     public function getPayStaff(request $request)
    {
        $response   = new \stdClass();
        $validator = Validator::make($request->all(), [
            'id'     => 'required|min:1|max:255',
            'amount'  => 'required|min:1|max:255',
            'option'  => 'nullable| in:1,2',
            'transactionId'  => 'nullable|min:1|max:255',
        ]);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();
        } else {
            $PaymentManagementService      = new PaymentManagementService();
            $response                  = $PaymentManagementService->getPayStaff($request);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    public function listSearchPayStaffDetails(request $request)
    {
        $response   = new \stdClass();
        $validator = Validator::make($request->all(), [
            'option'     => 'required|in:1,2'
        ]);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();
        } else {
            $deliveryStaff  = new DeliveryStaffManagementService();
            $response       = $deliveryStaff->listSearchPayStaffDetails($request);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    public function getTransactionStaff()
    {
        $PaymentManagementService = new PaymentManagementService();
        $response      = $PaymentManagementService->getTransactionStaff();
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }



}

