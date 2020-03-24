<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;


class DeliveryStaffDetails extends Model
{
    protected $table='DeliveryStaff_Details';

    protected $fillable = [
        'deliveryStaffId', 'key', 'value',
    ];

}