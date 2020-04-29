<?php
namespace App\Http\Repository;

use App\Restaurant;
use App\Outlets;
use App\Reviews;
use App\Dishes;
use App\Setting;
use App\Cuisines;
use App\Cart;
use App\Orders;
use App\User;
use App\DeliveryStaff;
use App\Http\Utility\Defaults;
use DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent;
use App\Http\Repository\OutletsRepostitory;
use App\Http\Repository\SettingRepostitory;
use Illuminate\Pagination\Paginator;
use App\Http\Utility\Constant;


class SearchRepostitory{

    public function getRestaurant($data){

        $latitude=$data->latitude;
        $longitude=$data->longitude;
        $word=$data->restaurantName;			
		$setting=new SettingRepostitory();
		$radius=$setting->getValue(Constant::OUTLET_RADIUS);
        $data =array();    


        $query=Outlets::select('Outlets.*','Coupon.couponCode','Coupon.discountPerscentage','Coupon.status as couponStatus')    		   
              ->selectRaw('( 6371 * acos( cos( radians(?) ) *
                        cos( radians( latitude ) )
                        * cos( radians( longitude ) - radians(?)
                        ) + sin( radians(?) ) *
                        sin( radians( latitude ) ) )
                        ) AS distance', [$latitude, $longitude, $latitude])
              ->havingRaw("distance < ?", [$radius])
              ->leftJoin('Coupon', 'Coupon.outletId', '=', 'Outlets.id' )
             // ->leftJoin('Restaurant', 'Restaurant.id', '=', 'Outlets.restaurantId')

              ->where('name','LIKE','%'.$word.'%')
              ->get();
	 



	    $data=$query->groupBy('restaurantId');	  


        return $data;     
    
    }

    public function searchUser($request) {

        if($request->pageNumber) {

            $page = $request->pageNumber - 1;
        } else {
            $page = 0;
        }

        $page_offset=($page * 10);

        try{
            $data = User::selectRaw('id, userName, email, image, mobileNumber')
            ->where('userName','LIKE','%'.$request->key.'%')
            ->orwhere('email','LIKE','%'.$request->key.'%')
            ->orwhere('mobileNumber','LIKE','%'.$request->key.'%')
            ->offset($page_offset)
            ->limit(10)
            ->get();

        }catch(\Illuminate\Database\QueryException $ex){

            $jsonresp = $ex->getMessage();
            return false;
        }


        return $data;

    }


 
     public function searchUserPage($request) {

        try{
            $data = User::selectRaw('id, userName, email, image, mobileNumber')
            ->where('userName','LIKE','%'.$request->key.'%')
            ->orwhere('email','LIKE','%'.$request->key.'%')
            ->orwhere('mobileNumber','LIKE','%'.$request->key.'%')
            ->get();

        }catch(\Illuminate\Database\QueryException $ex){

            $jsonresp = $ex->getMessage();
            return false;
        }
        $totalUsers = count($data);
        $total = $totalUsers/10;
        $NumOfPage = ceil($total);

        return $NumOfPage;
        // return $data;

    }

        public function searchDeliveryBoys($request)
    {

        $perPage = Constant::PERPAGE;
        $data = DeliveryStaff::select('id','name as staffName','mobileNumber','email','tripStatus','isApproved as status','latitude','longitude')
              ->where('name','LIKE','%'.$request->key.'%')
              ->orwhere('email','LIKE','%'.$request->key.'%')
              ->orwhere('mobileNumber','LIKE','%'.$request->key.'%')
              ->paginate($perPage, ['*'], 'page', $request->pageNumber);

        return $data;
    }


        public function searchRestaurants($request)
    {
        $perPage = Constant::PERPAGE;
        $path    = url('/').'/images/';
        $data    = Restaurant::select(DB::raw("id,CONCAT('$path',image)as RestaurantImage,name as RestaurantName"))
                             ->where('name','LIKE','%'.$request->key.'%')
                             ->paginate($perPage, ['*'], 'page', $request->pageNumber);

        return $data;
    }   
	
      public function searchOrder($request)
    {

        $perPage = Constant::PERPAGE;
        $data    = Orders::select('Booking.id as orderId','Booking.orderReferenceId','Booking.netAmount','Booking.orderStatus','Booking.created_At','Users.Mobile','Users.Email','Booking.updated_at')
                          ->leftjoin('Users','Booking.userId','=','Users.id')
                          ->where('Booking.orderReferenceId','LIKE','%'.$request->key.'%')
                          ->orwhere('Users.Mobile','LIKE','%'.$request->key.'%')
                          ->where('Booking.RideName','foodDelivery')           
                          ->paginate($perPage, ['*'], 'page', $request->pageNumber);
        return $data;
    }

     public function getNearByOutlets($data){

        $latitude=$data->latitude;
        $longitude=$data->longitude;
        $word=$data->restaurantName;      
    $setting=new SettingRepostitory();
    $radius=$setting->getValue(Constant::OUTLET_RADIUS);
        $data =array();    


        $query=Outlets::select('Outlets.*','Coupon.couponCode','Coupon.discountPerscentage','Coupon.status as couponStatus')           
              ->selectRaw('( 6371 * acos( cos( radians(?) ) *
                        cos( radians( latitude ) )
                        * cos( radians( longitude ) - radians(?)
                        ) + sin( radians(?) ) *
                        sin( radians( latitude ) ) )
                        ) AS distance', [$latitude, $longitude, $latitude])
              ->havingRaw("distance < ?", [$radius])
              ->leftJoin('Coupon', 'Coupon.outletId', '=', 'Outlets.id' )
             ->leftJoin('Dishes', 'Dishes.outletId', '=', 'Outlets.id')

              ->where('Dishes.name','LIKE','%'.$word.'%')
              // ->groupBy('Outlets.id')
              ->get();
   



      $data=$query->groupBy('restaurantId');    


        return $data;     
    
    } 

 public function getDishes($outletId,$data){
        $word=$data->restaurantName;
        $data =array();    


        $query=Dishes::select('*')
              ->where('outletId',$outletId)           
              ->where('name','LIKE','%'.$word.'%')
              // ->groupBy('Outlets.id')
              ->get();
   



      $data=$query;    


        return $data;     
    
    }       
}