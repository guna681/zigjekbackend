<?php

namespace  App\Http\Cron;

use DB;
use App\BlockOrderList;
use App\DeliveryStaff;
use App\Http\Utility\Constant;
use App\Http\Cron\S2ServiceProvider;
use App\Http\Libraries\ServiceProviders\FCMPushNotificationServiceProvider;
use Illuminate\Support\Facades\Log;
Class OrdersEvent
{

    public function getUnassignedOrders()
    {
        $orderList=DB::table('Orders')->where('orderStatus',Constant::UNASSIGNED)
                                      ->orderBy('id', 'asc')
                                      ->get();

        return json_encode($orderList);
    }


    public function getAssignedOrders()
    {
        $unassigned =DB::table('orders')->where('orderStatus',Constant::ASSIGNED)
                                        ->get();

    }


    /**
     * Order AssignEvent function
     * function excute for cron every15 minutes.
     * get the pending Orders and check the avilable deliveryboy
     * assign the orders
     *
     *
     * **/


    /**
     * cronjob  aws server setup
     * step 1:  open  terminal   connect the server
     * step 2:  crontab -e (enter the command)
     * step 3:  * 5 * * * *  /usr/bin/php  /var/www/html/foodapp/app/http/Cron/assignEvent.php"
     * step 4:  save the above line ctrl+X
     * step 5:  save option  yes  press the Y
     * step 6:  press the enterkey
     * step 7:  crontab -l (list cronjob)
     * step 8:  check  cronjob  command  => php/var/www/html/laravefloder/fileName.php
     *
     * */

    //*/5 * * * *  /usr/bin/php  /var/www/html/foodapp/app/http/Cron/assignEvent.php


// order assigning one provider only
    public function orderAssignEvents() {

        $orders = DB::table('Orders')->select('outletId','deliveryAddressId','userId','id as orderId', 'providerEarnings')
            ->where(['orderStatus'=>Constant::UNASSIGNED])
            ->orwhere('orderStatus',Constant::ASSIGNED)
            ->whereNull('acceptedTime')
            ->get();



        Log::info('Showing user profile for user: '.$orders);

          



        foreach ($orders as $order) {



            $deliveryStaff = DB::table('DeliveryStaff')->select('id','name','latitude as lat','longitude as lng','s2Key','s2CellId as s2Id','fcmtoken as deviceToken','os', 'totalAmount', 'balanceAmount', 'tripStatus')
                                                               ->where('tripStatus',0)
                                                               ->where('status',1)
                                                               ->where('id',6)
                                                               ->first();   
        //     if (!empty($deliveryStaff)) {
        //     $totalAmount = $deliveryStaff->totalAmount + $order->providerEarnings;
        //     $balanceAmount = $deliveryStaff->balanceAmount + $order->providerEarnings;   
        // }


        //     $staffEarningsupdate = DB::table('DeliveryStaff')->where('id',$date(format)                                                                                                                  eliveryStaff->id)
        //                                  ->update(['totalAmount'=> $totalAmount,'balanceAmount'=> $balanceAmount]);

        if (!empty($deliveryStaff)) {

          // print_r($deliveryStaff);


            // if ($deliveryStaff->tripStatus === 1) {
                $update = DB::table('Orders')->where('id',$order->orderId)
                                             ->update(['deliveryStaffId'=>$deliveryStaff->id,'orderStatus'=>Constant::ASSIGNED,'assignedTime'=>NOW()]);
            
             
             
             
                        $title              =__('validation.assignOrder');
                        $notificationData   = array();
                        $notificationData['message']     = $deliveryStaff->name .__('validation.assignOrder');
                        $notificationData['os']          = $deliveryStaff->os;
                        // $notificationData['body']        =  [
                        //     'image'      => "NULL",
                        //     'title'      => $title,
                        //     'notification_type'=>'assign',
                        //     'extraKey'   => 'orderId',
                        //     'extraValue' =>'Null',
                        // ];
                        $notificationData['body']        = 'assign';            
                        $notificationData['deviceToken'] =$deliveryStaff->deviceToken;
            
                        $pushNotification = new FCMPushNotificationServiceProvider();
                        $pushNotification->setTitle($title);
 file_put_contents('/var/www/html/foodapp/app/Http/Utility/assignevent.log', $deliveryStaff->deviceToken,FILE_APPEND);
            
                            $status =$pushNotification->sendPushNotification($notificationData);

                            $staffEarningsupdate = DB::table('DeliveryStaff')->where('id',$deliveryStaff->id)
                    ->update(['tripStatus'=> 1 ]);

                    file_put_contents('/var/www/html/foodapp/app/Http/Utility/assignevent.log',$status,FILE_APPEND);

                    // }
            
         }
        
            // $update = DB::table('Orders')->where('id',$order->orderId)
            //                              ->update(['deliveryStaffId'=>$deliveryStaff->id,'orderStatus'=>Constant::ASSIGNED,'assignedTime'=>NOW()]);

            // $staffEarningsupdate = DB::table('DeliveryStaff')->where('id',$deliveryStaff->id)
            //                              ->update(['tripStatus'=> 1 ]);








 


    // print_r($deliveryStaff);
            
        }

    }






    public function orderAssignEvent()
    {

        

        $orders = DB::table('Orders')->select('outletId','deliveryAddressId','userId','id as orderId')
                                     ->where(['orderStatus'=>Constant::UNASSIGNED])
                                     ->orwhere('orderStatus',Constant::ASSIGNED)
                                     ->whereNull('acceptedTime')
                                     ->get();

          // print_r($orders); 
       $s2ServiceProvider = new S2ServiceProvider();

        foreach ($orders as $order) {

            $userLatLong =DB::table('Address')->select('latitude','longitude')
                                              ->where(['id'=>$order->deliveryAddressId,'userId'=>$order->userId])
                                              ->first();

            $restaurantLatLong = DB::table('Outlets')->select('latitude as lat','longitude as lng','s2CellId as s2Id','s2Key','name as restaurantName')
                                                     ->where('id',$order->outletId)
                                                     ->first();


            $ongoingOrdersDeliveryboy =DB::table('DeliveryStaff')->select('DeliveryStaff.id as staffId')
                                           ->join('Orders', function ($join) {
                                              $join->on('DeliveryStaff.id', '=', 'Orders.deliveryStaffId')
                                              ->where('Orders.orderStatus','<>',Constant::DELIVERED)
                                              ->whereNotNull('Orders.acceptedTime');
                                          })->get()->toArray();

            $staffIds=array_pluck($ongoingOrdersDeliveryboy,'staffId');

            $blockStaffList = DB::table('blockOrderList')->select('staffId')->where('orderId',$order->orderId)->get();
            $s2Cell =$s2ServiceProvider->reAssign($blockStaffList);
            
            //reassign order

            $reAssignPush = $this->reAssignPush($blockStaffList);
             
            $staffList = array_pluck($blockStaffList,'staffId');

            //update reassign push send status in BlockOrderList Table
             $updatepush = BlockOrderList::whereIn('staffId',$staffList)
                            ->update(['isPushSend' => 1]);

             $deliverystaff = DeliveryStaff::whereIn('id',$staffList)
                            ->update(['isReleased' => 0,'tripStatus' => 0 ]);

            $list = array_merge($staffIds,$staffList);

            $nearbyDeliveryboyList = DB::table('DeliveryStaff')->select('id','name','latitude as lat','longitude as lng','s2Key','s2CellId as s2Id','fcmtoken as deviceToken','os')
                                                            ->where('s2CellId',$restaurantLatLong->s2Id)
                                                            ->whereNotIn('id',$list)
                                                            ->where('tripStatus',0)
                                                            ->where('status',1)
                                                            ->get();

               // print_r($nearbyDeliveryboyList);
               // print_r($restaurantLatLong);





            $result = array();
            foreach($nearbyDeliveryboyList as $deliveryboy){

                $respose = $this->distanceCalculation($deliveryboy,$restaurantLatLong);

                //weight calculation api

                $drivers =new \stdClass();
                $drivers->id =$deliveryboy->id;
                $drivers->name = $deliveryboy->name;
                $drivers->lat =$deliveryboy->lat;
                $drivers->lng = $deliveryboy->lng;
                $drivers->s2Key = $deliveryboy->s2Key;
                $drivers->s2Id  = $deliveryboy->s2Id;
                $drivers->time=$respose['minutes'];
                $drivers->distance =$respose['distance'];
                $drivers->os =$deliveryboy->os;
                $drivers->deviceToken = $deliveryboy->deviceToken;

                array_push($result , $drivers);

            }

            $nearbyProvider =json_encode($result);



            $weight = $this->getWieght();
            //weight calculation service

            $response =$s2ServiceProvider->wightCalculation($nearbyProvider,json_encode($weight));
            //order assign
            if(!empty($response)){

                // print_r($response);

                $getDeliveryboyId = $response[0]->id;

                $update = DB::table('Orders')->where('id',$order->orderId)
                                             ->update(['deliveryStaffId'=>$response[0]->id,'orderStatus'=>Constant::ASSIGNED,'assignedTime'=>NOW()]);

                $updateReleasedStatus = DB::table('DeliveryStaff')->where('id',$response[0]->id)
                                                    ->update(['isReleased'=>1]);                             
              $blockOrderList= new BlockOrderList;
              $blockOrderList->orderId          = $order->orderId;
              $blockOrderList->staffId          = $response[0]->id;
              $blockOrderList->created_at          = NOW();
              $blockOrderList->updated_at          = NOW();
              $blockOrderList->save();


                $title              =__('validation.assignOrder');
                $notificationData   = array();
                // $notificationData['message']     = $response[0]->name. ' ' .__('validation.assignOrder');
                $notificationData['message']     = __('validation.assignMessage'). ' '. $restaurantLatLong->restaurantName;
                $notificationData['os']          = $response[0]->os;
                $notificationData['body']        = 'assign';            
                $notificationData['orderId']     = $order->orderId;
                // $notificationData['body']        =   [
                //                                         'image'      => "NULL",
                //                                         'title'      => $title,
                //                                         'notification_type'=>'assign',
                //                                         'extraKey'   => 'orderId',
                //                                         'extraValue' =>'Null',
                //                                     ];
                $notificationData['deviceToken'] = $response[0]->deviceToken;
                $pushNotification = new FCMPushNotificationServiceProvider();
                $pushNotification->setTitle($title);
                $status = $pushNotification->sendPushNotification($notificationData);

                $staffEarningsupdate = DB::table('DeliveryStaff')->where('id',$getDeliveryboyId)
                ->update(['tripStatus'=> 1 ]);

                file_put_contents('/var/www/html/foodapp/app/Http/Utility/assignevent.log',$response[0]->os,FILE_APPEND);
                file_put_contents('/var/www/html/foodapp/app/Http/Utility/assignevent.log',$notificationData['deviceToken'],FILE_APPEND);
                file_put_contents('/var/www/html/foodapp/app/Http/Utility/assignevent.log',$status,FILE_APPEND);


            }else{

               $status = "failure";

            }

            echo $status;


        }


    }


    public function ordersDeliveryBoyAssigned() 
    {
        $orders = DB::table('Orders')->select('deliveryStaffId','orderStatus','userId','id as orderId')
        ->where(['orderStatus'=>Constant::ASSIGNED])
        ->whereNull('acceptedTime')
        ->limit(1)
        ->get();
        die();

        if (count($orders) > 0) {
            $deliveryBoyId = $orders[0]->deliveryStaffId;
            $staffStatusupdate = DB::table('DeliveryStaff')->where(['id','=',$deliveryBoyId], ['status','=',1])
            ->update(['tripStatus'=> 0 ]);           
        }

    }


    public function getWieght()
    {

        $wight= DB::table('WeightMatches')->select('key','value')->get();

        return $wight;
    }





    public function distanceCalculation($deliveryBoy, $restaurant)
    {

        $theta =$deliveryBoy->lng - $restaurant->lng;
        $dist = sin(deg2rad($deliveryBoy->lat)) * sin(deg2rad($restaurant->lat)) +  cos(deg2rad($deliveryBoy->lat)) * cos(deg2rad($restaurant->lat)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
      //  $miles = $dist * 60 * 1.1515;
        $distance = $dist * 111.13384; // 1 degree = 111.13384 km, based on the average diameter of the Earth (12,735 km)

        $rate = 4.5; //15 kilometer perHour
        $time =$distance/$rate;
        $minutes=round(abs($time) *60);
        $data =['distance'=>$distance ,'minutes'=>$minutes];
        return $data;
    }


public function reAssignPush ($blockStaffList) {
  echo $blockStaffList, '**';
  foreach($blockStaffList as $blockStaffId){

  $staffData = DB::table('DeliveryStaff')->select('*')
                                   ->join('blockOrderList', 'DeliveryStaff.id', '=', 'blockOrderList.staffId')
                                   ->where('blockOrderList.isPushSend','0')
                                   ->where('DeliveryStaff.id',$blockStaffId->staffId)
                                   ->first();
                                 
      if (!empty($staffData)) {
        $title              = 'empty';
        $notificationData   = array();
        $notificationData['message']     = 'reAssign';
        $notificationData['os']          = $staffData->os;
        $notificationData['body']        = 'assign';            
        $notificationData['orderId']     = '0';
        // $notificationData['body']        =   [
        //                                         'image'      => "NULL",
        //                                         'title'      => $title,
        //                                         'notification_type'=>'assign',
        //                                         'extraKey'   => 'orderId',
        //                                         'extraValue' =>'Null',
        //                                     ];
        $notificationData['deviceToken'] = $staffData->fcmtoken;
        $pushNotification = new FCMPushNotificationServiceProvider();
        $pushNotification->setTitle($title);
        $status = $pushNotification->sendPushNotification($notificationData);
        echo $status,'*&*&*&*&*&*&';
      }  else {

      }                          

  }
}








}



