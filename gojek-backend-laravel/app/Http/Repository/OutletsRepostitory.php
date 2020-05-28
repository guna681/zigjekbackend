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
use Illuminate\Support\Facades\Hash;
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
        $outlets->averageReview=(string)number_format($query->averageRating,1);       
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
        $outlets->image  = $query->image;
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
                
       $kilometers = $miles * 60 * 1.1515;
             
        // $kilometers = $miles * 1.609344;  
        $time = $kilometers /30;   //40 km/hr 4.5speed
        $minutes=$time*60;
        //$distanceTime=number_format($minutes);
        // $setting=new SettingRepostitory();
        // $pickupTime=$setting->getValue(Constant::PICKUP_TIME);      
        // $deliveryTime=$outlet->preparationTime-$pickupTime;
        $totalTime=number_format($minutes+$outlet->preparationTime);       
    
      return substr($totalTime, 0, 3);
    }

    /*admin module*/

    public function listOutlets($pageNumber)
    {
        $perPage = Constant::PERPAGE;
        $path    = url('/').'/images/';
        $data    = Outlets::select(DB::raw("id as outletId,name as outletName,CONCAT('$path',image)as outletImage,email,isPureVeg,contactNumber,status,averageRating,isBlocked"))
                        ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }



    public function updateOutlets($data){
        try{

            $s2cellIdgenerated = new  S2ServiceProvider();
            $s2Cell =$s2cellIdgenerated->getCellId($data->latitude,$data->longitude);

            $update_data=['name'=>$data->outletName,'email'=>$data->email,'isPureVeg'=>$data->isPureVeg,'costForTwo'=>$data->costForTwo,'preparationTime'=>$data->preparationTime,'addressLineOne'=>$data->addressLineOne,'addressLineTwo'=>$data->addressLineTwo,'area'=>$data->area,'city'=>$data->city,'contactNumber'=>$data->contactNumber,'latitude'=>$data->latitude,'longitude'=>$data->longitude,
            's2CellId'=>$s2Cell->data->id,'s2Key'=>$s2Cell->data->key,'street'=>$data->street,'restaurantCommission'=>$data->commission,'status'=>$data->status];

            if($data->password){$update_data['password']=Hash::make($data->password);}


            $update=Outlets::where('id',$data->outletId)
                            ->update($update_data);
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

    public function listPayOutletByResturat($RestaurantId){
		$data=Outlets::select('Outlets.id','Outlets.name','Outlets.image','Outlets.city','Outlets.state','Outlets.country','Outlets.zipcode','Outlets.contactNumber','Restaurant.name as restaurantName')
		            ->join('Restaurant','Restaurant.id','=','Outlets.restaurantId')
		            ->where('Restaurant.id',$RestaurantId)
		            ->get();
		return $data;
	}

    //outletAdmin login check

    public function existLogin($email)
    {
        $data = Outlets::where(['email' => trim($email)])->first();
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
            // $update = DB::table('Outlets')->where('id', $outletId)->update(['totalAmount'=>DB::raw("totalAmount + $Amount"),'balanceAmount' => DB::raw("balanceAmount + $Amount")]);
                    $totalAmount = DB::table('Orders')
                                           ->where('outletId',$outletId)
                                           ->sum('netAmount');
            $totalOutletIncome = floatval($totalAmount) + floatval($Amount);
            $update = DB::table('Outlets')->where('id', $outletId)->update(['totalAmount'=>$totalOutletIncome,'balanceAmount' =>$totalOutletIncome]);
        }catch (\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            print_r($jsonresp);
            die;

            return false;
        }

        return true;

    }


    public function lastOutletOrders($outletId)
    {
        $orders =Orders::select('Booking.Id as orderId','Booking.orderReferenceId','Booking.netAmount','Booking.orderStatus','Booking.CreateAt as orderPlaceTime','Users.Mobile','Users.Email','Booking.updated_at')
            ->leftjoin('Users','Booking.userId','=','Users.Id')
            ->where('Booking.outletId',$outletId)
            ->orderby('Booking.Id', 'DESC')
            ->take(10)->get();

        return $orders;
    }

// Booking.confirmedTime
  public function editProfile($data, $outletId)
    {
        try{

        $updateImage = Outlets::where(['id'=> $outletId])->update(['name'=>$data->name,'email'=>$data->email,'contactNumber'=>$data->mobileNumber]);            
        }catch (\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();

            return false;
        }

        return true;

}

  public function updateDevicesToken($data, $restaurants)
    {
        try{

        $updatetoken = Outlets::where(['id'=> $restaurants->id])->update(['deviceToken'=>$data->deviceToken,'os'=>$data->os]);            
        }catch (\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();

            return false;
        }

        return true;

}

  public function logout($outletId)
    {
        try{

        $updatetoken = Outlets::where(['id'=> $outletId])->update(['deviceToken'=>'']);            
        }catch (\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();

            return false;
        }

        return true;

}

 public function updateDeviceToken($request,$outletId)
    {
        $updateToken = Outlets::where(['id'=>$outletId])
                        ->update(['deviceToken' =>$request->deviceToken]);
        return $updateToken;
    }

}