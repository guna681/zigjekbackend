<?php

namespace App\Http\Repository;

use App\Restaurant;
use App\Outlets;
use App\Reviews;
use App\Dishes;
use App\Setting;
use App\Coupon;
use App\Cart;
use App\OutletMenuCategories;
use App\DishesCustomisationCategories;
use App\DishesCustomisation;
use App\CartCustomisations;
use App\Http\Utility\Defaults;
use App\Http\Utility\Constant;
use App\Http\Repository\CartRepostitory;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\CustomisationCategoryRepostitory;
use DB;
Use Log;

class DishRepostitory extends Dishes
{

    public function getCategory($outletId)
    {
        $data = array();
        $data = OutletMenuCategories::select('id as categoryId', 'name as categoryName')
                                  ->where(['outletId' => $outletId, 'parentId' => '0', 'status'=> '1'])
                                  ->get();

        return $data->toarray();

    }

    public function getSubCategory($outletId)
    {
        $data = array();

        $data = OutletMenuCategories::select('id as categoryId', 'parentId', 'name as categoryName')
                                 ->where('outletId', $outletId)
                                 ->where('parentId', '!=', '0')
                                 ->get();

        return $data->toarray();

    }


    public function getRecommendedDihses($outletId)
    {
        $data = array();
        $data = Dishes::select('id as dishId', 'name as dishName', 'categoryId', 'isRecommended', 'price', 'image', 'showFromTime', 'showToTime', 'isVeg','slashedPrice')
                      ->where('isRecommended', 1)
                      ->where('outletId', $outletId)
                      ->where('status','=', 1)
                      ->whereNull('deleted_at')
                      ->get();

        return $data;

    }

    public function getDish($categoryId)
    {
        $data = array();
        $data = Dishes::select(DB::raw("id as dishId,name as dishName,categoryId,price,image,showFromTime,showToTime,isVeg,description,slashedPrice,isRecommended"))
                      ->where(['categoryId'=>$categoryId,'status'=>'1'])
                      // ->where('status','!=', 1)
                      ->whereNull('deleted_at')
                      ->get();

        return $data;
    }


    public function getCustomisationCategory($dishId)
    {
        $data = array();
        $data = DishesCustomisationCategories::select('Dishes_Customisation_Categories.id as customisationCategoryId', 'Dishes_Customisation_Categories.name as customisationName', 'Dishes_Customisation_Categories.dishId', '.Dishes_Customisation_Categories.categoriesType', 'Dishes_Customisation_Categories.categoriesPathId','Dishes_Customisation_Categories.isDelete')
                                         ->join('Customisation_Category','Dishes_Customisation_Categories.categoriesPathId','=','Customisation_Category.id')
                                         ->where('dishId', $dishId)
                                         ->where('Customisation_Category.status', 1)
                                         ->where('Dishes_Customisation_Categories.isDelete', 0)
                                         ->where(['Dishes_Customisation_Categories.status'=>'0'])
                                         ->whereNull('Customisation_Category.deleted_at')
                                         ->get();

        return $data;

    }
	public function getCustomisationCategorywithCategoryType($dishId)
    {
        $data = array();
        $datasingle = DishesCustomisationCategories::select('Dishes_Customisation_Categories.id as customisationCategoryId', 'Dishes_Customisation_Categories.name as customisationName', 'Dishes_Customisation_Categories.dishId', '.Dishes_Customisation_Categories.categoriesType', 'Dishes_Customisation_Categories.categoriesPathId')
                ->join('Customisation_Category','Dishes_Customisation_Categories.categoriesPathId','=','Customisation_Category.id')
                ->where('dishId', $dishId)
                ->where(['Dishes_Customisation_Categories.status'=>'0','Dishes_Customisation_Categories.categoriesType'=>'single'])
                ->whereNull('Customisation_Category.deleted_at')
                ->get();
        $datamultiple = DishesCustomisationCategories::select('Dishes_Customisation_Categories.id as customisationCategoryId', 'Dishes_Customisation_Categories.name as customisationName', 'Dishes_Customisation_Categories.dishId', '.Dishes_Customisation_Categories.categoriesType', 'Dishes_Customisation_Categories.categoriesPathId')
                                         ->join('Customisation_Category','Dishes_Customisation_Categories.categoriesPathId','=','Customisation_Category.id')
                                         ->where('dishId', $dishId)
                                         ->where(['Dishes_Customisation_Categories.status'=>'0','Dishes_Customisation_Categories.categoriesType'=>'multiple'])
                                         ->whereNull('Customisation_Category.deleted_at')
                                         ->get();
        $data['single']=$datasingle;
        $data['multiple']=$datamultiple;

        return $data;

    }


    public function getCustomisationItem($dishId)
    {
        $data = array();
        $currencyRepostitory = new CurrencyRepostitory();
        $currency            = $currencyRepostitory->getCurrency();
        $data = DishesCustomisation::select('id as elementId', 'name as elementName', 'Price', DB::raw("CONCAT('$currency',FORMAT(Price,2)) AS displayPrice"), 'customisationCategoryId', 'selected as isSelected', 'isVeg')
                                     ->where('isDelete', 0)      
                                    ->where('dishId', $dishId)
                                    ->where('status','!=','1')
                                    ->get();
        return $data;
    }

    public function getCart($udId)
    {
        $data = array();
        $data = Cart::select('Cart.id as cartId', 'dishId', 'quantity', 'itemPrice')
                     ->where('udId', $udId)
                     ->get();

        return $data;
    }

    public function getCartCustomisation($cartId)
    {
        $data = array();
        $data = CartCustomisations::select('dishCustomisationId')
                                    ->where('cartId', $cartId)
                                    ->get();
        return $data;
    }


    public function getDishes($dishId)
    {
        $data = array();
        $data = Dishes::select('id as dishId', 'name as dishName', 'categoryId', 'slashedPrice', 'price', 'image', 'showFromTime', 'showToTime', 'isVeg', 'description', 'quantity', 'isRecommended', 'status', 'slashedPrice')
                        ->where('id', $dishId)
                        ->first();
        return $data;
    }


    public function getCustomisationItems($itemId)
    {

        $currencyRepostitory = new CurrencyRepostitory();
        $currency            = $currencyRepostitory->getCurrency();
        $data = DishesCustomisation::select('id as elementId', 'name as elementName', 'Price', DB::raw("CONCAT('$currency',FORMAT(Price,2)) AS displayPrice"), 'customisationCategoryId', 'selected as isSelected', 'isVeg')
                                    ->where('isDelete', 0)                            
                                    ->whereIn('id',$itemId)
                                    ->get();


        return $data;


    }




    /*admin dishes  module*/


    public function list($pageNumber, $outletId)
    {
        $currencyRepostitory = new CurrencyRepostitory();
        $currency            = $currencyRepostitory->getCurrency();
        $perPage = Constant::PERPAGE;
        $path    = url('/') . '/images/';
        $data    = DB::table('Dishes')
                        ->select(DB::raw("id,name,quantity,isVeg,status,CONCAT('$path',image)as image,CONCAT('$currency',Price) AS price"))
                        ->where('outletId', $outletId)
                        ->whereNull('deleted_at')
                        ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }

    public function add($data)
    {

        DB::beginTransaction();

        try {
            $dishes           = new Dishes();
            $dishes->outletId       = $data->outletId;
            $dishes->name           = $data->name;
            $dishes->price          = $data->price;
            $dishes->image          = $data->image;
            $dishes->slashedPrice   = $data->slashedPrice;
            $dishes->quantity       = $data->quantity;
            $dishes->isRecommended  = $data->isRecommended;
            $dishes->isVeg          = $data->isVeg;
            $dishes->categoryId     = $data->categoryId;
            $dishes->showFromTime   = $data->showFromTime;
            $dishes->showToTime     = $data->showToTime;
            $dishes->status         = $data->status;
            $dishes->save();
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        $customisationCategoryRepostitory = new CustomisationCategoryRepostitory();
        if ((int)$data->isCustomisation == 1) {

            /*customisationCategory and customisation item insert Logic*/

            foreach (json_decode($data->customisationCategory) as $customisationCategory) {
              //isDeleted no need to upload
                if(!isset($customisationCategory->isDelete))
                {
                $get = $customisationCategoryRepostitory->get($customisationCategory->customisationCategoryId, $data->outletId);

                try {
                    $dishesCustomisationCategories = new DishesCustomisationCategories();
                    $dishesCustomisationCategories->name = $get->name;
                    $dishesCustomisationCategories->dishId = $dishes->id;
                    $dishesCustomisationCategories->categoriesPathId = $customisationCategory->customisationCategoryId;
                    $dishesCustomisationCategories->categoriesType = $get->type;
                    $dishesCustomisationCategories->save();
                } catch (\Illuminate\Database\QueryException $ex) {
                    $jsonresp = $ex->getMessage();
                    DB::rollBack();
                    return false;
                }

                foreach ($customisationCategory->customisationItem as $customisationItem) {

                    if(!isset($dishCustomisationItem->isDelete))
                    {
                    try {
                        $dishCustomisationItem = new DishesCustomisation();
                        $dishCustomisationItem->name = $customisationItem->name;
                        $dishCustomisationItem->Price = $customisationItem->price;
                        $dishCustomisationItem->isVeg = ($customisationItem->isVeg == "true") ? '1' : '0';
                        $dishCustomisationItem->selected = $customisationItem->selected;
                        $dishCustomisationItem->dishId = $dishes->id;
                        $dishCustomisationItem->customisationCategoryId = $dishesCustomisationCategories->id;
                        $dishCustomisationItem->save();
                    } catch (\Illuminate\Database\QueryException $ex) {
                        $jsonresp = $ex->getMessage();
                        DB::rollBack();
                        return false;
                    }
                }
                }

                }

            }


        }

        DB::commit();
        return true;
    }


    public function customisationItem()
    {
        return $this->hasOne('App\DishesCustomisation');

    }


    public function getItems($dishId)
    {

        $data = DishesCustomisation::select('id', 'name', 'Price', 'selected', 'isVeg', 'customisationCategoryId','isDelete')
                                   ->where('isDelete', 0)
                                   ->where('dishId', $dishId)
                                   ->get();

        return $data;
    }


    public function updateDishes($data, $outletId)
    {

        DB::beginTransaction();


        if ($data->isRecommended == 1 && $data->image != "null" ) {
            $defaults = new Defaults();
            $images = $defaults->imageUpload($data->image, Constant::DISHIMAGE);
            $updateImage = Dishes::where(['id'=> $data->dishId])->update(['image'=>$images]);
                
        }

        try {

            $update = Dishes::where(['id'=> $data->dishId, 'outletId' => $outletId])
                             ->update(['name' => $data->name,          'price'     => $data->price, 'quantity'     => $data->quantity,
                              'isRecommended' => $data->isRecommended, 'isVeg'     => $data->isVeg, 'categoryId'   => $data->categoryId,
                              'showFromTime'  => $data->showFromTime, 'showToTime' => $data->showToTime, 'status'  => $data->status,'slashedPrice'=>$data->slashedPrice]);


        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();    
            DB::rollBack();
            return false;
        }

         
     if ($data->isCustomisation == 1) {
               

        foreach(json_decode($data->customisationCategory) as $key=>$customdata){
            $customisationCategoryId=null;

            if(count($customdata->customisationItem)>0 && $customdata->customisationItem[0]->categoriesMainId ==null)
        {

           
            $get =  DB::table('Customisation_Category')->select("*")->where('id',$customdata->customisationCategoryId)->first();
            try {
                $dishesCustomisationCategories = new DishesCustomisationCategories();
                $dishesCustomisationCategories->name = $get->name;
                $dishesCustomisationCategories->dishId = $data->dishId;
                $dishesCustomisationCategories->isDelete = $customdata->customisationItem[0]->isDelete;
                $dishesCustomisationCategories->categoriesPathId = $get->id;
                $dishesCustomisationCategories->categoriesType = $get->type;
                $dishesCustomisationCategories->save();
                $customisationCategoryId=$dishesCustomisationCategories->id;
            } catch (\Illuminate\Database\QueryException $ex) {
                $jsonresp = $ex->getMessage();
                DB::rollBack();
                return false;
            }
        }else
        {
            // $customisationCategory = DB::table('Customisation_Category')->select("*")->where('id',$customdata->customisationCategoryId)->first();
            // $update=['name'=>$customisationCategory->name,'isMandatory'=>0,'categoriesType'=>$customisationCategory->type,'categoriesPathId'=>$customisationCategory->id];
            // $update['isDelete']= isset($customdata->isDelete)?$customdata->isDelete:0;
            // $categoryupdate = DishesCustomisationCategories::
            //                  where(['id'=>$customdata->customisationCategoryId])
            //                    ->update($update);
        }

              foreach($customdata->customisationItem as $value) {
        
                  if ($value->isId === 'Yes') {


                    $value->customisationCategoryId  = $customdata->customisationCategoryId;
            
                    $value->customisationCategoryDelete = isset($customdata->isDelete)?$customdata->isDelete:0;
                  
                    $this->customisationUpdate($value);                 
                  } else {
                    $value->dishId = $data->dishId;
                   $value->customisationCategoryId  = $customdata->customisationCategoryId;
                    $this->customisationInsert($value,$customisationCategoryId);                    
                  }
              }

        }
        } else {
        // $destroy = DishesCustomisationCategories::where(['dishId' => $data->dishId])
        //                     ->delete();
        $destroy = DishesCustomisation::where(['dishId' => $data->dishId])->update(['isDelete'=>1]);
        }

        DB::Commit();
        return true;

    }

    public function customisationInsert($cusdata,$customisationCategoryId=null)
    {
  
       
        //                               Log::debug($cusdata->customisationCategoryId);
        // $get =  DB::table('Customisation_Category')->select("*")->where('id',$cusdata->customisationCategoryId)->first();
        // if($cusdata->categoriesMainId ==null)
        // {
        //                     try {
        //             $dishesCustomisationCategories = new DishesCustomisationCategories();
        //             $dishesCustomisationCategories->name = $get->name;
        //             $dishesCustomisationCategories->dishId = $cusdata->dishId;
        //             $dishesCustomisationCategories->isDelete = $cusdata->isDelete;
        //             $dishesCustomisationCategories->categoriesPathId = $get->id;
        //             $dishesCustomisationCategories->categoriesType = $get->type;
        //             $dishesCustomisationCategories->save();
        //         } catch (\Illuminate\Database\QueryException $ex) {
        //                               Log::debug($ex);
        //             $jsonresp = $ex->getMessage();
        //             DB::rollBack();
        //             return false;
        //         }
        //     }
               try{     $dishCustomisationItem = new DishesCustomisation();
                        $dishCustomisationItem->name = $cusdata->name;
                        $dishCustomisationItem->Price = $cusdata->price;
                        $dishCustomisationItem->isVeg = ($cusdata->isVeg == "true") ? '1' : '0';
                        $dishCustomisationItem->selected = $cusdata->selected;
                        $dishCustomisationItem->isDelete = $cusdata->isDelete;
                        $dishCustomisationItem->dishId = $cusdata->dishId;
                        $dishCustomisationItem->customisationCategoryId = ($customisationCategoryId ==null)?$cusdata->categoriesMainId:$customisationCategoryId;
                        $dishCustomisationItem->save();
                    } catch (\Illuminate\Database\QueryException $ex) {
                                      Log::debug($ex);
                        $jsonresp = $ex->getMessage();
                        DB::rollBack();
                        return false;
                    }

                }
    
    

    public function customisationUpdate($cusupdate)
    {
        
        $customisationCategory = DB::table('Customisation_Category')->select("*")->where('id',$cusupdate->customisationCategoryId)->first();


        $categoryupdate = DishesCustomisationCategories::
                         where(['id'=>$cusupdate->categoriesMainId])
                           ->update(['name'=>$customisationCategory->name,'isMandatory'=>0,'categoriesType'=>$customisationCategory->type,'categoriesPathId'=>$customisationCategory->id,  'isDelete' => $cusupdate->customisationCategoryDelete]);




        $isveg = $cusupdate->isVeg ;

        $itemUpdate = DishesCustomisation::where('id',$cusupdate->id)
                                ->update(['name'=>$cusupdate->name,'price'=>$cusupdate->price,'isVeg'=>$isveg,'selected'=>$cusupdate->selected,'isDelete' => $cusupdate->isDelete]);


    }

    public function deleteDishes($dishId, $outletId)
    {

        DB::beginTransaction();

        try {

            $delete = Dishes::where(['id'=>$dishId,'outletId'=>$outletId])->update(['deleted_at'=>NOW()]);

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::Commit();

        return true;



    }

    public function dishSearch($request,$outletId)
    {
        $perPage = Constant::PERPAGE;
        $currencyRepostitory = new CurrencyRepostitory();
        $currency            = $currencyRepostitory->getCurrency();
        $path    = url('/') . '/images/';
        $data    = DB::table('Dishes')
                        ->select(DB::raw("id,name,quantity,isVeg,status,CONCAT('$path',image)as image,CONCAT('$currency',price)as price"))
                        ->where('outletId', $outletId)
                        ->where('name','LIKE','%'.$request->key.'%')
                        ->whereNull('deleted_at')
                        ->paginate($perPage, ['*'], 'page', $request->pageNumber);

        return $data;
    }

   public function editDishes($data, $outletId)
    {
         
         //$image = substr($data->imageUrl, 43);
         $slipt=explode("/",$data->imageUrl);

         $image='/'.$slipt[count($slipt)-2].'/'.$slipt[count($slipt)-1];

        DB::beginTransaction();


        // if ($data->image != "null" ) {
        //     $defaults = new Defaults();
        //     $images = $defaults->imageUpload($data->image, Constant::DISHIMAGE);
        //     $updateImage = Dishes::where(['id'=> $data->dishId])->update(['image'=>$images]);
                
        // }

        try {

            $update = Dishes::where(['id'=> $data->dishId, 'outletId' => $outletId])
                             ->update(['name' => $data->name,'price' => $data->price,
                                     'isVeg'     => $data->isVeg,'image'=> $image]);


        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();    
            DB::rollBack();
            return false;
        }
        DB::Commit();
        return true;

    }


   public function fileUpload($data, $outletId)
    {

        // if ($data->image != "null" ) {
            $defaults = new Defaults();
            $images = $defaults->imageUpload($data->file, Constant::DISHIMAGE);
            // $updateImage = Dishes::where(['id'=> $data->dishId])->update(['image'=>$images]);
            $path    = url('/') . '/images/' . $images;
        return $path;
                
        // }    
    }

}