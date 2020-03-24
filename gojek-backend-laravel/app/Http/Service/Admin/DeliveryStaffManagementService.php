<?php

namespace App\Http\Service\Admin;
use App\Http\Repository\DeliveryStaffRepostitory;
use App\Http\Repository\SettingRepostitory;
use App\Http\Repository\CurrencyRepostitory;

use App\Http\Utility\Common;

Class DeliveryStaffManagementService
{

    public function listDeliveryStaff($pageNumber)
    {
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $staff  = $deliveryStaffRepostitory->listStaff($pageNumber);
        $data   = new DataService();
        if (!empty($staff)) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->listStaff    = $staff->flatten();
            $data->totalPage    = $staff->lastPage();
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }


    public function listStaffDetails()
    {
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $staff  = $deliveryStaffRepostitory->listStaffDetails();
        $data   = new DataService();
        if($staff){
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.sucess');
            $data->listStaffDetails = $staff;
        }else{
            $data->error            = Common::error_true;
            $data->errorMessage     = __('validation.failure');
        }

        return $data;

    }


    public function staffApproval($arg)
    {
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $staff  = $deliveryStaffRepostitory->updateStatus($arg);
        $data   = new DataService();
        if ($staff) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;
    }


    public function getStaffDetail($staffId)
    {
        $currency         = new CurrencyRepostitory();
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $staff  = $deliveryStaffRepostitory->getProfile($staffId);
        $data   = new DataService();
        if($staff) {
            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->currency   = $currency->getCurrency();

            $documentDetails = $deliveryStaffRepostitory->getDocumentDetails($staffId);

            $documentDetails[1]->value = substr_replace($documentDetails[1]->value,"*****",4);
            $documentDetails[3]->value = substr_replace($documentDetails[3]->value,"*****",0);

            $email = $documentDetails[0]->value;
            $emailstarred = $this->emailHide($email);


            $documentDetails[0]->value = strtolower($emailstarred);

            $orderDetails = $deliveryStaffRepostitory->listStaffOrders($staffId);

            $staff->mobileNumber = substr_replace($staff->mobileNumber, "*****", 4);
            $starred = $this->emailHide($staff->email);

            $staff->email = $starred;


            $data->staffDetails = $staff;
            $data->documentDetails = $documentDetails;
            $data->orderDetails = $orderDetails;
        }else{
            $data->error =Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }


 public function emailHide($email)
    {
            $fill=4;
            $user=strstr($email,'@',true);
            $len=strlen($user);
            if($len>$fill+2){$fill=$len-2;}
            $starred=substr($user,0,1).str_repeat("*",$fill).substr($user,-1).strstr($email,'@');
            return $starred;
    }


    public function getLables()
    {

        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $settingRepostitory       = new SettingRepostitory();
        $page = 3;
        for ($i=1; $i <= $page ; $i++) {
            $results    = new \stdClass();
            $get        = $deliveryStaffRepostitory->getFields($i);
            $fields[]           =  $get->flatten();
        }
        $data  = new DataService();
        if ($fields) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->signupFields =array_flatten($fields);
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
            $data->signupFields = [];

        }
        return $data;
    }




}