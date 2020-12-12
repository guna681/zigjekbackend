<?php

namespace App\Http\Repository;

use App\Http\Utility\Constant;
use App\OutletMenuCategories;
use App\OutletsOfferBanners;
use DB;

class CategoryRepostitory
{


    public function listCategory($outletId,$pageNumber)
    {


        $perPage = Constant::PERPAGE;
        $categories =DB::table('Outlet_MenuCategories')
                        ->select('Outlet_MenuCategories.id as categoryId','Outlet_MenuCategories.status','Outlet_MenuCategories.name as categoryName')
                        ->where('outletId',$outletId)
                        ->whereNull('Outlet_MenuCategories.deleted_at')
                        ->paginate($perPage, ['*'], 'page', $pageNumber);
        return $categories;

    }


    public function getMainCategory($outletId)
    {

        $data =DB::table('Outlet_MenuCategories')
                  ->select('id as categoryId','name as categoryName','status as status')
                  ->where(['outletId'=>$outletId,'parentId' => '0'])
                  ->get();

        return $data;
    }


    public function getSubCategory($outletId)
    {
        $data =DB::table('Outlet_MenuCategories')
                 ->select('id as categoryId','name as categoryName')
                 ->where('outletId',$outletId)
                 ->where('parentId','<>', '0')
                 ->get();

        return $data;

    }


    public function addCategory($data,$outletId)
    {

        DB::beginTransaction();

        try {

            $category               = new OutletMenuCategories();
            $category->outletId     = $outletId;
            $category->name         = $data->categoryName;
            $category->status       = $data->status;
            $category->parentId     = isset($data->parentId)?$data->parentId : '0';
            $category->description  = isset($data->description)?$data->description: 'category';
            $category->save();

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            print_r($jsonresp);
            DB::rollBack();
            return false;
        }

        // MySQL Hierarchical Data Closure Table Pattern (tree structure insert the data)
        $level = 0;

        $results = DB::table('MenuCategories_Path')->select('*')
                  ->where('categoryId',$category->parentId)
                  ->get();


        try {

            foreach($results as $result){
                $c1 = DB::table('MenuCategories_Path')
                        ->insert(['categoryId'=> $category->id,'pathId'=>$result->pathId,'level'=>$level,'created_at'=>NOW(),'updated_at'=>NOW()]);

                $level++;
            }

        }catch (\Illuminate\Database\QueryException $ex){
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        try {


                $c2 = DB::table('MenuCategories_Path')
                          ->insert(['categoryId'=> $category->id,'pathId'=>$category->id,'level'=>$level]);



        }catch (\Illuminate\Database\QueryException $ex){
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();

        return true;

    }

    public function getCategory($categoryId)
    {
        $data = OutletMenuCategories::select('id','name as categoryName','status','parentId','description')
                                    ->where('id',$categoryId)
                                    ->first();

        return $data;

    }



    public function editCategory($data)
    {

        DB::beginTransaction();

        try {
            $parentId = isset($data->parentId)? $data->parentId : 0;


            $update   = OutletMenuCategories::where('id',$data->categoryId)
                                            ->update(['name'=>$data->categoryName,'status'=>$data->status,'parentId'=>$parentId ]);

  }catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;


    }


    public function deleteCategory($categoryId,$outletId)
    {
        DB::beginTransaction();
        try {

            $delete  = OutletMenuCategories::where('id',$categoryId)->update(['deleted_at'=>NOW()]);
            $delete1 = DB::table('MenuCategories_Path')->Where('categoryId',$categoryId)->update(['deleted_at'=>NOW()]);
        }catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;
    }



}