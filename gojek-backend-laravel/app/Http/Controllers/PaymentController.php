<?php

namespace App\Http\Controllers;

use App\Restaurant;
use Illuminate\Http\Request;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Service\PaymentService;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Validator;


Class PaymentController extends Controller
{

    /**
     * Get the avialable payment methods
     * @param
     * @return json
     * */

    public function listPaymentMethod(request $request)
    {
        $paymentService     = new PaymentService();
        $response           = $paymentService->listPaymentMethod();
        $responsedata       = Defaults::encode($response);
        return $responsedata;

    }
}