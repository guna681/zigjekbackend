<?php

use Illuminate\Database\Seeder;
use App\IntegrationSetting;

class IntegrationsettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        IntegrationSetting::insert([

                [
                    'key' => 'androidmapKey',
                    'name' => 'AndroidGoogleMapkey',
                    'type' => 'googleMapKey',
                    'value' => 'AIzaSyB6XpezvzSPSSR5-A3GFayqfdLU-kSicXw',
                    'image' => '',
                    'status'=>0,
                    'created_at'=>NOW(),
                    'updated_at'=> NOW()
                ],
                [

                    'key' => 'iosMapKey',
                    'name' => 'IosGoogleMapkey',
                    'type' => 'googleMapKey',
                    'value' => 'AIzaSyDvj4IR9p7qY_fSYo1v9iGZzcT_KPnd6EM',
                    'image' => '',
                    'status'=>0,
                    'created_at'=>NOW(),
                    'updated_at'=> NOW()
                ],
                [

                    'key' => 'otpLogin',
                    'name' => 'otpLogin',
                    'type' => 'LoginType',
                    'value' => '1',
                    'image' => '',
                    'status'=>0,
                    'created_at'=>NOW(),
                    'updated_at'=> NOW()
                ],
                [

                    'key' => 'passwordLogin',
                    'name' => 'passwordLogin',
                    'type' => 'LoginType',
                    'value' => '1',
                    'image'=>'',
                    'status'=>1,
                    'created_at'=>NOW(),
                    'updated_at'=> NOW()
                ],
                [
                    'key' => 'FireBasekey',
                    'name' => 'fireBase',
                    'type' => 'PushNotification',
                    'value' => 'AAAAF9hnlEI:APA91bGKUFXaDJB-sDQb6k6oZ-lK-c5FmOWVJWqSMaUGYpYCRETmBK3Jx1uuIr4SDMvMIVFzvP5SdFifOUMfYazJL3Qun1JhLa63p5tvGHedGMVSJ2h_kitFrwLX6ztcRH9G4JmTJSMkv9x8NU9Wenl1hNCiyrhs2g',
                    'image' => '',
                    'status'=>1,
                    'created_at'=>NOW(),
                    'updated_at'=> NOW()
                ],
                [

                    'key' => 'BrowserKey',
                    'name' => 'BROWSERKEY',
                    'type' => 'googleKey',
                    'value' => 'AIzaSyB3FuY8O9CleDz3wEeqKXf5c5qNOi5fNdw',
                    'image' => '',
                    'status'=>1,
                    'created_at'=>NOW(),
                    'updated_at'=> NOW()
                ],
                [
                    'key' => 'CashOnDelivery',
                    'name' => 'CashOnDelivery',
                    'type' => 'PaymentGateway',
                    'value' => '1',
                    'image'=>'PaymentGateway/cash.png',
                    'status'=>1,
                    'created_at'=>NOW(),
                    'updated_at'=> NOW()
                ],
            ]
        );


    }
}
