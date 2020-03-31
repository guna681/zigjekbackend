<?php
namespace App\Http\Repository;

use App\User;
use App\Cart;
use App\CartCustomisations;
use App\Dishes;
use App\Restaurant;
use App\Outlets;
use App\Reviews;
use App\Setting;
use App\Address;
use App\Taxes;
use App\Coupon;
use App\DishesCustomisation;
use App\DishesCustomisationCategories;
use App\Http\Service\AppconfigService;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;
use DB;
use App\Http\Utility\Constant;


Class CartRepostitory extends Cart{
  private $data = array();
  
  public function  userIdToCart($data)
  {
    $cart=Cart::where('udId',$data->udId)->get();
    if($cart && $data->userId){
        $cartUsers=Cart::Where('udId',$data->udId)->update(['userId'=>$data->userId]);
    }

  }

  public function addToCart($data)
  {

      $customisationId=array_pluck($data->customisation,'dishCustomisationId');
      $exists=Cart::select('Cart.dishId')
                    ->where(['Cart.udId'=>$data->udId])
                    ->where(['Cart.dishId'=>$data->dishId])
                    ->where(['Cart.userId'=>$data->userId])
                    ->where('Cart.orderId','=','0')
                    ->where('customisationId', '=', json_encode($data->customisation))
                    ->get();

      if($exists->isEmpty()){

          try{
              $cart= new Cart;
              $cart->udId            =$data->udId;
              $cart->userId          =$data->userId;
              $cart->outletId        =$data->outletId;
              $cart->uuId            =$data->uuId;
              $cart->dishId          =$data->dishId;
              $cart->customisationId =json_encode($data->customisation);
              $cart->quantity        =$data->quantity;
              $cart->save();

          }catch(\Illuminate\Database\QueryException $ex){
              $jsonresp=$ex->getMessage();
              return false;

          }

          /* dishCustomisation item insert logic */
          if($data->customisation){
              $customisation=$data->customisation;
              data_fill($customisation,'*.cartId',$cart->id);//key add for existing array
              data_fill($customisation,'*.dishId',$data->dishId);
              data_fill($customisation,'*.created_at',date('Y-m-d H:i:s'));
              data_fill($customisation,'*.updated_at',date('Y-m-d H:i:s'));
              $dishCustomisation=json_decode(json_encode($customisation),true);


              $result=$this->cartCustomisation()->insert($dishCustomisation);
          }


      }else{
          $update=Cart::where(['udId'=>$data->udId,'dishId'=>$data->dishId])
                        ->update(['quantity' =>$data->quantity,'uuId'=>$data->uuId]);
      }

      return true;
  }

  public function cartCustomisation()
  {

      return $this->hasOne('App\CartCustomisations');
  }

    public function updateCart($data)
    {

        if ($data->quantity == 0) {
            $destroy = Cart::where(['udId' => $data->udId, 'userId' => $data->userId, 'id' => $data->cartId])
                            ->where('orderId', 0)
                            ->delete();
        } else {

            $update = Cart::where(['udId' => $data->udId, 'id' => $data->cartId, 'orderId' => 0])
                            ->update(['quantity' => $data->quantity]);
        }

        return true;
    }


  public function getCart($udId,$userId)
  {
      $cart = array();
      $cart =Cart::where('udId',$udId)
                ->where('userId',$userId)
                ->where('orderId','0')
                ->get();

      return $cart;
  }

  public function removeCartDishes($data)
  {
      $delete=Cart::where('udId',$data->udId)
                  ->where('orderId',0)
                  ->whereNotIn('dishId',$data->dishId)
                  ->delete();
  }

  public function getOutlet($outletId)
  {
      $data=array();
      $url=url('/');
      $path='/images/';
      $data=Outlets::select(DB::raw("id as outletId,name as outletName,CONCAT('$url','$path',image)as outletImage,area as outletArea,latitude,longitude,deliveryCharges,restaurantCommission,serviceCommission,restaurantId"))
                  ->where('Outlets.id',$outletId)
                  ->first();
          
      return $data;
  }


  public function updateDeliveryAddress($data,$userId){



      try {
          $cart = Cart::where(['udId' => $data->udId,'userId' => $userId])
                        ->update(['deliveryaddressId' => $data->addressId]);

      } catch (\Illuminate\Database\QueryException $ex) {
          $jsonresp = $ex->getMessage();
          return false;
      }

      return true;
  }

  public function getDeliveryAddress($addressId)
  {

      $data=Address::select('id','fullAddress','latitude','longitude','type','unSaved')
                    ->where(['id'=>$addressId])
                    ->first();
      return $data;
  }


  public function getTaxes()
  {
      $currencyRepostitory    = new CurrencyRepostitory();
      $currency               = $currencyRepostitory->getCurrency();
      $data=Taxes::select(DB::raw("id,Name as displayKey,Percentage,CONCAT('$currency',Percentage)as displayValue,IsActive"))
                  ->get();
      return $data;
  }
  public function listDeliveryAddress($outletId,$userId){
      $outlets  =  $this->getOutlet($outletId);
      $setting  =  new SettingRepostitory();
      $radius   =  $setting->getValue(Constant::DELIVERY_ADDRESS_RADIUS);
      $results =DB::select(DB::raw("select fullAddress,id,userId,location,houseFlatNo,landMark,latitude,longitude,type,(
                6371 * acos (
                cos ( radians('$outlets->latitude') )
                * cos( radians( Address.latitude ) )
                * cos( radians( Address.longitude ) - radians('$outlets->longitude') )
                + sin ( radians('$outlets->latitude') )
                * sin( radians( Address.latitude ) )
              )
          ) AS distance from Address where Address.userId='$userId' and Address.unSaved = '0' and Address.isDeleted = '0' and  Address.id Having distance < '$radius'ORDER by distance asc"));


      return $results;

  }



    public function addCoupon($data)
    {
        $data = Coupon::where(['outletId'=>$data->outletId,'couponCode'=>$data->couponCode])->first();
        return $data;
    }

 public function addCouponToCart($data)
    {
       $update=Cart::where(['udId'=>$data->udId])
                        ->update(['couponName' =>$data->couponCode]);        
       return $update;
    }

 public function getCartValue($data)
    {
            $cart = array();
        $cart =Cart::where('udId',$data->udId)
                ->get();        
       return $cart;
    }

 public function getCartValue1($data)
    {
            $cart = array();
        $cart =Cart::where('id',$data->cartId)
                ->get();        
       return $cart;
    }


 public function removeCoupon($data)
    {
      $couponCode = ' ';
       $update=Cart::where(['udId'=>$data->udId])
                        ->update(['couponName' =>$couponCode]);        
       return $update;
    }

        public function getCoupon($data)
    {
        $data = Coupon::where(['couponCode'=>$data])->first();
        return $data;
    }
}
