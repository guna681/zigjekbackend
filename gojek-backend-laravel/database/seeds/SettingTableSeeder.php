<?php

use Illuminate\Database\Seeder;
use App\Setting;

class SettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Setting::insert([
            [
                'key'   => 'isOtpLogin',
                'value' => '0',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => 'resendOtpTime',
                'value' => '60',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => 'termsConditions',
                'value' => 'https://www.uberdoo.com/privacy-policy.html',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => 'getAddressDistance',
                'value' => '1',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => 'outletRadius',
                'value' => '3000',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => 'pickupTime',
                'value' => '15',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => 'Faq',
                'value' => 'http://104.131.74.144/uber_test/staticpages/faq.html',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => 'DeliveryAddressRadius',
                'value' => '15',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => '1',
                'value' => 'SIGNUP',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => '2',
                'value' => 'VERIFICATION',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => '3',
                'value' => 'BANK DETAILS',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => 'DeliveryStaffOtpLogin',
                'value' => '0',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'key'   => 'DeliveryBoyCommission',
                'value' => '10',
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
        ]);


    }
}
