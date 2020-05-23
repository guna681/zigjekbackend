<?php

namespace App\Http\Controllers\RestaurantAdmin;

use App\Http\Controllers\Controller;
use App\Http\Service\RestaurantAdmin\OrderManagementService;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use Validator;
use App\Http\Utility\Common;

Class OrderManagementController extends Controller
{


    /**
     * List  Previous Orders  api.
     * delivered and admin rejected orders.
     * @param pageNumber
     * @retrun json
     * */

    public function listPreviousOrders(request $request)
    {
        $orderManagementService = new OrderManagementService();
        $response     = $orderManagementService->listPreviousOrders($request->page);
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * List OngoinOrders api
     * assigned ,unassigned,pickedup order details
     * @param pageNumber
     * @return json
     */

    public function listOngoingOrders(request $request)
    {
        $orderManagementService = new OrderManagementService();
        $response  = $orderManagementService->listOngoingOrders($request->page);
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * List CurrentOrders api
     * assigned ,unassigned,pickedup order details
     * @param pageNumber
     * @return json
     */

    public function listCurrentOrders(request $request)
    {   
        $response   = new \stdClass();
        $rules      = ['pageNumber' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $orderManagementService = new OrderManagementService();
            $response  = $orderManagementService->listCurrentOrders($request->pageNumber);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * List PastOrders api
     * assigned ,unassigned,pickedup and delivery order details
     * @param pageNumber
     * @return json
     */

    public function listPastOrders(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['pageNumber' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $orderManagementService = new OrderManagementService();
            $response               = $orderManagementService->listPastOrders($request->pageNumber);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * List CurrentOrders api
     * assigned ,unassigned,pickedup order details
     * @param pageNumber
     * @return json
     */

    public function newOrders(request $request)
    {   
        $response   = new \stdClass();
        $rules      = ['pageNumber' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
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
            $orderManagementService = new OrderManagementService();
            $response  = $orderManagementService->newOrders($pageNumber,$page_offset);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

        /**
     * Get trackOrders api
     * @param orderId
     *  usersdetails,deliverystaffdetails,restaurantdetails.
     * @return json
     *  */

    public function trackOrders(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['orderId' => 'required'];
        $validator  = Validator::make(['orderId' => $request->orderId], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $orderManagementService = new OrderManagementService();
            $response               = $orderManagementService->trackOrders($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

        /**
     * List newCurrentOrders api
     * assigned ,unassigned,pickedup order details
     * @param pageNumber
     * @return json
     */

    public function newCurrentOrders(request $request)
    {   
        $response   = new \stdClass();
        $rules      = ['pageNumber' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
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
            $orderManagementService = new OrderManagementService();
            $response  = $orderManagementService->newCurrentOrders($pageNumber,$page_offset);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * Get OrdersDetails api
     * @param orderId
     *  usersdetails,deliverystaffdetails,restaurantdetails,dishdetails.
     * @return json
     *  */

    public function getOrders(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['orderId' => 'required'];
        $validator  = Validator::make(['orderId' => $request->orderId], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $orderManagementService = new OrderManagementService();
            $response               = $orderManagementService->getOrders($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * Get OrdersDetails api
     * @param orderId
     *  usersdetails,deliverystaffdetails,restaurantdetails,dishdetails.
     * @return json
     *  */

    public function getRestaurantOrders(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['orderId' => 'required'];
        $validator  = Validator::make(['orderId' => $request->orderId], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $orderManagementService = new OrderManagementService();
            $response               = $orderManagementService->getRestaurantOrders($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }
    /**
     * Update an order status in RestaurantAdmin.
     * @param int $id
     * @param Request $request
     * @return boolean
     */

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
            $orderManagementService = new OrderManagementService();
            $response               = $orderManagementService->updateOrderStatus($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    public function listAdminOrders(request $request)
    {

        $orderManagementService = new OrderManagementService();
        $response     = $orderManagementService->listAdminOrders($request->page);
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    public function listOrdersPopup(request $request)
    {

        $orderManagementService = new OrderManagementService();
        $response     = $orderManagementService->adminListOrdersPopup();
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }    

    public function updateOrderViewStatus(request $request)
    {
        $orderManagementService = new OrderManagementService();
        $response     = $orderManagementService->updateOrderViewStatus();
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

        /**
     * Update an markReady in RestaurantAPP.
     * @param int $id
     * @param Request $request
     * @return boolean
     */

    public function markReady(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['orderId' => 'required','markReady'=>'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $orderManagementService = new OrderManagementService();
            $response               = $orderManagementService->markReady($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


        /**
     * Update an dishes Enable Disable Status in RestaurantAPP.
     * @param int $id
     * @param Request $request
     * @return boolean
     */

    public function dishesEnableDisable(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['dishId' => 'required','status'=>'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $orderManagementService = new OrderManagementService();
            $response               = $orderManagementService->dishesEnableDisable($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    public function homePage(request $request)
    {
        $orderManagementService = new OrderManagementService();
        $response     = $orderManagementService->homePage($request);
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    }