<?php

namespace App\Http\Service\Admin;
use App\Http\Repository\DeliveryStaffRepostitory;
use App\Http\Repository\OrderManagementRepostitory;
use App\Http\Repository\WalletManageRepository;
use App\Http\Repository\PaymentRepository;
use App\Http\Repository\SettingRepostitory;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Cron\OrdersEvent;
use App\Http\Utility\Common;

Class PaymentManagementService
{

    public function getPayStaff($request)
    {
        $PaymentRepository = new PaymentRepository();
        $wallet_repository = new WalletManageRepository();
        $DeliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $data   = new DataService();
        $wallet = $wallet_repository -> myWallet('provider',$request->id);
        
        if($wallet[0]->balance  <  $request->amount)
        {
            $response['error'] = "true";
            $response['error_message'] = "Insufficent amount";
            return $response;
        }else
        {
            $trans_data['userType']='provider';
            $trans_data['description']='Withdraw Balance Amount';
            $trans_data['userTypeId']=$request->id;
            $trans_data['amount'] =$request->amount;
            $trans_data['type']='debit';
            $trans_data['status']='complete';
            $trans_data['withdrawalId']=$request->transactionId;
            $DeliveryStaffRepostitory->PayOutStaffOrder($request);
            $update_balance=$PaymentRepository->updateDeliverStaffBalance($request);
            $wallet = $wallet_repository->payOutWallet('provider',$request->id,$request->amount);
            $transaction=$PaymentRepository->transactionAdd($trans_data);
            if($update_balance)
            {
                $data->error        = Common::error_true;
                $data->errorMessage = 'error';
            }else
            {
                $data->error        = Common::error_false;
                $data->errorMessage = 'successfull';
            }
           
        }

        return $data;
    }

    public function getTransactionStaff()
    {
        $PaymentRepository = new PaymentRepository();
        
        $data   = new DataService();
       
        $list=$PaymentRepository->transactionProviderList();
        $data->error        = Common::error_false;
        $data->errorMessage = 'error';
        $data->data = $list;
        return $data;
    }


        public function getPayOutlet($requet)
    {
        $PaymentRepository = new PaymentRepository();
        $OrderManagementRepostitory = new OrderManagementRepostitory();
        $check=$PaymentRepository->checkBalanceOutlet($requet);
        $data   = new DataService();
        if(count($check)==0)
        {
            $data->error        = Common::error_true;
            $data->errorMessage = 'insufficient amount';
        }else
        {
            $trans_data['userType']='outlet';
            $trans_data['description']='Withdraw Balance Amount';
            $trans_data['userTypeId']=$requet->id;
            $trans_data['amount'] =$requet->amount;
            $trans_data['type']='debit';
            $trans_data['status']='complete';
            $trans_data['withdrawalId']=$requet->transactionId;
            // $OrderManagementRepostitory->PayOutOutletOrder($requet);
            $update_balance=$PaymentRepository->updateOutletBalance($requet);
            $transaction=$PaymentRepository->transactionAdd($trans_data);
            if($update_balance)
            {
                $data->error        = Common::error_true;
                $data->errorMessage = 'error';
            }else
            {
                $data->error        = Common::error_false;
                $data->errorMessage = 'successfull';
            }
           
        }

        return $data;
    }

    public function getTransactionOutlet()
    {
        $PaymentRepository = new PaymentRepository();
        
        $data   = new DataService();
       
        $list=$PaymentRepository->transactionOutletList();
        $data->error        = Common::error_false;
        $data->errorMessage = 'error';
        $data->data = $list;
        return $data;
    }
}