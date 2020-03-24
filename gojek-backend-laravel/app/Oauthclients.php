<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Oauthclients extends Model
{
    protected $table='oauth_clients';

    public static function  getUserClient(){

    	$data=DB::table('oauth_clients')->where('id',2)->first();
    	return $data;
    }

    

}
