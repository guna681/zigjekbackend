<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Service\OrderService;
use App\Http\Cron\OrdersEvent;

use Illuminate\Support\Facades\Response;
use Validator;


Class OrderController extends Controller
{

    /**
     * Handles the request to insert the  order details.
     * @param  integer outletId
     * @param  integer deliveryaddressid
     * @param  float   total
     * @param  array  cartId
     * @return void
     *  */

    public function orderConfirm(request $request){
        $response   =new Response();
        $rules      = ['outletId'           =>'required|numeric',
                       'deliveryAddressId'  =>'required|numeric',
                       'netAmount'          => 'required',
                       'udId'               => 'required',
                       'cartId'             => 'required',
                       'paymentType'        => 'required',
                       'orderSuggestions'   => 'max:255'
                        ];
                       // 'token'  =>'required|string'];


        $validator  = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $orderService           = new OrderService();
            $response               = $orderService->orderConfirm($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    /**
     * Get the User orders Details
     * @param
     * @return json(orderDetails)
     * */

    public function listPastOrders(request $request)
    {
      if ($request->pageNumber) {
        if ($request->pageNumber == 1) {
         $pageNumber = 0;
        } else {
         $pageNumber = $request->pageNumber - 1;
        }
         // $pageNumber = $request->pageNumber;
         $page_offset= $pageNumber * 15;
        } else {
         $pageNumber = 0;
         $page_offset= $pageNumber * 15;
        }
        $orderService   = new OrderService();
        $response       = $orderService->listPastOrders($pageNumber,$page_offset);
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }


    public function trackOrders(request $request)
    {
        $response   =new Response();
        $rules      = ['orderId'  =>'required|numeric'];
        $validator  = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $orderService           = new OrderService();
            $response               = $orderService->trackOrders($request->orderId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;


    }


    public function unassignOrder(request $request)
    {
        $orderService           = new OrderService();
        $response          = $orderService->unassignOrder();
        $responsedata      = Defaults::encode($response);
        return $responsedata;
    }


    public function getOrderDetail(request $request)
    {
        $response   =new Response();
        $rules      = ['orderId'  =>'required|numeric'];
        $validator  = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $orderService           = new OrderService();
            $response               = $orderService->getOrderDetail($request->orderId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    public function getUnassignedOrders(request $request)
    {

      $ordersEvent = new OrdersEvent();      
      $response = $ordersEvent->orderAssignEvent();
       return $response;      
    
        
    }

    public function getDeliveryBoyReleaseOrders(request $request)
    {

      $ordersEvent = new OrdersEvent();      
      $response = $ordersEvent->ordersDeliveryBoyAssigned();
       return $response;      
    
        
    }

    public function addRating(request $request)
    {
        $response   =new Response();
        $rules      = ['orderId'        =>'required|numeric',
                       'outletId'       =>'required',
                       'staffId'        =>'required',
                       'orderRating'    =>'required',
                       'deliveryRating' =>'required',
                       // 'feedback'       =>'required'
                       ];
        $validator  = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $orderService           = new OrderService();
            $response               = $orderService->addRating($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    public function skipRating(request $request)
    {
        $response   =new Response();
        $rules      = ['orderId'        =>'required|numeric'];
        $validator  = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $orderService           = new OrderService();
            $response               = $orderService->skipRating($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


}

