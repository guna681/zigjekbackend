<?php

namespace  App\Http\Service;
use App\Http\Repository\CurrencyRepostitory;



Class  TaxService
{


    //admin total calculation

    public function getGrandTotals($charges)
    {
        $charge                = array_flatten($charges);
        $currencyRepostitory   = new CurrencyRepostitory();
        $currency              = $currencyRepostitory->getCurrency();

        $topay=array_reduce($charge, function($carry, $item) {
                                $carry += $item->percentage;
                                return $carry;
                            });

        $total              = new \stdClass();
        $total->displayKey  =  __('validation.grandTotal');
        $total->displayValue= $currency .number_format($topay,2);
        $total->netAmount   = number_format($topay,2);
        return array($total);

    }



    public function getItemTotal($data)
    {

        $currencyRepostitory = new CurrencyRepostitory();
        $currency            = $currencyRepostitory->getCurrency();
        $total               = array_reduce($data, function ($carry, $item) {
                                                    $carry += $item->dishTotal;
                                                    return $carry;
                                            });
        $itemTotal = new \stdClass();
        $itemTotal->displayKey      = __('validation.itemTotalName');
        $itemTotal->displayValue    = $currency . number_format($total, 2);
        $itemTotal->itemTotal       = $total;
        $itemTotal->percentage      = $total;
        $dishtotal[]                = $itemTotal;
        return $dishtotal;
    }


    public function getTotals($charges){

        $charge                = array_flatten($charges);
        $currencyRepostitory   = new CurrencyRepostitory();
        $currency              = $currencyRepostitory->getCurrency();
        $topay                 =array_reduce($charge, function($carry, $item) {
                                                $carry += $item->percentage;
                                                return $carry;
                                            });

        $total = new \stdClass();
        $total->displayKey  =  __('validation.topayName');
        $total->displayValue= $currency .number_format($topay,2);
        $total->netAmount   = number_format($topay,2);


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

    public function getCharges($outletId)
    {
        $currencyRepostitory    = new CurrencyRepostitory();
        $currency               = $currencyRepostitory->getCurrency();
        $cartRepostitory        = new CartRepostitory();
        $outlets                = $cartRepostitory->getOutlet($outletId);
        $deliveryCharges                 = new \stdClass();
        $deliveryCharges->displayKey     = __('validation.deliveryCharge');
        $deliveryCharges->displayValue   = $currency.$outlets->deliveryCharges;
        $deliveryCharges->percentage     = $outlets->deliveryCharges;
        $charges[]                       =$deliveryCharges;
        $restaurantCharges               = new \stdClass();
        $restaurantCharges->displayKey   = __('validation.restaurantCharge');
        $restaurantCharges->displayValue = $currency . '25.00';
        $restaurantCharges->percentage     = '25.00';
        $charges[]                       = $restaurantCharges;

        return $charges;
    }

    public function getTaxes()
    {
        $cartRepostitory = new CartRepostitory();
        $taxes           = $cartRepostitory->getTaxes();
        return $taxes;
    }


}