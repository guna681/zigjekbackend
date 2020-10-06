<?php

namespace App\Http\Repository;


use App\Wallet;
use App\Transaction;
use Illuminate\Support\Facades\Auth;
use DB;


class WalletManageRepository
{
    public function createTransaction( $userId,$data,$order_id=null){

        try {
          
            $tranc = Transaction::insertGetId(['userType' => $data->user_type,'userTypeId' =>$userId,'amount' =>$data->amount,'type' =>$data->type,'status'=>$data->status,'payment_method'=>$data->payment_method,'description'=>$data->description,'paymentId'=>$data->paymentId,'order_id'=>$order_id]);
            $response = $tranc;
    
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
    
        return $response;
    }


    public function getTransactionList($user_type,$userId){

        try {
            $tranc = Transaction::select('amount','type','description','withdrawalId','createdAt','status')
            ->selectRAW("date_format(createdAt, '%Y-%m-%d') as date")
            ->where(['userType' => $user_type,'userTypeId' =>$userId])
            ->orderBy('Id','desc')
            ->get();
            $response = $tranc;
    
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
    
        return $response;
    }

    public function creditWallet($user_type,$userId,$amount=0){

        try {

            // $userId=Auth::guard('api')->user()->id;
            $tranc = Wallet::updateOrInsert(['userType' => $user_type,'userTypeId' =>$userId],['balance' =>DB::raw('balance +'.$amount)]);
            $response = $tranc;
    
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
    
        return $response;
    }

    public function transferWallet($user_type,$userId,$amount){

        try {
          
            $tranc = Wallet::updateOrInsert(['userType' => $user_type,'userTypeId' =>$userId],['balance' =>DB::raw('balance +'.$amount)]);
            $response = $tranc;
    
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
    
        return $response;
    }
    public function debitWallet($user_type,$userId,$amount){

        try {
            $tranc = Wallet::updateOrInsert(['userType' => $user_type,'userTypeId' =>$userId],['balance' =>DB::raw('balance -'.$amount),'debit_amt' =>DB::raw('debit_amt +'.$amount)]);
            $response = $tranc;
    
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
    
        return $response;
    }

    public function payOutWallet($user_type,$userId,$amount){

        try {
            $tranc = Wallet::updateOrInsert(['userType' => $user_type,'userTypeId' =>$userId],['balance' =>DB::raw('balance -'.$amount),'debit_amt' =>0]);
            $response = $tranc;
    
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
    
        return $response;
    }

    public function myWallet( $user_type,$userId){

        try {
            $tranc = Wallet::updateOrInsert(['userType' => $user_type,'userTypeId' =>$userId],['balance' =>DB::raw('balance')]);
            $tranc = Wallet::select('userType','balance','updateAt')
            ->where(['userType' => $user_type,'userTypeId' =>$userId])->get();
            $response = $tranc;
    
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
    
        return $response;
    }


    public function createWallet($user_type,$userId)
    {
        try {
        $tranc = Wallet::updateOrInsert(['userType' => $user_type,'userTypeId' =>$userId],['balance' =>0]);
        $response = $tranc;
    
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
        
    }
}
