
<?php

use Illuminate\Http\Request;




//dashboard module

Route::get('getDashboardDetails','RestaurantAdmin\DashboardManagementController@getDashboardDetails')->middleware('auth:restaurant');

Route::get('getOrdersChart','RestaurantAdmin\DashboardManagementController@getOrdersChart')->middleware('auth:restaurant');

Route::get('getRevenueChart','RestaurantAdmin\DashboardManagementController@getRevenueChart')->middleware('auth:restaurant');





// login module



Route::post('loginRestaurantAdmin','RestaurantAdmin\RestaurantAdminController@loginRestaurantAdmin');
Route::Post('changePassword','RestaurantAdmin\RestaurantAdminController@changePassword')->middleware('auth:restaurant');

Route::Post('getOutletProfile','RestaurantAdmin\RestaurantAdminController@getOutletProfile')->middleware('auth:restaurant');



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
Route::post('addDishes','RestaurantAdmin\DishMangementController@addDishes')->middleware('auth:restaurant');
Route::get('getDishes/{id}','RestaurantAdmin\DishMangementController@getDishes')->middleware('auth:restaurant');
Route::get('deleteDish/{id}','RestaurantAdmin\DishMangementController@deleteDish')->middleware('auth:restaurant');
Route::post('updateDishes','RestaurantAdmin\DishMangementController@updateDishes')->middleware('auth:restaurant');



/** Orders Modules*/

Route::get('listOrders/{page}','RestaurantAdmin\OrderManagementController@listOrders')->middleware('auth:restaurant');
Route::get('getOrders/{orderId}','RestaurantAdmin\OrderManagementController@getOrders')->middleware('auth:restaurant');
Route::post('updateOrderStatus','RestaurantAdmin\OrderManagementController@updateOrderStatus')->middleware('auth:restaurant');
// restaurant admin pop up on orders
Route::get('adminListOrdersPopup','RestaurantAdmin\OrderManagementController@listOrdersPopup')->middleware('auth:restaurant');
Route::get('updateOrderViewStatus','RestaurantAdmin\OrderManagementController@updateOrderViewStatus')->middleware('auth:restaurant');




Route::get('listPreviousOrders/{page}','RestaurantAdmin\OrderManagementController@listPreviousOrders')->middleware('auth:restaurant');
Route::get('listOngoingOrders/{page}','RestaurantAdmin\OrderManagementController@listOngoingOrders')->middleware('auth:restaurant');

/* coupon */

Route::get('couponList/{page}','RestaurantAdmin\CouponController@listCoupon')->middleware('auth:restaurant');
Route::post('addCoupon','RestaurantAdmin\CouponController@addCoupon')->middleware('auth:restaurant');
Route::post('editCoupon','RestaurantAdmin\CouponController@editCoupon')->middleware('auth:restaurant');