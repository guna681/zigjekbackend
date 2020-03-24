<?php

namespace App\Http\Controllers\DeliveryBoy;

use App\Http\Controllers\Controller;
use App\Http\Utility\Defaults;
use Validator;
use Illuminate\Http\Request;
use App\Http\Utility\Common;
use App\Http\Service\DeliveryBoy\ImageuploadService;

Class ImageuploadController extends Controller
{

    public function imageUpload(request $request)
    {
        $response   = new \stdClass();
        $rules      = [
                        "file" => "required|mimes:pdf,jpeg,png,jpg,bmp,gif,svg|max:10000"
                      ];

        $validator  = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        } else {

            $imageuploadService     = new ImageuploadService();
            $response               = $imageuploadService->imageUpload($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


}
