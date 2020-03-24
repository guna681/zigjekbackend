<?php

namespace App\Http\Controllers\DeliveryBoy;

use Validator;
use App\Http\Utility\Defaults;
use App\Http\Utility\Common;
use Illuminate\Http\Request;
use App\Http\Service\DeliveryBoy\StaffOrderService;


Class StaffOrderController
{



    /**
     * Show DeliveryStaff Past Orders api.
     * @param
     * @return json(orderDetails)
     * */


    public function listPastOrders(request $request)
    {
        $staffOrderService = new StaffOrderService();
        $response          = $staffOrderService->listPastOrders();
        $responsedata      = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * Get the OrderDetails api
     * @param orderId
     * @return array
     * */

    public function viewOrder(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['orderId' => 'required|exists:Orders,id'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $staffOrderService  = new StaffOrderService();
            $response           = $staffOrderService->viewOrder($request);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    /**
     * DeliveryStaff Accept the Order api.
     * @param orderId
     * @return void
     * **/


    public function acceptOrder(request $request)
    {

        $response  = new \stdClass();
        $rules     = ['orderId'=>'required|exists:Orders,id'];
        $validator =Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $staffOrderService  = new StaffOrderService();
            $response           = $staffOrderService->acceptOrder($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * DeliveryStaff Reject the Order api
     * @param orderId
     * @return  void
     * */

    public function rejectOrder(request $request)
    {

        $response  = new \stdClass();
        $rules     = ['orderId'=>'required|exists:Orders,id'];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        }else{
            $staffOrderService   = new StaffOrderService();
            $response            = $staffOrderService->rejectOrder($request);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    /**
     * DeliveryStaff picked the order update Status api.
     * @param orderId
     * @return void
     * */

    public function pickedupOrder(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['orderId'=>'required|exists:Orders,id'];
        $validator  = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        }else{
            $staffOrderService      = new StaffOrderService();
            $response  = $staffOrderService->pickedupOrder($request);
        }

        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }  


    /**
     * Deliveryboy update order Status  api.
     * @param orderId
     * @return void
     * */

    public function deliveredOrder(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['orderId' => 'required|exists:Orders,id'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $staffOrderService = new StaffOrderService();
            $response          = $staffOrderService->deliveredOrder($request);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * Get OrderDetails api
     * @Param
     * @return json
     * */

    public function getOrder(request $request)
    {
        $staffOrderService  = new  StaffOrderService();
        $response           = $staffOrderService->getOrder();
        $responsedata       = Defaults::encode($response);
        return $responsedata;

    }


    public function getAssignedOrder(request $request)
    {
        $staffOrderService  = new  StaffOrderService();
        $response           = $staffOrderService->getAssignedOrder();
        $responsedata       = Defaults::encode($response);
        return $responsedata;

    }



    public function assignedOrder(request $request)
    {
        $staffOrderService = new StaffOrderService();
        $response          = $staffOrderService->assignedOrder();
        $responsedata      = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * DeliveryStaff earning api.
     * @param page
     * @return void
     * **/


public function deliveryBoyEarning(request $request)
    {

        $response  = new \stdClass();
        $rules     = ['page'=>'required'];
        $validator =Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $staffOrderService  = new StaffOrderService();
            $response           = $staffOrderService->deliveryBoyEarning($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

 /**
     * DeliveryStaff earningDetails api.
     * @param orderId
     * @return void
     * **/

 public function earningDetails(request $request)
    {

        $response  = new \stdClass();
        $rules     = ['orderId'=>'required'];
        $validator =Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $staffOrderService  = new StaffOrderService();
            $response           = $staffOrderService->earningDetails($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * DeliveryStaff reachOutlet  api.
     * @param orderId
     * @return void
     * **/


    public function reachOutlet(request $request)
    {

        $response  = new \stdClass();
        $rules     = ['orderId'=>'required'];
        $validator =Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $staffOrderService  = new StaffOrderService();
            $response           = $staffOrderService->reachOutlet($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    } 

      /**
     * DeliveryStaff reachUserLocation  api.
     * @param orderId
     * @return void
     * **/


    public function reachUserLocation(request $request)
    {

        $response  = new \stdClass();
        $rules     = ['orderId'=>'required'];
        $validator =Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $staffOrderService  = new StaffOrderService();
            $response           = $staffOrderService->reachUserLocation($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }      

}