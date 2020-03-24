<?php

namespace App\Http\Service\RestaurantAdmin;

use Auth;
use App\Http\Repository\CategoryRepostitory;
use App\Http\Service\DataService;
use App\Http\Utility\Common;
use Symfony\Component\VarDumper\Cloner\Data;

Class CategoryService
{

    public function listCategory($page)
    {
        $outletId            = Auth::guard('restaurant')->user()->id;
        $data                = new DataService();
        $categoryRepostitory = new CategoryRepostitory();
        $category            = $categoryRepostitory->listCategory($outletId,$page);
        if ($category) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->category     = $category->flatten();
            $data->totalPage    = $category->lastPage();
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;

    }

    /* show the one by one in category list */
    public function getListCategory()
    {
        $outletId            = Auth::guard('restaurant')->user()->id;
        $data                = new DataService();
        $categoryRepostitory = new CategoryRepostitory();
        $category            = $categoryRepostitory->getMainCategory($outletId);
        if ($category) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->category     = $category;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;

    }


    public function addCategory($arg)
    {
        $outletId            = Auth::guard('restaurant')->user()->id;
        $categoryRepostitory = new CategoryRepostitory();
        $category            = $categoryRepostitory->addCategory($arg,$outletId);
        $data                = new DataService();

        if ($category) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }


    public function getCategory($categoryId)
    {

        $categoryRepostitory  = new CategoryRepostitory();
        $category             = $categoryRepostitory->getCategory($categoryId);
        $data                 = new DataService();
        if($category){
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->category     = $category;
        }else{
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }

        return $data;
    }

    public function editCategory($arg)
    {

        $categoryRepostitory  = new CategoryRepostitory();
        $category             = $categoryRepostitory->editCategory($arg);
        $data                 = new DataService();
        if ($category) {
            $data->error       = Common::error_false;
            $data->errorMessage= __('validation.sucess');
        } else {
            $data->error     = Common::error_true;
            $data->errorMessage =__('validation.failure');
        }

        return $data;


    }


    public function getSubCategory()
    {

        $outletId            = Auth::guard('restaurant')->user()->id;
        $data                = new DataService();
        $categoryRepostitory = new CategoryRepostitory();
        $category            = $categoryRepostitory->getSubCategory($outletId);
        if ($category) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->category     = $category;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;
    }


    public function deleteCategory($categoryId)
    {

        $ouletId    = Auth::guard('restaurant')->user()->id;
        $data       = new DataService();
        $categoryRepostitory = new CategoryRepostitory();
        $category   = $categoryRepostitory->deleteCategory($categoryId, $ouletId);
        if ($category) {

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }

}
