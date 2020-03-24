<?php

namespace App\Http\Service\RestaurantAdmin;

use App\CustomisationCategory;
use App\Http\Repository\CustomisationCategoryRepostitory;
use App\Http\Service\DataService;
use App\Http\Utility\Common;
use Auth;

Class CustomisationCategoryService
{

    public function ListCustomisationCategory($pageNumber)
    {
        $outletId  = Auth::guard('restaurant')->user()->id;
        $customisationCategoryRepostitory = new CustomisationCategoryRepostitory();
        $list      = $customisationCategoryRepostitory->list($pageNumber,$outletId);
        $data      = new DataService();
        if ($list) {

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->list         = $list->flatten();
            $data->totalPage    = $list->lastPage();

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }

        return $data;
    }


    public function getCustomisationCategory($id){
        $outletId  = Auth::guard('restaurant')->user()->id;
        $customisationCategoryRepostitory = new CustomisationCategoryRepostitory();
        $get       = $customisationCategoryRepostitory->get($id,$outletId);
        $data      = new DataService();
        if($get){
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->get          = $get;
        }else{
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;
    }


    public function addCustomisationCategory($arg)
    {

        $outletId = Auth::guard('restaurant')->user()->id;
        $customisationCategoryRepostitory = new CustomisationCategoryRepostitory();
        $add = $customisationCategoryRepostitory->add($arg, $outletId);
        $data = new DataService();
        if ($add) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }


    public function updateCustomisationCategory($arg)
    {
        $customisationCategoryRepostitory = new CustomisationCategoryRepostitory();
        $update    = $customisationCategoryRepostitory->update($arg);
        $data      = new DataService();
        if ($update) {

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;
    }


    public function getListCustomisationCategory()
    {
        $outletId  = Auth::guard('restaurant')->user()->id;
        $customisationCategoryRepostitory = new CustomisationCategoryRepostitory();
        $getlist      = $customisationCategoryRepostitory->getList($outletId);
        $data      = new DataService();
        if ($getlist->isNotEmpty()) {

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->getList      = $getlist;


        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }

        return $data;
    }


    public function deleteCustomisationCategory($categoryId)
    {
        $outletId   = Auth::guard('restaurant')->user()->id;
        $customisationCategoryRepostitory = new CustomisationCategoryRepostitory();
        $delete     = $customisationCategoryRepostitory->deleteCustomisationCategory($categoryId, $outletId);
        $data       = new DataService();
        if ($delete) {

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');

        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;

    }



}