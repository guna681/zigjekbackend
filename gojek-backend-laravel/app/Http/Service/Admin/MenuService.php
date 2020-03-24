<?php

namespace App\Http\Service\Admin;

use App\Http\Utility\Common;
use App\Http\Utility\Constant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Repository\MenuRepostitory;
use League\Fractal\Resource\Collection;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

Class  MenuService
{

    public function listCuisines($page)
    {
        $menuRepostitory    = new MenuRepostitory();
        $cusinies           = $menuRepostitory->listCuisines($page);
        $data               = new DataService();
        if ($cusinies) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
            $data->cusinies     = $cusinies->flatten();
            $data->totalPage    = $cusinies->lastPage();
        } else {
            $data->error = Common::error_false;
            $data->errorMessage = trans('validation.failure');
            $data->cusinies = $cusinies;

        }
        return $data;
    }

    public function addCuisines($arg)
    {
        $menuRepostitory = new MenuRepostitory();
        $cusinies = $menuRepostitory->addCuisines($arg);
        $data = new DataService();
        if ($cusinies) {
            $data->error = Common::error_false;
            $data->errorMessage = trans('validation.isCuisines');
        } else {
            $data->error = Common::error_false;
            $data->errorMessage = trans('validation.failure');
        }
        return $data;

    }

    public function updateCuisines($arg)
    {
        $menuRepostitory = new MenuRepostitory();
        $cusinies = $menuRepostitory->updateCuisines($arg);
        $data = new DataService();
        if ($cusinies) {
            $data->error = Common::error_false;
            $data->errorMessage = trans('validation.isCuisines');
        } else {
            $data->error = Common::error_false;
            $data->errorMessage = trans('validation.failure');
        }
        return $data;
    }

    public function getCuisine($arg)
    {
        $menuRepostitory = new MenuRepostitory();
        $cuisines = $menuRepostitory->getCuisine($arg);
        $data = new DataService();
        if ($cuisines) {
            $data->error = Common::error_false;
            $data->errorMessage = trans('validation.isCuisines');
            $data->cuisines = $cuisines;
        } else {
            $data->error = Common::error_false;
            $data->errorMessage = trans('validation.failure');
            $data->cuisines = $cuisines;
        }
        return $data;
    }

    public function destroyCuisine($arg)
    {
        $menuRepostitory = new MenuRepostitory();
        $cuisines = $menuRepostitory->deleteCuisine($arg);
        $data = new DataService();
        if ($cuisines) {
            $data->error = Common::error_false;
            $data->errorMessage = trans('validation.isCuisines');
        } else {
            $data->error = Common::error_false;
            $data->errorMessage = trans('validation.failure');
        }
        return $data;
    }


}
    