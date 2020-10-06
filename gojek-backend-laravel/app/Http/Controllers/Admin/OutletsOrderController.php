<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Service\Admin\OutletsOrderService;
use App\Http\Service\Admin\PaymentManagementService;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;

use Validator;

Class OutletsOrderController extends Controller
{


    /*
     * List the today Outlets orders  api for admin
     * @param pageNumber
     * @return json
     * **/


    public function listOutletOrders(request $request)
    {
        $outletOrderService = new OutletsOrderService();
        $response           = $outletOrderService->listOutletsOrders($request->page);
        $responsedata       = Defaults::encode($response);
        return $responsedata;
    }



    public function getOutletOrder(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['orderId' => 'required'];
        $validator  = Validator::make(['orderId' => $request->orderId], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $outletOrderService = new OutletsOrderService();
            $response               = $outletOrderService->getOutletOrder($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }




    public function updateOrderStatus(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['orderId' => 'required','orderStatus'=>'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $outletOrderService = new OutletsOrderService();
            $response               = $outletOrderService->updateOrderStatus($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    public function updateOrderViewStatus(request $request)
    {

       
            $outletOrderService = new OutletsOrderService();
            $response               = $outletOrderService->updateOrderViewStatus();
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    public function getReportsData(request $request)
    {
        $outletOrderService = new OutletsOrderService();
        $response           = $outletOrderService->getReportsData();
        $responsedata       = Defaults::encode($response);
        return $responsedata;
    }


    public function reportSearchData(request $request)
    {

        $response           = new \stdClass();
        $outletOrderService = new OutletsOrderService();
        $response           = $outletOrderService->reportSearchData($request);
        
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


  public function listPayOutletByResturat(request $request)
    {
        $response           = new \stdClass();
        $validator = Validator::make($request->all(), [
            'RestaurantId'     => 'required|min:1|max:255'
        ]);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = true;
            $response->errorMessage     = $data->first();
        } else {
        $outletOrderService = new OutletsOrderService();
        $response           = $outletOrderService->listPayOutletByResturat($request);
      
        }
        $responsedata       = Defaults::encode($response);
        return $responsedata;
    }

    public function manualAssignOrder(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['orderId' => 'required','staffId' => 'required', 'name' => 'required', 'os' => 'required', 'deviceToken' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $outletOrderService = new OutletsOrderService();
            $response               = $outletOrderService->manualAssignOrder($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    public function listPayOutlet(request $request)
        {
            $outletOrderService = new OutletsOrderService();
            $response           = $outletOrderService->listPayOutlet();
            $responsedata       = Defaults::encode($response);
            return $responsedata;
        }

    
        public function listSearchPayOutlet(request $request)
        {
            $response           = new \stdClass();
            $validator = Validator::make($request->all(), [
                'option'     => 'required|in:1,2'
            ]);
            if ($validator->fails()) {
                $data                       = $validator->messages();
                $response->error            = true;
                $response->errorMessage     = $data->first();
            } else {
            $outletOrderService = new OutletsOrderService();
            $response           = $outletOrderService->listSearchPayOutlet($request);
            }
            $responsedata       = Defaults::encode($response);
            return $responsedata;
        }



    public function getPayOutlet(request $request)
    {
        $response   = new \stdClass();
        $validator = Validator::make($request->all(), [
            'id'     => 'required|min:1|max:255',
            'amount'  => 'required|min:1|max:255',
            'option'  => 'nullable|in:1,2',
            'transactionId'  => 'nullable|min:1|max:255',
        ]);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();
        } else {
            $PaymentManagementService      = new PaymentManagementService();
            $response                  = $PaymentManagementService->getPayOutlet($request);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    public function getTransactionOutlet()
    {
        $PaymentManagementService = new PaymentManagementService();
        $response      = $PaymentManagementService->getTransactionOutlet();
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }





}

