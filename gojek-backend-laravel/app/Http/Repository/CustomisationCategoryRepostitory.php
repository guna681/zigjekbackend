<?php

namespace App\Http\Repository;
use App\CustomisationCategory;
use App\Http\Utility\Constant;
use DB;
Class CustomisationCategoryRepostitory
{

    public function List($pageNumber, $outletId)
    {

        $perPage = Constant::PERPAGE;
        $data    = DB::table('Customisation_Category')
                       ->select(DB::raw("id,name,type,status"))
                       ->where('outletId', $outletId)
                       ->whereNull('deleted_at')
                       ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }


    public function get($id, $outletId)
    {
       $data =DB::table('Customisation_Category')
                  ->select('id','name','type','status')
                  ->where(['id'=>$id,'outletId'=>$outletId])
                  ->whereNull('deleted_at')
                  ->first();
       return $data;
    }

    public function add($data, $outletId)
    {
        DB::beginTransaction();
        try {

            $category               = new CustomisationCategory();
            $category->name         = $data->name;
            $category->type         = $data->type;
            $category->status       = $data->status;
            $category->outletId     = $outletId;
            $category->save();

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }


    public function update($data)
    {
        try{

            $update = CustomisationCategory::where('id',$data->id)
                                        ->update(['name'=>$data->name,'status'=>$data->status,'type'=>$data->type]);

        }catch (\Illuminate\Database\QueryException $ex){
            $jsonresp = $ex->getMessage();
            return false;
        }

        return true;

    }

    public function getList($outletId)
    {
        $data = CustomisationCategory::select('id','name','type')
                                     ->where('outletId',$outletId)
                                     ->whereNull('deleted_at')
                                     ->get();

        return $data;
    }


    public function deleteCustomisationCategory($categoryId, $outletId)
    {

        DB::beginTransaction();

        try {
            $delete = CustomisationCategory::where(['id'=>$categoryId,'outletId'=>$outletId])
                                         ->update(['deleted_at'=>NOW()]);

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;

    }







}