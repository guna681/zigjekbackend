<?php

namespace App\Http\Controllers;

use App\Restaurant;
use Illuminate\Http\Request;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Service\CartService;
use App\Http\Repository\RestaurantRepostitory;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Validator;

Class  CartController extends Controller
{

    /**
     * Insert the dishes for cart
     * @param Request $request
     * @param udId  is  userDevice Id
     * @param outletId is integer
     * @param dishes is array ,included dishId,customisation array,quantity
     * @return false|string
     *
     */

    public function addToCart(request $request)
    {

        $response   = new Response();
        $rules      = ['udId'     => 'required',
                       'outletId' => 'required|numeric',
                       'dishes'   => 'required',
                       ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $cartService            = new CartService();
            $response               = $cartService->addToCart($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * Get the cart dishes  and details
     * @param Request $request
     * udId or userId required
     * @return json array
     *
     */
    public function viewCart(request $request)
    {

        $response       = new Response();
        $rules          = ['udId' => 'required'];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $cartService            = new CartService();
            $response               = $cartService->viewCart($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * Update the Dishes quantity in cart
     * @param   dishId ,customisationId
     * @param   isRepeat  update the existing cart dishes are customisation
     * @return  false|string
     */
    public function updateCart(request $request)
    {
        $response   = new Response();
        $rules      = ['cartId'     => 'required|exists:Cart,id',
                       'udId'       => 'required',
                       'outletId'   => 'required|exists:Cart,outletId',
                       'quantity'   => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $cartService            = new CartService();
            $response               = $cartService->updateCart($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    /**
     * Get the outlet Nearby  userAddress
     * @param outletId
     * @return json
     *
     */

    public function listDeliveryAddress(request $request)
    {
        $userId      = Auth::guard('api')->user()->id;
        $response    = new Response();
        $rules       = ['outletId' => 'required'];
        $validator   = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $cartService            = new CartService();
            $response               = $cartService->listDeliveryAddress($request->outletId, $userId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * Set the delivery address for user
     * @param addressId
     * @return void
     * */

    public function setDeliveryAddress(request $request)
    {

        $response   = new Response();
        $rules      = ['addressId' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $cartService            = new CartService();
            $response               = $cartService->setDeliveryAddress($request->addressId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    /**
     * apply Coupon
     * @param Request $request
     * udId or userId required
     * @return json array
     *
     */
    public function addCoupon(request $request)
    {
        $response       = new Response();
        $rules          = ['outletId' => 'required|min:1',
                           'couponCode'  => 'required|min:2',];
        $validator      = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $cartService            = new CartService();
            $response               = $cartService->addCoupon($request);

        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }

    public function removeCoupon(request $request)
    {
        $response       = new Response();
        $rules          = ['udId' => 'required|min:1'];
        $validator      = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $cartService            = new CartService();
            $response               = $cartService->removeCoupon($request);

        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }
}