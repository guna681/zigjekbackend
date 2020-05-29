<?php
namespace App\Http\Service\RestaurantAdmin;

use App\Http\Repository\RestaurantRepostitory;
use App\Http\Service\DataService;
use App\Http\Utility\Common;
use App\Restaurant;
use Illuminate\Support\Facades\Hash;
use App\Http\Libraries\ServiceProviders\GuzzleServiceProvider;
use App\Http\Repository\OutletsRepostitory;
use App\Outlets;
use Auth;

Class  RestaurantAdminService{


    public function loginRestaurantAdmin($arg){

        $outletsRepostitory = new OutletsRepostitory();
        $restaurants           = $outletsRepostitory->existLogin($arg->email);
        $data                  = new DataService();

		if (Hash::check($arg->password, $restaurants->password)) {
        if($restaurants->existLogin == 0){
            $accessToken          = $restaurants->createToken('Token Name')->accessToken;
            if($accessToken){
                $updateToken           = $outletsRepostitory->updateDevicesToken($arg,$restaurants);
                $data->error        = Common::error_false;
                $data->errorMessage = __('validation.sucess');
                $data->newPassword  = 0;
                $data->accessToken  = $accessToken;
                $data->adminDetails = $restaurants;
            } else {
                $data->error        = Common::error_true;
                $data->errorMessage = __('validation.login');
            }
        } else {
            $accessToken        = $restaurants->createToken('Token Name')->accessToken;
            $data->error        = Common::error_false;
            $data->newPassword  = 1;
            $data->errorMessage = __('validation.changePassword');
            $data->accessToken  = $accessToken;
        }
		}   else {
			$data->error        = Common::error_true;
			$data->errorMessage = __('validation.invalidpass');
		}     


        return $data;
    }

    public function updateDeviceToken($request)
    {
        $outletId = Auth::guard('restaurant')->user()->id;
        $outletsRepostitory = new OutletsRepostitory();
        $results            = $outletsRepostitory->updateDeviceToken($request,$outletId);
        $data               = new DataService();
        if ($results) {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }
    
    public function changePassword($arg){
        $outletsRepostitory    = new OutletsRepostitory();
        $data                  = new DataService();        
        $restaurantsdata           = $outletsRepostitory->existLogin($arg->email);
			if(Hash::check($arg->oldpassword, $restaurantsdata->password)) {
		        $restaurants           = $outletsRepostitory->putPassword($arg);			
		        if($restaurants){
		            $data->error        = Common::error_false;
		            $data->errorMessage = __('validation.sucess');
		        }else{
		            $data->error        = Common::error_true;
		            $data->errorMessage = __('validation.failure');
		        }
			} else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.curpass');
			}        
        return $data;
    }


    public function getOutletProfile()
    {

        $outletId = Auth::guard('restaurant')->user()->id;
        $outletsRepostitory = new OutletsRepostitory();
        $results            = $outletsRepostitory->getOutlet($outletId);
        $data               = new DataService();
        if ($results) {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.sucess');
            $data->outlets          = $this->outletTransformers($results);
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }




    public function outletTransformers($results){
        $outlets                    = new Outlets();
        $outlets->outletId          = $results->id;
        $outlets->outletName        = $results->name;
        $outlets->image             = url('/').'/images/'.$results->image;
        $outlets->restaurantId      = $results->restaurantId;
        $outlets->email             = $results->email;
        $outlets->isPureVeg         = $results->isPureVeg;
        $outlets->costForTwo        = $results->costForTwo;
        $outlets->addressLineOne    = $results->addressLineOne;
        $outlets->addressLineTwo    = $results->addressLineTwo;
        $outlets->street            = $results->street;
        $outlets->area              = $results->area;
        $outlets->city              = $results->city;
        $outlets->state             = $results->state;
        $outlets->country           = $results->country;
        $outlets->zipcode           = $results->zipcode;
        $outlets->latitude          = $results->latitude;
        $outlets->longitude         = $results->longitude;
        $outlets->contactNumber     = $results->contactNumber;
        $outlets->status            = $results->status;
        $outlets->preparationTime   = $results->preparationTime;

        return $outlets;
    }

    public function editProfile($arg)
    {

        $outletId = Auth::guard('restaurant')->user()->id;
        $outletsRepostitory = new OutletsRepostitory();
        $results            = $outletsRepostitory->editProfile($arg,$outletId);
        $data               = new DataService();
        if ($results) {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.sucess');
            // $data->outlets          = $this->outletTransformers($results);
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }

    public function logout($arg)
    {

        $outletId = Auth::guard('restaurant')->user()->id;
        $outletsRepostitory = new OutletsRepostitory();
        $results            = $outletsRepostitory->logout($outletId);
        $data               = new DataService();
        if ($results) {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.sucess');
            // $data->outlets          = $this->outletTransformers($results);
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }
}