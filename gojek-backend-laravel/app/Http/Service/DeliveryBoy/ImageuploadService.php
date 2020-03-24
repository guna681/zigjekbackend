<?php

namespace App\Http\Service\DeliveryBoy;
use App\Http\Service\DataService;
use App\Http\Utility\Common;
use App\Http\Utility\Constant;
use App\Http\Utility\Defaults;

Class ImageuploadService
{

    public function imageUpload($arg)
    {
        $image          = $arg->file;
        $fileExtension  = $image->getClientOriginalExtension();
        //check condition for pdf and imageupload

        $path = ($fileExtension == "pdf") ? Constant::DELIVERYBOYDOCUMNET : Constant::DELIVERYBOYIMAGE;
        $defaults   = new Defaults();
        $images     = $defaults->imageUpload($image, $path);
        $data       = new DataService();
        if ($images) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->imageUrl     = url('/') . '/images/' . $images;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;
    }

}