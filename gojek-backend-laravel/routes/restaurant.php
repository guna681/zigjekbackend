
<?php

use Illuminate\Http\Request;




//dashboard module

Route::get('getDashboardDetails','RestaurantAdmin\DashboardManagementController@getDashboardDetails')->middleware('auth:restaurant');

Route::get('getOrdersChart','RestaurantAdmin\DashboardManagementController@getOrdersChart')->middleware('auth:restaurant');

Route::get('getRevenueChart','RestaurantAdmin\DashboardManagementController@getRevenueChart')->middleware('auth:restaurant');





// login module



Route::post('loginRestaurantAdmin','RestaurantAdmin\RestaurantAdminController@loginRestaurantAdmin');
Route::post('updateDeviceToken','RestaurantAdmin\RestaurantAdminController@updateDeviceToken')->middleware('auth:restaurant');
Route::Post('changePassword','RestaurantAdmin\RestaurantAdminController@changePassword')->middleware('auth:restaurant');

Route::Post('getOutletProfile','RestaurantAdmin\RestaurantAdminController@getOutletProfile')->middleware('auth:restaurant');

Route::Post('editProfile','RestaurantAdmin\RestaurantAdminController@editProfile')->middleware('auth:restaurant');


/*Category module */

Route::get('ListCategory/{page}','RestaurantAdmin\CategoryController@ListCategory')->middleware('auth:restaurant');
Route::get('getMainCategoryList','RestaurantAdmin\CategoryController@getMainCategoryList')->middleware('auth:restaurant');


Route::get('getSubCategory','RestaurantAdmin\CategoryController@getSubCategory')->middleware('auth:restaurant');
Route::post('addCategory','RestaurantAdmin\CategoryController@addCategory')->middleware('auth:restaurant');
Route::get('getCategory/{categoryId}','RestaurantAdmin\CategoryController@getCategory')->middleware('auth:restaurant');
Route::post('updateCategory','RestaurantAdmin\CategoryController@updateCategory');

Route::get('deleteCategory/{id}','RestaurantAdmin\CategoryController@deleteCategory')->middleware('auth:restaurant');






/*dish Customisation (group or  category)  */

Route::get('ListCustoimsationCategory/{page}','RestaurantAdmin\CustomisationCategoryController@ListCustoimsationCategory')->middleware('auth:restaurant');
Route::get('getCustomisationCategory/{id}','RestaurantAdmin\CustomisationCategoryController@getCustomisationCategory')->middleware('auth:restaurant');
Route::post('addCustomisationCategory','RestaurantAdmin\CustomisationCategoryController@addCustomisationCategory')->middleware('auth:restaurant');
Route::post('updateCustomisationCategory','RestaurantAdmin\CustomisationCategoryController@updateCustomisationCategory')->middleware('auth:restaurant');
Route::get('getListCustomisationCategory','RestaurantAdmin\CustomisationCategoryController@getListCustomisationCategory')->middleware('auth:restaurant');
Route::get('deleteCustomisationCategory/{id}','RestaurantAdmin\CustomisationCategoryController@deleteCustomisationCategory')->middleware('auth:restaurant');



/** dishes modules */

Route::get('listDishes/{page}','RestaurantAdmin\DishMangementController@listDishes')->middleware('auth:restaurant');
Route::post('listDishes','RestaurantAdmin\DishMangementController@dishesList')->middleware('auth:restaurant');
Route::post('addDishes','RestaurantAdmin\DishMangementController@addDishes')->middleware('auth:restaurant');
Route::get('getDishes/{id}','RestaurantAdmin\DishMangementController@getDishes')->middleware('auth:restaurant');
Route::get('deleteDish/{id}','RestaurantAdmin\DishMangementController@deleteDish')->middleware('auth:restaurant');
Route::post('updateDishes','RestaurantAdmin\DishMangementController@updateDishes')->middleware('auth:restaurant');
Route::post('dishSearch','RestaurantAdmin\DishMangementController@dishSearch')->middleware('auth:restaurant');


/** Orders Modules*/

Route::get('listOrders/{page}','RestaurantAdmin\OrderManagementController@listOrders')->middleware('auth:restaurant');
Route::get('getOrders/{orderId}','RestaurantAdmin\OrderManagementController@getOrders')->middleware('auth:restaurant');
Route::post('updateOrderStatus','RestaurantAdmin\OrderManagementController@updateOrderStatus')->middleware('auth:restaurant');
// restaurant admin pop up on orders
Route::get('adminListOrdersPopup','RestaurantAdmin\OrderManagementController@listOrdersPopup')->middleware('auth:restaurant');
Route::get('updateOrderViewStatus','RestaurantAdmin\OrderManagementController@updateOrderViewStatus')->middleware('auth:restaurant');




Route::get('listPreviousOrders/{page}','RestaurantAdmin\OrderManagementController@listPreviousOrders')->middleware('auth:restaurant');
Route::get('listOngoingOrders/{page}','RestaurantAdmin\OrderManagementController@listOngoingOrders')->middleware('auth:restaurant');
Route::post('listCurrentOrders','RestaurantAdmin\OrderManagementController@newCurrentOrders')->middleware('auth:restaurant');
Route::post('listPastOrders','RestaurantAdmin\OrderManagementController@listPastOrders')->middleware('auth:restaurant');

Route::post('newOrders','RestaurantAdmin\OrderManagementController@newOrders')->middleware('auth:restaurant');
Route::post('trackOrders','RestaurantAdmin\OrderManagementController@trackOrders')->middleware('auth:restaurant');
/* coupon */

Route::get('couponList/{page}','RestaurantAdmin\CouponController@listCoupon')->middleware('auth:restaurant');
Route::post('addCoupon','RestaurantAdmin\CouponController@addCoupon')->middleware('auth:restaurant');
Route::post('editCoupon','RestaurantAdmin\CouponController@editCoupon')->middleware('auth:restaurant');
Route::post('deleteCoupon','RestaurantAdmin\CouponController@deleteCoupon')->middleware('auth:restaurant');


Route::post('markReady','RestaurantAdmin\OrderManagementController@markReady')->middleware('auth:restaurant');
Route::post('dishesEnableDisable','RestaurantAdmin\OrderManagementController@dishesEnableDisable')->middleware('auth:restaurant');
Route::get('homePage','RestaurantAdmin\OrderManagementController@homePage')->middleware('auth:restaurant');

Route::post('editDishes','RestaurantAdmin\DishMangementController@editDishes')->middleware('auth:restaurant');

Route::post('getOrders','RestaurantAdmin\OrderManagementController@getRestaurantOrders')->middleware('auth:restaurant');

Route::post('fileUpload','RestaurantAdmin\DishMangementController@fileUpload')->middleware('auth:restaurant');

// logout api 
Route::get('logout','RestaurantAdmin\RestaurantAdminController@logout')->middleware('auth:restaurant');