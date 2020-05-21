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



/* Dashboard Module*/

Route::get('getWidgets','Admin\DashboardController@getWidgets');



//admin login

Route::Post('loginAdmin','Admin\LoginController@loginAdmin');
Route::get('logoutAdmin','Admin\LoginController@logoutAdmin');

Route::post('adminLogin','Admin\LoginController@adminLogin');
//
Route::get('getUsers/{page}','Admin\UserController@getUsers')->middleware('auth:api');
Route::post('addUser','Admin\UserController@addUser');
Route::get('getCountry','Admin\AvailableLocationController@getCountry');
Route::get('getCity/{countryId}','Admin\AvailableLocationController@getCity');
Route::Post('selectedCity','Admin\AvailableLocationController@selectedCity');


//integration Module
Route::get('getIntegrationSetting','Admin\IntegrationSettingController@getIntegrationSetting');
Route::get('getMapKey','Admin\IntegrationSettingController@getMapKey');
Route::get('getChargesKey','Admin\IntegrationSettingController@getChargesKey');

Route::get('getPushNotification','Admin\IntegrationSettingController@getPushNotification');
Route::Post('updateStatus','Admin\IntegrationSettingController@updateStatus');
Route::Post('updateMapKey','Admin\IntegrationSettingController@updateMapKey');
Route::Post('updateChargesKey','Admin\IntegrationSettingController@updateChargesKey');

Route::Post('updateFirebaseKey','Admin\IntegrationSettingController@updateFirebaseKey');
Route::Post('updateStripeKey','Admin\IntegrationSettingController@updateStripeKey');
Route::Post('updateTwilioKey','Admin\IntegrationSettingController@updateTwilioKey');
Route::get('getStripeKey','Admin\IntegrationSettingController@getStripeKey');
Route::get('getTwilioKey','Admin\IntegrationSettingController@getTwilioKey');


//setting Module

Route::get('getSetting','Admin\SettingController@getSetting');
Route::Post('updateSettingValue','Admin\SettingController@updateSettingValue');


//Mail Module
Route::get('listMailTemplate','Admin\MailController@listMailTemplate');
Route::get('getEmailTemplate/{id}','Admin\MailController@getEmailTemplate');
Route::Post('updateEmailTemplate','Admin\MailController@updateEmailTemplate');
Route::Post('updateStatus','Admin\MailController@updateStatus');
Route::Post('addEmailTemplate','Admin\MailController@addEmailTemplate');
Route::get('getMailTokens/{key}','Admin\MailController@getMailTokens');


//user Module

Route::get('destroyUser/{userId}','Admin\UserController@destroyUser');
Route::get('getUser/{userId}','Admin\UserController@getUser');
Route::post('getUserOrder','Admin\UserController@getUserOrder');


//Restaurant module
Route::get('getRestaurantList/{page}','Admin\RestaurantMangementController@getRestaurantList');
Route::Post('addOutlets','Admin\RestaurantMangementController@addOutlets');
Route::get('getRestaurantList/{page}','Admin\RestaurantMangementController@getRestaurantList');

Route::get('getRestaurant/{restaurantId}','Admin\RestaurantMangementController@getRestaurant');

Route::get('listRestaurant','Admin\RestaurantMangementController@listRestaurant');

/*  Outlets module */

Route::get('listOutlet/{page}','Admin\OutletController@listOutlet');
Route::get('getOutlet/{outletId}','Admin\OutletController@getOutlet');
Route::post('updateOutlet','Admin\OutletController@updateOutlet');
//Menu module
//cuisines
Route::get('listCuisines/{page}','Admin\MenuController@listCuisines');
Route::Post('getCuisine','Admin\MenuController@getCuisine');
Route::Post('addCuisines','Admin\MenuController@addCuisines');
Route::Post('updateCuisines','Admin\MenuController@updateCuisines');
Route::Post('destroyCuisine','Admin\MenuController@destroyCuisine');

//banners outlets

Route::get('listOutlets','Admin\RestaurantMangementController@listOutlets');

Route::get('listBanners/{page}','Admin\BannerController@listBanners');
Route::Post('addBanners','Admin\BannerController@addBanners');
Route::post('updateBanners','Admin\RestaurantMangementController@updateBanners');
Route::get('getBanner/{id}','Admin\RestaurantMangementController@getBanner');

Route::get('deleteBanner/{id}','Admin\BannerController@deleteBanner');


/* language module */
Route::get('listLanguages','Admin\LanguagesController@listLanguages');
Route::Post('getLanguages','Admin\LanguagesController@getLanguages');
Route::post('addLanguage','Admin\LanguagesController@addLanguage');
Route::post('updateLanguageString','Admin\LanguagesController@updateLanguageString');
Route::post('updateLanguageStatus','Admin\LanguagesController@updateLanguageStatus');

Route::get('getLanguageString/{iso}','Admin\LanguagesController@getLanguageString');
Route::get('deleteLanguage/{iso}','Admin\LanguagesController@deleteLanguage');

/*DeliveryStaff management Module*/

Route::get('listDeliveryStaff/{pageNumber}','Admin\DeliveryStaffManagementController@listDeliveryStaff');
Route::post('staffApproval','Admin\DeliveryStaffManagementController@staffApproval');
Route::get('getStaffDetail/{id}','Admin\DeliveryStaffManagementController@getStaffDetail');
Route::get('getLables','Admin\DeliveryStaffManagementController@getLables');
Route::get('listStaffDetails','Admin\DeliveryStaffManagementController@listStaffDetails');


/* restaurant admin */

Route::post('loginRestaurant','Admin\OutletController@loginRestaurant');



Route::get('listOutletOrders/{page}','Admin\OutletsOrderController@listOutletOrders');
Route::get('getOutletOrder/{orderId}','Admin\OutletsOrderController@getOutletOrder');
Route::get('updateOrderViewStatus','Admin\OutletsOrderController@updateOrderViewStatus');
Route::post('updateOrderStatus','Admin\OutletsOrderController@updateOrderStatus');



Route::get('getuserChart','Admin\DashboardController@getuserChart');

Route::get('getOrderChart','Admin\DashboardController@getOrderChart');

Route::get('getReportsData','Admin\OutletsOrderController@getReportsData');

Route::post('reportSearch','Admin\OutletsOrderController@reportSearchData');

/* search */
Route::post('userSearch','Admin\SearchController@userSearch');
Route::post('DeliveryBoySearch','Admin\SearchController@DeliveryBoySearch');
Route::post('restaurantsSearch','Admin\SearchController@restaurantsSearch');
Route::post('orderSearch','Admin\SearchController@orderSearch');

/* coupon */
Route::get('restaurantCouponList/{page}','RestaurantAdmin\CouponController@restaurantCouponList');
