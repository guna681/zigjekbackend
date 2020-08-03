<?php
namespace App\Http\Repository;

use App\Coupon;
use App\CouponDescription;
use App\Cart;
use App\Http\Utility\Constant;
use Illuminate\Support\Facades\Auth;

use DB;

Class CouponRepostitory{

	public static function getCoupon(){
		$data=Coupon::where('status',1)->get();
	    return $data;
	}

	public static function  getCoupondescription($couponid){
		$data=CouponDescription::where(['couponId'=>$couponid])->get();
		return $data;
	}

	public static function  addCoupon($arg,$userid){
		DB::beginTransaction();

    try{
        $data=Cart::where(['userId'=>$userid])->update(['couponcode'=>$arg['couponCode']]);
         

    }catch(\Illuminate\Database\QueryException $ex){
          $jsonresp=$ex->getMessage();
          DB::rollBack();
         return false;
    }
    DB::commit();
    return true;
	
	}

	public static function getCouponcode($arg){
		$data=Coupon::where('code',$arg)->first();
		return $data;
	}

	public static function  deleteCoupon($arg){
		DB::beginTransaction();
    try{
        $data=Cart::where(['userId'=>$arg])->update(['couponcode'=>0]);         

    }catch(\Illuminate\Database\QueryException $ex){
          $jsonresp=$ex->getMessage();
          DB::rollBack();
         return false;
    }
    DB::commit();
    return true;
		   
	}

    public static function listCoupons($arg)
    {
        $outletId  = Auth::guard('restaurant')->user()->id;
        $perPage = Constant::PERPAGE;
        $data=Coupon::where(['outletId'=>$outletId, 'isDeleted'=>'0'])->paginate($perPage, ['*'], 'page', $arg->page);         
        return $data;
    }

    public function adminAddCoupon($data)
    {
        $outletId  = Auth::guard('restaurant')->user()->id;
        DB::beginTransaction();
        try {

            $coupon = new Coupon;
            $coupon->outletId      = $outletId;
            $coupon->couponName  = $data->couponName;
            $coupon->couponCode  = $data->couponName;
            $coupon->discountPerscentage        = $data->discountPerscentage;
            $coupon->maxDiscount        = $data->maxDiscount;
            // $coupon->dateStart        = $data->dateStart;
            // $coupon->dateEnd        = $data->dateEnd;
            $coupon->couponStatus        = $data->couponStatus;

            $coupon->save();
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;
    }

    public static function editCoupon($arg)
    {
        if ($arg->outletId) {
        $outletId = $arg->outletId;
        } else {
        $outletId  = Auth::guard('restaurant')->user()->id; 
        }
        $update=Coupon::where(['id'=>$arg->id])->update(['couponName' => $arg->couponName, 'couponCode' => $arg->couponName, 'discountPerscentage'=> $arg->discountPerscentage, 'maxDiscount'=> $arg->maxDiscount, 'couponStatus'=> $arg->couponStatus]);         
        return $update;
    }

   public static function restaurantCouponList($arg)
    {
        $perPage = Constant::PERPAGE;
        $data= DB::table('Coupon')
                  ->select('Coupon.id','Coupon.outletId As outletId','Coupon.discountPerscentage','Coupon.maxDiscount','Coupon.couponName','Coupon.couponStatus As couponStatus','Outlets.name','Outlets.email','Outlets.image')
                  ->Join('Outlets', 'Coupon.outletId', '=', 'Outlets.id')
                  // ->where('Coupon.status','1')
                  ->paginate($perPage, ['*'], 'page', $arg->page);
        return $data;
    }

      public static function getOutletCoupon($outletId)
    {
        $data=Coupon::where(['outletId'=>$outletId,'couponStatus'=>'1'])->get();         
        return $data;
    } 

     public static function couponDelete($arg)
    {
        if ($arg->outletId) {
        $outletId = $arg->outletId;
        } else {
        $outletId  = Auth::guard('restaurant')->user()->id; 
        }
        $update=Coupon::where(['id'=>$arg->id])->update(['couponName' => $arg->couponName,'isDeleted' => '1']);         
        return $update;
    }      

}
