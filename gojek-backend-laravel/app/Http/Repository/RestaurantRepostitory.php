<?php

namespace App\Http\Repository;

use App\Restaurant;
use App\Outlets;
use App\Reviews;
use App\Dishes;
use App\Setting;
use App\Cuisines;
use App\Coupon;
use App\Cart;
use App\User;
use App\Address;
use App\OutletsOfferBanners;
use App\Http\Utility\Defaults;
use DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent;
use App\Http\Repository\OutletsRepostitory;
use App\Http\Repository\SettingRepostitory;
use Illuminate\Pagination\Paginator;
use App\Http\Utility\Constant;
use App\Http\Cron\S2ServiceProvider;
use Illuminate\Support\Facades\Hash;
use Log;



class RestaurantRepostitory
{


    /*****api restaurants function*****/

    public function getNearOutletsRestaurants($data)
    {


        $getUser = User::where('id', $data)->first();

        if ($getUser->CurrentAddressId) {
            $latLong = Address::where('id', $getUser->CurrentAddressId)->first();
        } else {
            $latLong = $getUser;
        }

        $latitude   = $latLong->latitude;
        $longitude  = $latLong->longitude;
        $setting    = new SettingRepostitory();
        $radius     = $setting->getValue(Constant::OUTLET_RADIUS);

        $data       = array();
        $query = Outlets::select('Outlets.*','Coupon.couponName','Coupon.couponCode','Coupon.discountPerscentage','Coupon.status as couponStatus','Restaurant.name as restName')
                         ->selectRaw("ST_Distance_Sphere(point(longitude, latitude), point($longitude, $latitude)) / 1000 AS distance")
                            ->leftJoin('Restaurant', 'Restaurant.id', '=', 'Outlets.restaurantId')
                            ->leftJoin('Coupon', 'Coupon.outletId', '=', 'Outlets.id' )
                            // ->groupBy('Outlets.restaurantId')
                            ->havingRaw("distance < ?", [$radius])
                            ->get();
 
        $data = $query->groupBy('restaurantId');
        return $data;
    }


        public function getGuestNearOutletsRestaurants($latLong)
    {

        $latitude   = $latLong->latitude;
        $longitude  = $latLong->longitude;
        $setting    = new SettingRepostitory();
        $radius     = $setting->getValue(Constant::OUTLET_RADIUS);
        $data       = array();
        $query = Outlets::select('Outlets.*')
                         ->selectRaw("ST_Distance_Sphere(point(longitude, latitude), point($longitude, $latitude)) / 1000 AS distance")
                            ->havingRaw("distance < ?", [$radius])
                            ->get();

        $data = $query->groupBy('restaurantId');

        return $data;
    }


    // join outlets relations


    public function getCartCount($userId)
    {
        $query = Cart::where('userId', $userId)->get();
        return $query->count();

    }

    public function getNearbyOutlets($data, $restaurnatId)
    {
        $latitude = $data['latitude'];
        $longitude = $data['longitude'];
        $radius = Defaults::config('outletRadius');
        $restaurantid = $restaurnatId;
        $data = array();
        $data = Outlets::select('Outlets.*')
                        ->selectRaw("ST_Distance_Sphere(point(longitude, latitude), point($longitude, $latitude)) / 1000 AS distance")
                        ->havingRaw("distance < ?", [$radius])
                        ->where('Outlets.restaurantId', $restaurantid)
                        ->get();

        return $data;
    }

    public function getAddress($userId)
    {

        $getUser = User::where('id', $userId)->first();
        $data = array();
        if ($getUser->CurrentAddressId) {

            $data = Address::select(DB::raw("fullAddress,userId,location,houseFlatNo,landMark,latitude,longitude,type,id"))->where('id', $getUser->CurrentAddressId)->first();
        } else {
            $data = $getUser;
        }

        return $data;
    }


    /*****admin restaurant function*****/

    public function listRestaurant()
    {
        $data = array();
        $data = Restaurant::select('id', 'name as restaurantName')
            ->get();
        return $data;
    }


    public function getRestaurantList($pageNumber)
    {
        $perPage = Constant::PERPAGE;
        $path    = url('/').'/images/';
        $data    = Restaurant::select(DB::raw("id,CONCAT('$path',image)as RestaurantImage,name as RestaurantName"))
                             ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }

    public function getRestaurantTotal()
    {
        $restaurant = Restaurant::count();
        $total = $restaurant / 10;
        return ceil($total);

    }


    public function getRestaurantDetails($restaurantId)
    {

        $path = url('/').'/images/';

        $data = Restaurant::select(DB::raw("id,name as restaurantName,CONCAT('$path',image)as RestaurantImage,email"))
                            ->where('id', $restaurantId)
                            ->first();
        $data->outlets=Outlets::select('id','name as outletName','status','contactNumber','email')
                               ->where('restaurantId',$data->id)
                               ->get();

        return $data;
    }

    public function addOutlets($data)
    {

        DB::beginTransaction();
        try {
            if ($data->isRestaurant == 1) {
                $defaults    = new Defaults();
                $images      = $defaults->imageUpload($data->outletImage, Constant::RESTAURANT);
                $restaurant  = new Restaurant;
                $restaurant->name    = $data->outletName;
                $restaurant->email   = $data->email;
                $restaurant->image      = $images;
                $restaurant->save();

                $restaurantId = $restaurant->id;
                $outletImages = $images;
            } else {
                $restaurantId = $data->restaurantId;
                $outletImages = Restaurant::where('id', $data->restaurantId)->value('image');
            }

            $s2cellIdgenerated = new  S2ServiceProvider();
            $s2cell =$s2cellIdgenerated->getCellId($data->latitude,$data->longitude);
            $outlets        = new Outlets();
            $outlets->name          = $data->outletName;
            $outlets->email         = $data->email;
            $outlets->password      = Hash::make($data->password);
            $outlets->restaurantId  = $restaurantId;
            $outlets->image         = $outletImages;
            $outlets->isPureVeg     = $data->isPureVeg;
            $outlets->costForTwo    = $data->costForTwo;
            $outlets->preparationTime = $data->preparationTime;
            $outlets->addressLineOne  = $data->addressLineOne;
            $outlets->addressLineTwo  = $data->addressLineTwo;
            $outlets->contactNumber   = $data->contactNumber;
            $outlets->street          = $data->street;
            $outlets->deliveryCharges = $data->deliveryCharges;
            $outlets->area = $data->area;
            $outlets->city = $data->city;
            $outlets->existLogin = 1;
            $outlets->restaurantCommission  = $data->commission;
            $outlets->latitude  = $data->latitude;
            $outlets->longitude = $data->longitude;
            $outlets->s2CellId  = $s2cell->id;
            $outlets->s2Key     = $s2cell->key;
            $outlets->save();
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();            
            return false;
        }

        DB::commit();
        return true;
    }

    public function listOutlets()
    {
        $data = array();
        $data = Outlets::select(DB::raw("CONCAT(name,',',area) as outletName,id as outletId"))
            ->get();

        return $data;
    }




    public function updateBanners($data)
    {
        DB::beginTransaction();
        try {
            $query = OutletsOfferBanners::where('id', $data->bannerId)->update(['outletId' => $data->outletId, 'status' => $data->status]);

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        if ($data->bannerImage) {
            $defaults = new Defaults();
            $images = $defaults->imageUpload($data->bannerImage, Constant::OFFERSIMAGE);
            $data = OutletsOfferBanners::where('id', $data->bannerId)->update(['bannerImages' => $images]);
        }
        DB::commit();
        return true;
    }


    public function getBanner($data)
    {

        $url = url('/');
        $path = '/images/';
        $data = OutletsOfferBanners::select(DB::raw("CONCAT('$url','$path',Outlets_OfferBanners.bannerImages)as bannerImage,Outlets_OfferBanners.id as bannerId,Outlets_OfferBanners.status,CONCAT(Outlets.name,',',Outlets.area) as outletName,Outlets_OfferBanners.outletId"))
            ->join('Outlets', 'Outlets_OfferBanners.outletId', '=', 'Outlets.id')
            ->where('Outlets_OfferBanners.id', $data)
            ->first();
        return $data;

    }


    public function getOutlets($outletId)
    {
        $data = Outlets::find($outletId);
        return $data;
    }
    public function outlets()
    {

        return $this->hasMany('App\Outlets');
    }

    public function outletsOffers()
    {

        return $this->hasMany('App\OutletsOffers', 'outletId')->where(['status' => 1]);
    }


    /*
     * Restaurant admin module
     * */






}