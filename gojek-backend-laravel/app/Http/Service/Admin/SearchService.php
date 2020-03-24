<?php


namespace App\Http\Service\Admin;

use App\Http\Utility\Common;
use App\Http\Repository\SearchRepostitory;
use App\Http\Service\MailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Class SearchService
{

    public function UserSearch($request)
    {
        $searchRepostitory       = new SearchRepostitory();
        $searchUserData          = $searchRepostitory->searchUser($request);
        $searchUserPage          = $searchRepostitory->searchUserPage($request);
        //  print_r($searchUserPage);
        // die;
        $data                    = new DataService();
        if ($searchUserData) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $data->pages         = $searchUserPage;
            $data->users       = $searchUserData;
        } else {
            $data->error         = Common::error_true;
            $data->errorMessage  = __('validation.failure');
            $data->users         = $searchUserData;
        }

        return $data;
    }

        public function DeliveryBoySearch($request)
    {
        $searchRepostitory       = new SearchRepostitory();
        $searchstaffData          = $searchRepostitory->searchDeliveryBoys($request);
        $data                    = new DataService();
        if ($searchstaffData) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $data->totalPage    = $searchstaffData->lastPage();
            $data->listStaff         = $searchstaffData->flatten();
        } else {
            $data->error         = Common::error_true;
            $data->errorMessage  = __('validation.failure');
            $data->users         = $searchstaffData;
        }

        return $data;
    }

            public function restaurantsSearch($request)
    {
        $searchRepostitory       = new SearchRepostitory();
        $searchRestaurantsData          = $searchRepostitory->searchRestaurants($request);
        $data                    = new DataService();
        if ($searchRestaurantsData) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $data->totalPage    = $searchRestaurantsData->lastPage();
            $data->listStaff         = $searchRestaurantsData->flatten();
        } else {
            $data->error         = Common::error_true;
            $data->errorMessage  = __('validation.failure');
            $data->users         = $searchRestaurantsData;
        }

        return $data;
    }


 public function orderSearch($request)
    {
        $searchRepostitory       = new SearchRepostitory();
        $searchOrderData          = $searchRepostitory->searchOrder($request);
        $data                    = new DataService();
        if ($searchOrderData) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $data->totalPage    = $searchOrderData->lastPage();
            $data->listStaff         = $searchOrderData->flatten();
        } else {
            $data->error         = Common::error_true;
            $data->errorMessage  = __('validation.failure');
            $data->users         = $searchOrderData;
        }

        return $data;
    }
}