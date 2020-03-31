<?php
namespace App\Http\Repository;

use App\Restaurant;
use App\Outlets;
use App\Reviews;
use App\Dishes;
use App\Setting;
use App\Cuisines;
use App\UserFavourites;
use App\OutletsOfferBanners;
use App\Http\Utility\Defaults;
use App\Http\Repository\SettingRepostitory;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Utility\Constant;
use App\Http\Cron\S2ServiceProvider;
use App\Orders;
use DB;

class OutletsRepostitory extends Outlets
{

    public function  getOutlets($outletId,$arg){
        $query=Outlets::find($outletId);
        
        $outlets=new Outlets();
        $outlets->outletId=$query->id;
        $outlets->restaurantId=$query->restaurantId;
        $outlets->outletName=$query->name;
        $outlets->isServicable=$query->status;        
        $outlets->offers=$query->outletOffers;
        $outlets->time=(int)self::distanceTo($arg,$query);
        $outlets->displayTime=(int)self::distanceTo($arg,$query)." ".__('validation.mins');
        $cuisines=self::getCuisines($query->id);
        $outlets->cuisines=$cuisines->implode('name',',');	        
        $outlets->costForTwo=$query->costForTwo;
        $currencyRepostitory=new CurrencyRepostitory();
        $outlets->displayCostForTwo=$currencyRepostitory->getCurrency().$query->costForTwo." ".__('validation.forTwo');
        $outlets->totalAmount = $query->totalAmount;
        $outlets->balanceAmount = $query->balanceAmount;
        $outlets->status = $query->status;

        return $outlets;

    }

    public function getOutlet($outletId){
        $query=Outlets::find($outletId);
        return $query;
    }

    public function  outletOffers(){
        return $this->hasMany('App\OutletsOffers','outletId')->select(['id as offerId', 'offerName', 'discount']);
    }

    public function  getoutletOffersBanners($outletId){

        $data=OutletsOfferBanners::where('outletId',$outletId)
        ->where('status','0')
        ->whereNull('deleted_at')
        ->first();
        return $data;
    }

    public function  outletReview(){
        return $this->hasMany('App\Reviews', 'outletId')->avg('orderRating');
    }

    public function getCuisines($outletId){
		$data=Cuisines::select('Cuisines.name')
		            ->join('Restaurant_Cuisines','Restaurant_Cuisines.cuisineId','=','Cuisines.id')
		            ->where(['outletId'=>$outletId])
		            ->get();
		return $data;
	}

    //userfavourites outlets
    
    public function  getFavouriteOutlet($outletId,$userId){
        $data=UserFavourites::where(['outletId'=>$outletId,'userId'=>$userId])->get();
        if($data->isEmpty()){
            return 0;
        }
        return 1;
    }


    //distance calculation



	public  function distanceTo($current,$outlet) {
        
        $miles = rad2deg(acos((sin(deg2rad($current->latitude))*sin(deg2rad($outlet->latitude))) + (cos(deg2rad($current->latitude))*cos(deg2rad($outlet->latitude))*cos(deg2rad($current->longitude-$outlet->longitude)))));
                
      //  $miles = $miles * 60 * 1.1515;
             
        $kilometers = $miles * 1.609344;  
        $time = $kilometers /3;   //40 km/hr 4.5speed
        $minutes=$time*60;
        //$distanceTime=number_format($minutes);
        // $setting=new SettingRepostitory();
        // $pickupTime=$setting->getValue(Constant::PICKUP_TIME);      
        // $deliveryTime=$outlet->preparationTime-$pickupTime;
        $totalTime=number_format($minutes+$outlet->preparationTime);       
    
      return substr($totalTime, 0, 2);
    }

    /*admin module*/

    public function listOutlets($pageNumber)
    {
        $perPage = Constant::PERPAGE;
        $path    = url('/').'/images/';
        $data    = Outlets::select(DB::raw("id as outletId,name as outletName,CONCAT('$path',image)as outletImage,email,isPureVeg,contactNumber,status"))
                        ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }



    public function updateOutlets($data){
        try{

            $s2cellIdgenerated = new  S2ServiceProvider();
            $s2Cell =$s2cellIdgenerated->getCellId($data->latitude,$data->longitude);



            $update=Outlets::where('id',$data->outletId)
                            ->update(['name'=>$data->outletName,'email'=>$data->email,'isPureVeg'=>$data->isPureVeg,'costForTwo'=>$data->costForTwo,'preparationTime'=>$data->preparationTime,'addressLineOne'=>$data->addressLineOne,'addressLineTwo'=>$data->addressLineTwo,'area'=>$data->area,'city'=>$data->city,'contactNumber'=>$data->contactNumber,'latitude'=>$data->latitude,'longitude'=>$data->longitude,
                                      's2CellId'=>$s2Cell->id,'s2Key'=>$s2Cell->key,'street'=>$data->street,'restaurantCommission'=>$data->commission,'status'=>$data->status]);
            if($data->outletImage){
                $defaults    = new Defaults();
                $images      = $defaults->imageUpload($data->outletImage, Constant::RESTAURANT);
                $query       =  Outlets::where('id',$data->outletId)->update(['image'=>$images]);
            }
        }catch (\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            return false;
        }

        return true;

    }

    public function getOutletDetails($ouletId){

        $data = Outlets::where('id',$ouletId)->first();

        return $data;
    }

    //outletAdmin login check

    public function existLogin($email)
    {
        $data = Outlets::where(['email' => $email])->first();
        return $data;
    }


    public function putPassword($data)
    {
        DB::beginTransaction();
        try {
            $query = Outlets::where('email', $data->email)->update(['password' => bcrypt($data->password), 'existLogin' => 0]);

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }


    public function updateOutletsEarnings($Amount, $outletId) {
        
        try{
            // $update=DB::raw(`update Outlets set totalAmount = totalAmount + $Amount ,balanceAmount = balanceAmount + $Amount where id = $outletId`);
            $update = DB::table('Outlets')->where('id', $outletId)->update(['totalAmount'=>DB::raw("totalAmount + $Amount"),'balanceAmount' => DB::raw("balanceAmount + $Amount")]);
        }catch (\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();

            return false;
        }

        return true;

    }


    public function lastOutletOrders($outletId)
    {
        $orders =Orders::select('Orders.id as orderId','Orders.orderReferenceId','Orders.netAmount','Orders.orderStatus','Orders.orderPlaceTime','Orders.confirmedTime','Users.mobileNumber','Users.email','Orders.updated_at')
            ->leftjoin('Users','Orders.userId','=','Users.id')
            ->where('Orders.outletId',$outletId)
            ->orderby('Orders.id', 'DESC')
            ->take(10)->get();

        return $orders;
    }


}