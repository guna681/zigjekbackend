<?php
namespace App\Http\Service;

use App\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\Constant;
use App\Http\Repository\CartRepostitory;
use App\Http\Repository\AppConfigRepostitory;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\DishRepostitory;
use App\Http\Repository\OutletsRepostitory;
use App\Http\DTO\CartDTO;
use App\Http\Service\AppconfigService;
use App\Cart;
use App\Dishes;
use App\DishesCustomisationCategories;
use App\Coupon;
use Validator;

Class  CartService{

    public function addToCart($arg)
    {
        $userId=Auth::guard('api')->user()->Id;
        $dishes= json_decode($arg->dishes);
        $cart           = new Cart();
        $cart->udId     =$arg->udId;
        $cart->userId   =$userId;
        $cart->outletId = $arg->outletId;
        $cartRepostitory=new CartRepostitory();
        $data           =new DataService();
        foreach($dishes as $dish){

            $cart->dishId       = $dish->dishId;
            $cart->quantity     = $dish->quantity;
            $cart->uuId         = $dish->uuId;
            $cart->customisation= $dish->customisation;
            $cartData           = $cartRepostitory->addToCart($cart);
        }
        if($cartData){
            $dishIds            =array_pluck($dishes,'dishId');
            $cart->dishId       =$dishIds;
            $cartRepostitory->removeCartDishes($cart);
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.cartSuccess');
        }else{
            $data->error        =Common::error_true;
            $data->errorMessage =__('failure');
        }
        return $data;

    }

    public function viewCart($arg)
    {
        $userId          = Auth::guard('api')->user()->id;
        $cartRepostitory = new CartRepostitory();
        $cartRepostitory->updateDeliveryAddress($arg,$userId);
        $cart            = $cartRepostitory->getCart($arg->udId,$userId);
        $data            = new DataService();
        if(!$cart->isEmpty()){
            
            if ($cart[0]->couponName == ' '){
            $currencyRepostitory    = new CurrencyRepostitory();
            $data->error       = Common::error_false;
            $data->errorMessage= __('validation.isCart');
            $data->couponStatus= false;
            $billsdata = $this->getDishes($cart);
            $data->dishes      = $billsdata;
            } else {
              $currencyRepostitory    = new CurrencyRepostitory();
            $data->error       = Common::error_false;
            $data->errorMessage= __('validation.isCart');
            $billsdata = $this->getDishes($cart);
            $data->dishes      = $billsdata;
            
            if ($billsdata->billTotals[0]->itemTotal >= 100) {
            $data->couponName  = $billsdata->billTotals[5]->couponCode;
            $data->couponStatus= true;
            } else {
            $data->couponStatus= false;
            }
            }           

        }else{
            $data->error       = Common::error_true;
            $data->errorMessage = __('validation.noCart');

        }
        return $data;

    }


    public function getDishes($cartDishes){
        $dishRepostitory        = new DishRepostitory();
        foreach($cartDishes as $dish){
           
            $dishes             =$dishRepostitory->getDishes($dish->dishId);
            $dishesCustomisation=$dishRepostitory->getCustomisationItem($dish->dishId);
            $dishTransform      =$this->DishesTransForm($dishes,$dishesCustomisation,$dish);
            $dishTotal[]        =$dishTransform;
            $userId             =$dish->userId;
            $outletId           =$dish->outletId;
            $addressId          =$dish->deliveryaddressId;
        }
        $toMany                     = $this->toMany($dishTotal,$cartDishes);

        if(!(array)$toMany){
            $isCartEligble=false;
        }else{
            $isCartEligble=true;
        }

        $cartRepostitory            = new CartRepostitory();
        $cart                       = new Cart();
        $cart->outletDetails        = $cartRepostitory->getOutlet($outletId);
        $cart->dishes               = $dishTotal;

        $totalcharges[]             = $this->getItemTotal($dishTotal);
        $totalcharges[]             = $this->getCharges($outletId, $cartDishes);
        $totalcharges[]             = $this->getTaxes();
        // print_r($cartDishes[0]->couponName);
        // die;
        if ($cartDishes[0]->couponName !== ' ' && $totalcharges[0][0]->itemTotal > 100) {
        $couponDiscount             = $this->getcouponeDiscount($cartDishes[0]->couponName);
        $totalcharges[]             = $this->getCouponeTotals($totalcharges,$couponDiscount);
        $totalcharges[]             = $this->getDiscount($totalcharges);

        function moveElement(&$totalcharges, $a, $b) {
            $out = array_splice($totalcharges, $a, 1);
            array_splice($totalcharges, $b, 0, $out);
        }
        $totalcharges[] = moveElement($totalcharges, 4, 3);
        } else {
        $totalcharges[]             = $this->getTotals($totalcharges);
        }
        // $totalcharges[]             = $this->getTotals($totalcharges);

        $cart->billTotals           = array_collapse($totalcharges);

        $cart->isTwoMany            = $isCartEligble;
        $cart->toMany               = $toMany;
        $address                    = $this->getDeliveryAddress($cart->outletDetails,$addressId);
        $cart->isAddress            = ($address->unsaved == 0)? true :  false;
        $cart->address              = ($address->unsaved == 0)? $address :(object)[];

        return $cart;
    }


    public function DishesTransForm($dishes,$dishCustomisation,$dish)
    {


        $dishRepostitory            =new DishRepostitory();
        $customisationCategory      =$dishRepostitory->getCustomisationCategory($dishes->dishId);
        $customisationItem          =$dishRepostitory->getCustomisationItem($dishes->dishId);

        /* customisation item selected and unselected logic */

        $customisation          =array_flatten(json_decode($dish->customisationId));

        $cartCustomisationId    =array_pluck($customisation,'dishCustomisationId');


        $filtered1              = $customisationItem->whereIn('elementId', $cartCustomisationId);
        $filtered2              = $customisationItem->whereNotIn('elementId',$cartCustomisationId);

        $selectedCustomisation  =$filtered1->transform(function ($item, $key) {
            $item->isSelected = 1;
            return $item;
        });
        $unselectedCustomisation=$filtered2->transform(function ($item, $key) {
            $item->isSelected = 0;
            return $item;
        });

        $customisationItems     =$selectedCustomisation->union($unselectedCustomisation);

        $dishCustomisation      =$this->dishCustomisationTransform($customisationCategory,$customisationItems);
        /* customisationitem total price */

        $customisationTotal     =$selectedCustomisation->reduce(function ($carry,$item){

            return $carry+$item->Price;
        });
        $currencyRepostitory    =new CurrencyRepostitory();
        $currency               = $currencyRepostitory->getCurrency();
        $obj                    =new \stdClass();
        $obj->dishId            =$dishes->dishId;
        $obj->dishName          =$dishes->dishName;
        $obj->dishPrice         =$dishes->price;
        $obj->isVeg             =$dishes->isVeg;
        $obj->description       =$dishes->description;
        $obj->isAvailable       =true;
        $obj->dishTotal         =($dishes->price+$customisationTotal)*$dish->quantity;
        $obj->displayDishTotal  =$currency.($dishes->price+$customisationTotal)*$dish->quantity;
        $obj->dishCustomisation =$dishCustomisation;
        $obj->dishQuantity      =$dish->quantity;
        $obj->cartId            =$dish->id;
        $obj->uuId              =$dish->uuId;
        if(!$customisationItem->isEmpty()){
            $obj->isCustomizable=Constant::IS_CUSTOMIZE;
        }else{
            $obj->isCustomizable=Constant::NO_CUSTOMIZE;
        }

        return $obj;
    }


    public function dishCustomisationTransform($category,$customisationItem){

        $data=$category->map(function($category) use($customisationItem){

            $item=$customisationItem->filter(function($items) use($category){

                return $items->customisationCategoryId == $category->customisationCategoryId;
            });
            $dishesCustomisationCategories  =new DishesCustomisationCategories();
            $dishesCustomisationCategories->customizableId       =$category->customisationCategoryId;
            $dishesCustomisationCategories->customizableName     =$category->customisationName;
            $dishesCustomisationCategories->customizableType     =$category->categoriesType;
            $dishesCustomisationCategories->customizableDishItems=$item->flatten();
            return $dishesCustomisationCategories;
        });

        return $data;

    }

    public function getItemTotal($data)
    {

        $currencyRepostitory   = new CurrencyRepostitory();
        $currency              = $currencyRepostitory->getCurrency();
        $total                 = array_reduce($data, function ($carry, $item) {
                                                        $carry += $item->dishTotal;
                                                        return $carry;
                                                    });
        $itemTotal                  = (object)array();
        $itemTotal->displayKey   = __('validation.itemTotalName');
        $itemTotal->displayValue   = $currency .number_format($total,2);
        $itemTotal->itemTotal       = $total;
        $itemTotal->percentage      = $total;
        $dishtotal[]                = $itemTotal;
        return $dishtotal;
    }

    public function getcouponeDiscount($coupon)
    {
   $cartRepostitory    = new CartRepostitory();
        $data               = new DataService();
        $coupon  = $cartRepostitory->getCoupon($coupon);
        $itemTotal                  = (object)array();
        $itemTotal->couponStatus   = $coupon->status;
        $itemTotal->couponCode   = $coupon->couponName;
        $itemTotal->maxDiscount       = $coupon->maxDiscount;
        $itemTotal->percentage      = 0;
        $itemTotal->discountType    = $coupon->discountPerscentage;
        $dishtotal[]                = $itemTotal;
        return $dishtotal;
    }

  public function getDiscount($coupon)
    {
        $itemTotal                  = (object)array();
        $itemTotal->displayKey   = 'Total Discount';
        $itemTotal->displayValue   = '-₹'.$coupon[3][0]->couponSavingAmount;
        $itemTotal->couponSavingAmount       = '-₹'.$coupon[3][0]->couponSavingAmount;
        $itemTotal->couponStatus   = $coupon[3][0]->couponStatus;
        $dishtotal[]                = $itemTotal;
        return $dishtotal;
    }

    public function getTotals($charges){


        $charge = array_flatten($charges);
        $currencyRepostitory   = new CurrencyRepostitory();
        $currency              = $currencyRepostitory->getCurrency();

        $topay=array_reduce($charge, function($carry, $item) {
            $carry += $item->percentage;
            return $carry;
        });

        $total = new \stdClass();
        $total->displayKey  =  __('validation.topayName');
        $total->displayValue= $currency .number_format($topay,2);
        $total->netAmount   = (string)floatval($topay);

        return array($total);

    }

    public function getCouponeTotals($charges,$discountData){

        $charge = array_flatten($charges);
        $currencyRepostitory   = new CurrencyRepostitory();
        $currency              = $currencyRepostitory->getCurrency();

        $topay=array_reduce($charge, function($carry, $item) {
            $carry += $item->percentage;
            return $carry;
        });

        $total = new \stdClass();
        $total->displayKey  =  __('validation.topayName');
        $total->totalNetAmount   = (string)floatval($topay);
        $total->couponCode  = $discountData[0]->couponCode;
        $total->couponStatus = 1;
        $totalDiscountAmount = ($discountData[0]->discountType / 100) * $total->totalNetAmount;
        if ($totalDiscountAmount > $discountData[0]->maxDiscount) {
        $total->couponSavingAmount  = $discountData[0]->maxDiscount;
        $total->netAmount   = number_format($topay,2) ;
        // print_r(number_format($topay,2));
        // print_r($currency .(string)floatval($topay - $discountData[0]->maxDiscount);
        //     die;
        $total->netAmount   = (string)floatval($topay - $discountData[0]->maxDiscount);
        $total->displayValue= $currency .(string)floatval($topay - $discountData[0]->maxDiscount);
        } else {
        $total->couponSavingAmount  = $totalDiscountAmount;
        // $total->netAmount   = number_format($topay,2);
        $total->netAmount   = (string)floatval($topay - $totalDiscountAmount);
        $total->displayValue= $currency .(string)floatval($topay - $totalDiscountAmount);
        }
        return array($total);

    }

    public function toMany($dishes,$cartDishes){
    
        $dishQuantity=array_reduce($dishes, function($carry, $item) {
                $carry += $item->dishQuantity;
                return $carry;
        });

        $dishCartQuantity=$cartDishes->reduce(function ($carry, $item){
            $carry += $item->quantity;
            return $carry;
        });
        $tomany=(object)array();
        if($dishCartQuantity>$dishQuantity){
            $tomany->shortDes=__('validation.shortDes');
            $tomany->longDesc=__('validation.longDesc');
        }
        return $tomany;
    }

    public function getCharges($outletId, $cart)
    {


        $appConfigRepostitory = new AppConfigRepostitory();
        $appconfigdata = $appConfigRepostitory->getAppConfig();
        $deliverycharge = floatval($appconfigdata[0]->Value);
        $currencyRepostitory    = new CurrencyRepostitory();
        $currency               = $currencyRepostitory->getCurrency();
        $cartRepostitory        = new CartRepostitory();
        $outlets                = $cartRepostitory->getOutlet($outletId);
        $totalQuantity = 0;
        foreach($cart as $cartt) {
            $totalQuantity += $cartt->quantity;
        }
        $restaurantcharge = floatval($outlets->restaurantCommission) * $totalQuantity;
        $deliveryCharges                 = (object)array();
        $deliveryCharges->displayKey     = __('validation.deliveryCharge');
        $deliveryCharges->displayValue   = $currency.$deliverycharge;
        $deliveryCharges->percentage     = $deliverycharge;
        $charges[]                       = $deliveryCharges;
        $restaurantCharges               = (object)array();
        $restaurantCharges->displayKey   = __('validation.restaurantCharge');
        $restaurantCharges->displayValue = $currency . $restaurantcharge;
        $restaurantCharges->percentage   = $restaurantcharge;
        $charges[]                       = $restaurantCharges;

        return $charges;
    }

    public function getTaxes()
    {

        $cartRepostitory = new CartRepostitory();
        $taxes           = $cartRepostitory->getTaxes();
        return $taxes;


    }

    public function getDeliveryAddress($outlets,$addressId)
    {
        $cartRepostitory     = new CartRepostitory();
        $deliveryAddress     = $cartRepostitory->getDeliveryAddress($addressId);
        $address             = new Address();

        $outletsRepostitory     = new OutletsRepostitory();
        $time                   = $outletsRepostitory->distanceTo($deliveryAddress, $outlets);
        $address->address       = $deliveryAddress->fullAddress;
        $address->time          = $time;
        $address->displayTime   = ($time >10)?$time:'30' .__('validation.mins');
        $address->name          = __('validation.deliveryto') . $deliveryAddress->type;
        $address->addressId     = $deliveryAddress->id;
        $address->unsaved       = $deliveryAddress->unSaved;



        return $address;


    }


    public function updateCart($arg)
    {

        $userId             = Auth::guard('api')->user()->id;
        $cartRepostitory    = new CartRepostitory();
        $cart               = new Cart();
        $cart->userId       = $userId;
        $cart->udId         = $arg->udId;
        $cart->outletId     = $arg->outletId;
        $cart->cartId       = $arg->cartId;
        $cart->quantity     = $arg->quantity;
        $cart               = $cartRepostitory->updateCart($cart);
        $data               = new DataService();
        if ($cart) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.updateCart');

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;
    }

    public function listDeliveryAddress($outletId,$userId){
        $cartRepostitory    = new CartRepostitory();
        $results            = $cartRepostitory->listDeliveryAddress($outletId,$userId);
        $data               = new DataService();
        $deliveryAddress    = array();

        if($results){
            $data->error                =Common::error_false;
            $data->errorMessage         =__('success');
            $outletsRepostitory         = new OutletsRepostitory();
            $outlets                    = $cartRepostitory->getOutlet($outletId);
            foreach($results as  $result) {
                $address                = new Address();
                $time                   = $outletsRepostitory->distanceTo($result, $outlets);
                $address->displayTime   = ($time >10)?$time:'30' .__('validation.mins');
                $address->address       = $result->fullAddress;
                $address->name          =__('validation.deliveryto').$result->type;
                $address->addressId     = $result->id;
                array_push($deliveryAddress,$address);
            }
            $data->listDeliveryAddress  =$deliveryAddress;
        }else{
            $data->error                =Common::error_false;
            $data->errorMessage         =__('failure');
            $data->listDeliveryAddress  = $deliveryAddress;
        }
        return $data;

    }




    public function addCoupon($arg)
    {

        $cartRepostitory    = new CartRepostitory();
        $data               = new DataService();

            $coupon  = $cartRepostitory->addCoupon($arg);

                if ($coupon) {
                    $cartData           = $cartRepostitory->addCouponToCart($arg);
                    $userId          = Auth::guard('api')->user()->id;
                    $cartValue               = $cartRepostitory->getCartValue($arg);
                    $billsdata = $this->getDishes($cartValue);
    
                    if ($billsdata->billTotals[0]->itemTotal > 100) {
                    $data->error            = Common::error_false;
                    $data->errorMessage     = __('validation.applyCoupon');
                    $data->couponStatus = true;
                    $data->couponName = $coupon->couponName;
                    $title = $coupon->couponName.' '.'applied';
                    $message = '₹'.$billsdata->billTotals[5]->couponSavingAmount. ' savings with this coupon';
                    $description = 'keep using coupon and save more with each order';
                    $data->title = $title;
                    $data->message = $message;
                    $data->amount = $billsdata->billTotals[5]->couponSavingAmount;
                    $data->description = $description;
                    } else {
                    $data->error            = Common::error_true;
                    $data->errorMessage     = __('validation.couponNotApply');
                    $title = 'Oops!';
                    $data->title = $title;
                    $data->description = 'Cart value is not sufficient';
                    }
                    // $message = $coupon->couponType.' off up to ₹'.$coupon->discount.' on order above ₹100';

                } else {
                    $data->error        = Common::error_true;
                    $data->errorMessage = __('validation.couponNotExits');
                    // $data->isNewUser    = Common::error_false;//false  is exitusers
                }
            return $data;
    }

        public function removeCoupon($arg)
    {

        $cartRepostitory    = new CartRepostitory();
        $data               = new DataService();

            $coupon  = $cartRepostitory->removeCoupon($arg);

                if ($coupon) {
                    $data->error            = Common::error_false;
                    $data->errorMessage     = __('validation.removeCoupon');

                } else {
                    $data->error        = Common::error_false;
                    $data->errorMessage = __('failure');
                    // $data->isNewUser    = Common::error_false;//false  is exitusers
                }
            return $data;
    }

}