<?php

namespace App\Http\Repository;

use App\IntegrationSetting;
use App\Setting;
use App\Http\Utility\Constant;
use DB;

Class PaymentRepository
{


    public function listPayMentGateways()
    {
        $path    = url('/').'/images/';
        $data =IntegrationSetting::select(DB::raw("id,name,type,CONCAT('$path',image)as image,status"))
                                  ->where(['type'=>Constant::PAYMENT_GATEWAY,'status'=>'1'])
                                  ->get();
        return $data;
    }

}
