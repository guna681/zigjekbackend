<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use APP\Cart;

class CartCustomisations extends Model
{
    protected $table='Cart_Customisations';

    protected $fillable = [
        'dishId', 'dishCustomisationId',
    ];

    public function Cart(){
        return $this->belongsToMany(Cart::class);
     }


    
}
