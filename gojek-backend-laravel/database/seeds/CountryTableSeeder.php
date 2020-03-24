<?php

use Illuminate\Database\Seeder;
use App\Country;

class CountryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        Country::insert([
            [
                'countryName' => 'United States',
                'isoCode' => 'US',
                'currencyCode' => 'USD',
                'currencySymbol' => '$',
                'currencyValues' => '1.00000000',
                'status'=>0,
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'countryName' => 'European Union',
                'isoCode' => 'EU',
                'currencyCode' => 'EUR',
                'currencySymbol' => '€',
                'currencyValues' => '0.78460002',
                'status'=>0,
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [
                'countryName' => 'India',
                'isoCode' => 'IN',
                'currencyCode' => 'INR',
                'currencySymbol' => '₹',
                'currencyValues' => '0.78460002',
                'status'=>1,
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ]

        ]);

    }
}
