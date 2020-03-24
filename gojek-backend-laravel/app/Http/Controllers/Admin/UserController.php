<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\RequestData;
use App\Http\Service\Admin\LoginService;
use App\Http\Service\Admin\UserService;
use App\Http\Repository\UserRepository;
use Illuminate\Support\Facades\Response;
use Validator;

class UserController extends Controller
{
    public function getUsers(request $request)
    {

        $page = $request->page;
        $userRepository = new UserRepository;
        $users = $userRepository->getUsers($page);
        $numOfPages = $userRepository->getPages();
        $response = new Response();
        if ($users) {
            $response->error = Common::error_true;
            $response->errorMessage = 'Success';
            $response->pages = $numOfPages;
            $response->users = $users;
        } else {
            $response->error = Common::error_false;
            $response->errorMessage = 'No-Data';
        }

        return Defaults::encode($response);
    }

    public function destroyUser(request $request)
    {
        $userService = new UserService;
        $response = $userService->destroyUser($request->userId);
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * Get the all User Details,address,orderDetails
     * @param  integer userId
     * @return json
     * */

    public function getUser(request $request)
    {

        $response       = new Response();
        $rules          = ['id' => 'required|exists:Users,id'];
        $validator      = Validator::make(['id' => $request->userId], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->getUser($request->userId);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }

    public function getUserOrder(request $request){


        $response       = new Response();
        $rules          = ['userId' => 'required|exists:Users,id','page'=>'required'];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->getUserOrder($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }


}
