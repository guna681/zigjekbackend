<?php

namespace App\Http\Repository;

use App\Country;
use DB;
Class CurrencyRepostitory
{

    public function getCurrency()
    {

        $data = DB::table('Country')->where('status', 1)->value('currencySymbol');
        return $data;
    }
}