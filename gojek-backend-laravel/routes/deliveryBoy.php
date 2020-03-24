<?php

use Illuminate\Http\Request;

/*login module */


Route::get('getLoginSetting', 'DeliveryBoy\DeliveryStaffController@getLoginSetting');
Route::post('checkAvailability', 'DeliveryBoy\DeliveryStaffController@checkAvailability');
Route::post('staffPasswordLogin', 'DeliveryBoy\DeliveryStaffController@staffPasswordLogin');
Route::post('staffOtpLogin', 'DeliveryBoy\DeliveryStaffController@staffOtpLogin');


Route::post('forgotPassword', 'DeliveryBoy\DeliveryStaffController@forgotPassword');
Route::post('changePassword','DeliveryBoy\DeliveryStaffController@changePassword');
/** Otp */
Route::post('otpVerification', 'DeliveryBoy\DeliveryStaffController@otpVerification');
Route::post('resendOtp','DeliveryBoy\DeliveryStaffController@resendOtp');

/** signup module */
Route::get('getSignupFields', 'DeliveryBoy\DeliveryStaffController@getSignupFields');
Route::post('staffSignup','DeliveryBoy\DeliveryStaffController@staffSignup');
Route::Post('staffSignupValidation','DeliveryBoy\DeliveryStaffController@staffSignupValidation');



/** profile module */

Route::get('getProfile', 'DeliveryBoy\DeliveryStaffController@getProfile')->middleware('auth:deliveryboy');


//Route::get('homePage','MockController@homePage');
Route::get('homePage','DeliveryBoy\DeliveryStaffController@homePage')->middleware('auth:deliveryboy');

Route::post('updateLocation','DeliveryBoy\DeliveryStaffController@updateLocation')->middleware('auth:deliveryboy');
Route::post('updateTripStatus','DeliveryBoy\DeliveryStaffController@updateTripStatus')->middleware('auth:deliveryboy');



/** Orders module */

Route::get('listPastOrders','DeliveryBoy\StaffOrderController@listPastOrders')->middleware('auth:deliveryboy');
Route::Post('viewOrder','DeliveryBoy\StaffOrderController@viewOrder')->middleware('auth:deliveryboy');
Route::Post('acceptOrder','DeliveryBoy\StaffOrderController@acceptOrder')->middleware('auth:deliveryboy');
Route::Post('pickedupOrder','DeliveryBoy\StaffOrderController@pickedupOrder')->middleware('auth:deliveryboy');
Route::Post('deliveredOrder','DeliveryBoy\StaffOrderController@deliveredOrder')->middleware('auth:deliveryboy');
Route::Post('rejectedOrder','DeliveryBoy\StaffOrderController@rejectOrder')->middleware('auth:deliveryboy');
Route::get('getOrder','DeliveryBoy\StaffOrderController@getOrder')->middleware('auth:deliveryboy');
Route::get('getAssignedOrder','DeliveryBoy\StaffOrderController@getAssignedOrder')->middleware('auth:deliveryboy');

Route::Post('reachOutlet','DeliveryBoy\StaffOrderController@reachOutlet')->middleware('auth:deliveryboy');
Route::Post('reachUserLocation','DeliveryBoy\StaffOrderController@reachUserLocation')->middleware('auth:deliveryboy');



//image upload

Route::post('imageUpload','DeliveryBoy\ImageuploadController@imageUpload');

Route::post('updateDeviceToken','DeliveryBoy\DeliveryStaffController@updateDeviceToken')->middleware('auth:deliveryboy');
Route::get('getStaticpages','DeliveryBoy\DeliveryStaffController@getStaticpages');

// logout API

Route::get('staffLogout','DeliveryBoy\DeliveryStaffController@staffLogout')->middleware('auth:deliveryboy');

// provider earnings
Route::Post('deliveryBoyEarnings','DeliveryBoy\StaffOrderController@deliveryBoyEarning')->middleware('auth:deliveryboy');
Route::Post('earningDetails','DeliveryBoy\StaffOrderController@earningDetails')->middleware('auth:deliveryboy');