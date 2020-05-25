<?php

namespace App\Http\Service\RestaurantAdmin;
use App\Dishes;
use App\Http\Repository\DishRepostitory;
use App\Http\Service\DataService;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\Constant;
use Auth;


Class DishMangementService
{

    public function listDishes($pageNumber)
    {
        
        $outletId  = Auth::guard('restaurant')->user()->id;
        $dishRepostitory  = new DishRepostitory();
        $list             = $dishRepostitory->list($pageNumber,$outletId);
        $data             = new DataService();
        if ($list->isNotEmpty()) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->list         = $list->flatten();
            $data->totalPage    = $list->lastPage();
        } else {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.failure');
            $data->list         = [];
        }

        return $data;

    }


    public function addDishes($arg)
    {
        $outletId  = Auth::guard('restaurant')->user()->id;


        if($arg->isRecommended == 1){
            $defaults = new Defaults();
            $images = $defaults->imageUpload($arg->image, Constant::DISHIMAGE);
        }else{
            $images = " ";
        }
        $dishes  = new Dishes();
        $dishes->outletId      = $outletId;
        $dishes->name          = $arg->name;
        $dishes->price         = $arg->price;
        $dishes->image         = $images;
        $dishes->slashedPrice  = isset($arg->slashedPrice)? $arg->slashedPrice:'0';
        $dishes->quantity      = $arg->quantity;
        $dishes->isRecommended = $arg->isRecommended;
        $dishes->isVeg         = $arg->isVeg;
        $dishes->categoryId    = $arg->categoryId;
        $dishes->showFromTime  = date("H:i:s", strtotime($arg->showFromTime));
        $dishes->showToTime    = date("H:i:s", strtotime($arg->showToTime));
        $dishes->status        = $arg->status;
        $dishes->isCustomisation = $arg->isCustomisation;
        $dishes->customisationCategory =$arg->customisationCategory;



        $dishRepostitory  = new DishRepostitory();
        $add             = $dishRepostitory->add($dishes);
        $data             = new DataService();
        if ($add) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }

    public function getDishes($dishId)
    {

        $dishRepostitory = new DishRepostitory();
        $dish    = $dishRepostitory->getDishes($dishId);
        $data    = new DataService();
        if ($dish) {
            $path = url('/') . '/images/';
            $dishes = new Dishes();
            $dishes->categoryId    = $dish->categoryId;
            $dishes->name          = $dish->dishName;
            $dishes->image         = is_null($dish->image) ? "null" : $path . $dish->image;
            $dishes->price         = $dish->price;
            $dishes->slashedPrice  = $dish->slashedPrice;
            $dishes->quantity      = $dish->quantity;
            $dishes->isVeg         = $dish->isVeg;
            $dishes->isRecommended = $dish->isRecommended;
            $dishes->showFromTime  = $dish->showFromTime;
            $dishes->showToTime    = $dish->showToTime;
            $dishes->status        = $dish->status;
            $dishes->dishId        = (string)$dish->dishId;
            $dishes->customisationCategory = $this->getCustomisation($dishId);
            if(!$dishes->customisationCategory->isEmpty()){
                $dishes->isCustomisation=Constant::IS_CUSTOMIZE;
            }else{
                $dishes->isCustomisation=Constant::NO_CUSTOMIZE;
            }
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->dishes       = $dishes;

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }


    public function getCustomisation($dishId)
    {
        $dishRepostitory = new DishRepostitory();
        $customization     = $dishRepostitory->getCustomisationCategory($dishId);
        $customizationItem = $dishRepostitory->getItems($dishId);
        $data = $customization->map(function ($customization) use ($customizationItem) {
            $items = $customizationItem->filter(function ($categoryId) use ($customization) {
                return $categoryId->customisationCategoryId == $customization->customisationCategoryId;

            });
            $dishesCustomisationCategories = new \stdClass();
            $dishesCustomisationCategories->categoriesPathId = $customization->categoriesPathId;//this id  is pathid in customisationCategory
            $dishesCustomisationCategories->customisationItem = $items->flatten();
            return $dishesCustomisationCategories;
        });

        return $data;

    }


    public function updateDishes($arg)
    {

        $outletId  = Auth::guard('restaurant')->user()->id;
        $dishRepostitory  = new DishRepostitory();
        $add             = $dishRepostitory->updateDishes($arg,$outletId);
        $data             = new DataService();
        if ($add) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }


    public function deleteDishes($dishId)
    {

        $outletId         = Auth::guard('restaurant')->user()->id;
        $dishRepostitory  = new DishRepostitory();
        $delete           = $dishRepostitory->deleteDishes($dishId,$outletId);
        $data             = new DataService();
        if ($delete) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }

    public function dishSearch($request)
    {
        
        $outletId  = Auth::guard('restaurant')->user()->id;
        $dishRepostitory  = new DishRepostitory();
        $list             = $dishRepostitory->dishSearch($request,$outletId);
        $data             = new DataService();
        if ($list->isNotEmpty()) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->list         = $list->flatten();
            $data->totalPage    = $list->lastPage();
        } else {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.failure');
            $data->list         = [];
        }

        return $data;

    }

    public function editDishes($arg)
    {

        $outletId  = Auth::guard('restaurant')->user()->id;
        $dishRepostitory  = new DishRepostitory();
        $add             = $dishRepostitory->editDishes($arg,$outletId);
        $data             = new DataService();
        if ($add) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }
 
     public function fileUpload($arg)
    {

        $outletId  = Auth::guard('restaurant')->user()->id;
        $dishRepostitory  = new DishRepostitory();
        $add             = $dishRepostitory->fileUpload($arg,$outletId);
        $data             = new DataService();
        if ($add) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->imageUrl     = $add;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }

}