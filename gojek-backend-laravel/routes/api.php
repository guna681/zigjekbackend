<?php

use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//new api




//user signup and login module

Route::get('getloginSetting','UserController@getloginSetting');
Route::post('CheckAvailability','UserController@CheckAvailability')->middleware('auth:api');
//signup
Route::post('userWithPasswordSignup','UserController@userWithPasswordSignup');
Route::post('userWithoutPasswordSignup','UserController@userWithoutPasswordSignup');
Route::post('userSignup','UserController@userSignup');


//login
Route::post('userOtpLogin','UserController@userOtpLogin');
Route::post('userPasswordLogin','UserController@userPasswordLogin');

Route::Post('forgotPassword','UserController@forgotPassword');
Route::post('otpVerification','UserController@otpVerification');
Route::post('changePassword','UserController@changePassword');
Route::post('resendOtp','UserController@resendOtp');

//social login
Route::post('CheckSocialUserAvailability','UserController@CheckSocialUserAvailability');
Route::post('socialLogin','UserController@socialLogin');
Route::post('socialSignup','UserController@socialSignup');

// updateDeviceToken

Route::post('updateDeviceToken','UserController@updateDeviceToken')->middleware('auth:api');


//userProfile module
Route::Get('getProfile','UserController@getProfile')->middleware('auth:api');
Route::post('updateProfile','UserController@updateProfile')->middleware('auth:api');
Route::get('getVerfiyEmail/{otpNumber}','UserController@getVerfiyEmail');
Route::get('getStaticpages','UserController@getStaticpages');


Route::post('createUserToken', 'UserController@createTokenCtrl');

// address  module
Route::get('getAddress','UserController@getAddress')->middleware('auth:api');
Route::post('addAddress','UserController@addAddress')->middleware('auth:api');
Route::post('updateAddress','UserController@updateAddress')->middleware('auth:api');
Route::post('getCurrentAddress','UserController@getCurrentAddress')->middleware('auth:api');
Route::post('setCurrentAddress','UserController@setCurrentAddress')->middleware('auth:api');
Route::post('destroyAddress','UserController@destroyAddress')->middleware('auth:api');


// Restraunt  list module
Route::post('listRestaurant','RestaurantController@listRestaurants')->middleware('auth:api');
Route::post('demolistRestaurant','RestaurantController@demolistRestaurants')->middleware('auth:api');

// guest list restaurants
Route::post('guest/listRestaurant','RestaurantController@guestListRestaurants');

Route::post('searchRestaurants','SearchController@searchRestaurants');
Route::post('searchDishesAndRestaurants','SearchController@searchDishesAndRestaurants');

Route::post('userDishes','RestaurantController@listDishes');

Route::post('listDishes','RestaurantController@listDishes');

//Search Restraunt and dishes module
Route::post('searchRestrauntdishes','RestaurantController@searchRestrauntdishes');


//test mail

Route::post('mail','UserController@Mailsend');


Route::post('testingMail','UserController@testingMail');


/*  User Cart Module */

Route::post('addToCart','CartController@addToCart')->middleware('auth:api');
Route::post('viewCart','CartController@viewCart')->middleware('auth:api');
Route::post('updateCart','CartController@updateCart')->middleware('auth:api');
Route::post('listDeliveryAddress','CartController@listDeliveryAddress')->middleware('auth:api');

/* Coupon module */
Route::post('addCoupon','CartController@addCoupon')->middleware('auth:api');
Route::post('removeCoupon','CartController@removeCoupon')->middleware('auth:api');


/* Payment module*/

Route::get('listPaymentMethod','PaymentController@listPaymentMethod')->middleware('auth:api');

// user coupon api module

Route::get('couponList','CouponController@userCouponList');
Route::post('couponApply','CouponController@userCouponAdd')->middleware('auth:api');
Route::get('couponRemove','CouponController@userCouponDelete')->middleware('auth:api');

/* Orders module */

Route::post('orderConfirm','OrderController@OrderConfirm')->middleware('auth:api');
Route::post('listPastOrders','OrderController@listPastOrders')->middleware('auth:api');
Route::post('trackOrders','OrderController@trackOrders')->middleware('auth:api');
Route::post('getOrderDetail','OrderController@getOrderDetail')->middleware('auth:api');

Route::get('unassignOrder','OrderController@unassignOrder');

//mock api routes

Route::post('searchrestrauntdishes','MockController@searchrestrauntdish');
Route::get('listofPayment','MockController@listofPayment');
Route::get('listofFilters','MockController@listofFilters');
Route::get('listofCoupons','MockController@listofCoupons');
Route::post('applyCoupon','MockController@applyCoupon');
// Route::post('removeCoupon','MockController@removeCoupon');

Route::post('cartLists','MockController@viewCart');

Route::post('Listdeliveryaddress','RestaurantController@listAddress');


// cron api  for orders


Route::get('getUnassignedOrders','OrderController@getUnassignedOrders');

// release the deliveryboys in orders
Route::get('getAssignedOrders','OrderController@getDeliveryBoyReleaseOrders');

Route::post('updateOutletstest','Admin\OutletController@updateOutletstest');

Route::post('generateEphemeralKey','UserController@generateEphemeralKey');


// stripe API
Route::post('addCard','UserController@addCard')->middleware('auth:api');

Route::get('listCard','UserController@listCard')->middleware('auth:api');

// logout API

Route::get('userLogout','UserController@userLogout')->middleware('auth:api');

// user rating API

Route::post('rating','OrderController@addRating')->middleware('auth:api');
Route::post('skipRating','OrderController@skipRating')->middleware('auth:api');