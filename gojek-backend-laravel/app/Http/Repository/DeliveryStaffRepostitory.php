<?php

namespace App\Http\Repository;

use App\DeliveryStaffDetails;
use App\Orders;
use Illuminate\Database\Eloquent;
use App\DeliveryStaff;
use App\DeliveryStaffOtp;
use App\DeliveryStaffFields;
use App\DeliveryStaffFieldsLang;
use App\Http\Service\AppconfigService;
use App\Http\Utility\Constant;
use Carbon\Carbon;
use DB;



Class DeliveryStaffRepostitory
{

    public function getExistMobile($data)
    {

        $query = DeliveryStaff::where('mobileNumber',$data->mobileNumber)->first();
        return $query;
    }

    public function getMobile($data){
        $query = DeliveryStaff::where(['mobileNumber'=>$data->mobileNumber,'countryCode'=>$data->countryCode])->first();

        return $query;
    }

    public function putOtp($data)
    {

        DB::beginTransaction();
        try {
            $results    = DeliveryStaffOtp::Where(['mobileNumber' => $data->mobileNumber])->first();

            if ($results) {
                $update = DeliveryStaffOtp::Where('mobileNUmber', $data->mobileNumber)->update(['otpNumber' => $data->otpNumber]);
            } else {

                $insert = DeliveryStaffOtp::insert(['otpNumber' => $data->otpNumber, 'mobileNumber' => $data->mobileNumber,'created_at' => date('Y-m-d H:i:s'),
                    'updated_at'=> date('Y-m-d H:i:s')]);

            }

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();

        return true;

    }


    // get signup Fields


    public function getFields($page)
    {
        $config= AppconfigService::getConfig();
        $data    = DeliveryStaffFields::select('DeliveryStaff_Fields_Lang.fieldName','DeliveryStaff_Fields.fieldKey','FieldType.fieldType','FieldType.type','FieldType.validationType')
                                    ->join('FieldType','DeliveryStaff_Fields.fieldTypeId','=','FieldType.id')
                                    ->join('DeliveryStaff_Fields_Lang','DeliveryStaff_Fields.id','=','DeliveryStaff_Fields_Lang.staffFieldId')
                                    ->where('DeliveryStaff_Fields_Lang.languageId',$config->languagId)
                                    ->where('DeliveryStaff_Fields.page',$page)
                                    ->get();


        return $data->flatten();

    }



    /** Otp */


    public function verifyOtp($data)
    {
        $data=DeliveryStaffOtp::where(['mobileNumber'=>$data->mobileNumber,'otpNumber'=>$data->otpNumber])->first();
        return $data;

    }

    public function getResendOtp($data)
    {
        $data = DeliveryStaffOtp::where(['mobileNumber' => $data->mobileNumber])->first();
        return $data;
    }


    /**password  */


    public function putPassword($data)
    {
        DB::beginTransaction();
        try{
            $update=DeliveryStaff::where('mobileNumber',$data->mobileNumber)->update(['password'=>bcrypt($data->password)]);
        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;
    }

    public function removeOtp($data)
    {
        $data = DeliveryStaffOtp::where(['mobileNumber' => $data->mobileNumber, 'otpNumber' => $data->otpNumber])->delete();
        return $data;
    }


    public function getProfile($staffId)
    {
        $data=DeliveryStaff::select('id','name','mobileNumber','email','countryCode','tripStatus','fcmtoken as deviceToken','os','status','latitude','longitude', 'totalAmount', 'balanceAmount')
                            ->where('id',$staffId)
                            ->first();

        return $data;
    }


    public function updateLocation($staffId, $data)
    {
        DB::beginTransaction();
        try {
            $update = DeliveryStaff::where('id', $staffId)->update(['latitude' => $data->latitude, 'longitude' => $data->longitude]);
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::Commit();
        return true;
    }

    public function updateTripStatus( $tripStatus,$staffId)
    {
        DB::beginTransaction();
        try {
            $update = DeliveryStaff::where('id', $staffId)->update(['status' => $tripStatus]);
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::Commit();
        return true;
    }

    public function updateDeviceToken($data,$staffId)
    {
        DB::beginTransaction();
        try {
            $update = DeliveryStaff::where('id', $staffId)
                                ->update(['fcmToken' => $data->fcmToken,'os'=>$data->osType]);
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::Commit();
        return true;
    }

    public function addDeliveryStaff($data)
    {
        DB::beginTransaction();
        try{

            $id= DeliveryStaff::insertGetId(['email'=> strtolower($data['email']),
                'mobileNumber'=>$data['mobileNumber'],
                'countryCode'=>$data['countryCode'],
                'password'=>bcrypt($data['password']),
                'name'    =>$data['name'],
                'isApproved'=> 0,
                'staffDetails'=>serialize($data)]);

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }

        try{

            foreach ($data as $key => $value) {

               $insert= DeliveryStaffDetails::create([
                    'deliveryStaffId'=> $id,
                    'key' => $key,
                    'value' => $value,
                ]);

            }

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;

    }


    public function getIncomeDetails($staffId, $date)
    {

        $data = Orders::select(DB::raw("SUM(netAmount) as cost"), DB::raw("COUNT(id) as orders"))
                      ->whereDate('updated_at', '=', $date)
                      ->where('deliveryStaffId',$staffId)
                      ->where('orderStatus',Constant::DELIVERED)
                      ->first();
        return $data;

    }

    public function weekIncomeDetails($staffId)
    {
        $data = DB::table('Orders')->select(DB::raw("SUM(netAmount) as cost"), DB::raw("COUNT(id) as orders"))
                                 ->where('created_at','>',' DATE_SUB(NOW(), INTERVAL 1 WEEK)')
                                 ->where('deliveryStaffId',$staffId)
                                 ->where('orderStatus',Constant::DELIVERED)
                                 ->first();
        return $data;

    }



    //admin module


    public function listStaff($pageNumber)
    {

        $perPage = Constant::PERPAGE;
        $data = DeliveryStaff::select('id','name as staffName','mobileNumber','email','tripStatus','isApproved as status','latitude','longitude')
                             ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }


    public function listStaffDetails()
    {
        $data = DeliveryStaff::select('id','name as staffName','mobileNumber','email','tripStatus','status','latitude','longitude')
                               ->where('status','1')
                               ->get();
        return $data;
    }


    public function getDocumentDetails($staffId)
    {

        $data = DeliveryStaffDetails::select('DeliveryStaff_Fields.fieldName as label','key','value')
                                    ->leftjoin('DeliveryStaff_Fields','DeliveryStaff_Details.key','=','DeliveryStaff_Fields.fieldKey')
                                    ->where('deliveryStaffId',$staffId)
                                    ->get();
        return $data;
    }


    public function listStaffOrders($staffId)
    {

        $data    = Orders::select('Orders.id as orderId','Orders.orderReferenceId','Orders.netAmount','Orders.orderStatus','Orders.deliveryAddress','Orders.updated_at','Outlets.name','Orders.outletId',DB::raw("CONCAT(Outlets.addressLineOne,Outlets.area,Outlets.city)as outletAddress"))
                          ->leftjoin('Outlets','Orders.outletId','=','Outlets.id')
                          ->where('deliveryStaffId',$staffId)
                          ->orderby('Orders.id', 'DESC')
                          ->take(10)
                          ->get();

        return $data;

    }




    public function updateStatus($data)
    {
        DB::beginTransaction();
        try {
            $update = DeliveryStaff::where('id', $data->id)
                                   ->update(['isApproved' => $data->status]);
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::Commit();
        return true;
    }

        public function staffLogout($data){
        DB::beginTransaction();
        try{
            $data=DeliveryStaff::where('id',$data)->update(['fcmtoken'=>'']);

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }

 public function listPayStaffBookDetails($request)
    {
        $data = Orders::select('Booking.id','Booking.ProviderEarning','Booking.deliveryCharge','Booking.OrderReferenceId','Booking.status','Booking.Type','Booking.ProviderEarning','Booking.TotalAmount')
        ->leftjoin('Provider','Provider.id','=','Booking.ProviderId')
                               ->where('Booking.ProviderId','=',$request->deliveryStaffId)
                               ->where('Booking.Status','completed')
                               ->paginate(10);
        return $data;
    }
    
    public function listBookDetails($request)
    {
        $data = Orders::select('Booking.id','Booking.netAmount','Booking.adminServiceCharge','Booking.OrderReferenceId','Booking.TotalAmount','Booking.ProviderEarning')
                               ->leftjoin('Outlets','Outlets.id','=','Booking.outletId')
                               ->where('Booking.Status','completed')
                               ->where('Booking.outletId','=',$request->outletId)
                               ->paginate(10);
        return $data;
    }
    
    // public function listPayStaffDetails($deliveryOpt=null)
    // {

    //     if($deliveryOpt == 1){
    //         $data = DeliveryStaff::select('Provider.id','Provider.Mobile','Provider.Email','Provider.tripStatus','Provider.status','Provider.latitude','Provider.longitude','Provider.totalAmount','Wallet.Balance')
    //                             ->selectRAW('CONCAT(Provider.FirstName,Provider.LastName) as staffName')                       
    //                             ->join('Wallet','Wallet.userTypeId','=','Provider.id')
    //                            ->join('Booking','Booking.ProviderId','=','Provider.id')
    //                           ->where('Booking.Status','completed')
    //                            ->where('Booking.paid_outlet',0)
    //                            ->where('Wallet.userType','provider')
    //                            ->where('Provider.status','verified')
    //                            ->where('Provider.isDeliveryOpt','1')
    //                            ->where('Provider.type','taxi')
    //                            ->groupBy('Provider.id')
    //                         //    ->where('Wallet.balance','>',0.00)
    //                            ->paginate(10);
    //     }else{
    //         $data = DeliveryStaff::select('Provider.id','Provider.Mobile','Provider.Email','Provider.tripStatus','Provider.status','Provider.latitude','Provider.longitude','Provider.totalAmount','Wallet.Balance')
    //                             ->selectRAW('CONCAT(Provider.FirstName,Provider.LastName) as staffName')                       
    //                             ->join('Wallet','Wallet.userTypeId','=','Provider.id')
    //                            ->join('Booking','Booking.ProviderId','=','Provider.id')
    //                           ->where('Booking.Status','completed')
    //                            ->where('Booking.paid_outlet',0)
    //                            ->where('Wallet.userType','provider')
    //                            ->where('Provider.status','verified')
    //                            ->where('Provider.isDeliveryOpt','0')
    //                            ->groupBy('Provider.id')
    //                         //    ->where('Wallet.balance','>',0.00)
    //                            ->paginate(10);
    //     }
        
    //     return $data;
    // }

        public function listPayStaffDetails($deliveryOpt=null)
    {

            $data = DeliveryStaff::select('Provider.id','Provider.Mobile','Provider.Email','Provider.tripStatus','Provider.status','Provider.latitude','Provider.longitude','Provider.totalAmount','Wallet.Balance','Provider.isDeliveryOpt','Provider.type')
                                ->selectRAW('CONCAT(Provider.FirstName,Provider.LastName) as staffName')                       
                                ->join('Wallet','Wallet.userTypeId','=','Provider.id')
                               ->join('Booking','Booking.ProviderId','=','Provider.id')
                              ->where('Booking.Status','completed')
                               ->where('Booking.paid_outlet',0)
                               ->where('Wallet.userType','provider')
                               ->where('Provider.status','verified')
                               // ->where('Provider.isDeliveryOpt','1')
                               // ->where('Provider.type','taxi')
                               ->groupBy('Provider.id')
                            //    ->where('Wallet.balance','>',0.00)
                               ->paginate(10);
        
        
        return $data;
    }

    public function listSearchPayStaffDetails($option)
    {
        switch($option)
        {
            case 1:
                $fromDate = Carbon::now()->startOfMonth();
                $tillDate = Carbon::now()->endOfMonth();
              

            case 2:
                $fromDate = Carbon::now()->startOfWeek();
                $tillDate = Carbon::now()->endOfWeek();
            break;
        }
        $data = DeliveryStaff::select('Provider.id','Provider.Mobile','Provider.Email','Provider.tripStatus','Provider.status','Provider.latitude','Provider.longitude','Provider.totalAmount','Wallet.Balance','Wallet.id as wallet_id')
                                ->selectRAW('CONCAT(Provider.FirstName,Provider.LastName) as staffName')                       
                                ->join('Wallet','Wallet.userTypeId','=','Provider.id')
                               ->join('Booking','Booking.ProviderId','=','Provider.id')
                               ->where('Booking.status','completed')
                               ->where('Booking.paid_provider',0)
                               ->where('Wallet.userType','provider')
                               ->whereBetween('Booking.updated_at',[$fromDate,$tillDate])
                               ->where('Provider.status','verified')
                               ->groupBy('Provider.id','Wallet.id')
                            //    ->where('Wallet.balance','>',0.00)
                               ->paginate(10);
        return $data;
    }

    public function PayOutStaffOrder($data)
    {

        $data = Orders::Where('Orders.deliveryStaffId', $data->id)
                               ->where('Orders.orderStatus','delivered')
                               ->where('Orders.paid_provider',0)
                               ->when($data->option, function ($q) use ($data) {
                                switch($data->option)
                                {
                                    case 1:
                                        $fromDate = Carbon::now()->startOfWeek();
                                        $tillDate = Carbon::now()->endOfWeek();
                                    break;
                        
                                    case 2:
                                        $fromDate = Carbon::now()->startOfMonth();
                                        $tillDate = Carbon::now()->startOfMonth();
                                    break;
                                }
                                  return $q->whereBetween('Orders.updated_at',[$fromDate,$tillDate]);
                                 })
                               ->update(['paid_provider' => 1]);
        return $data;
    }    

}