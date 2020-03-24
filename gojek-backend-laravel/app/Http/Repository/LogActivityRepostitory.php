<?php
namespace App\Http\Repository;

use App\LogActivity;
use DB;

Class LogActivityRepostitory{

    public function  addToLog($data){
       try{   
        $logActivity=new LogActivity();
        $logActivity->userId=$data->userId;
        $logActivity->accessToken=$data->accessToken;
        $logActivity->osType=$data->osType;
        $logActivity->url=$data->url;        
        $logActivity->method=$data->method;
        $logActivity->save();
        }catch(\Illuminate\Database\QueryException $ex){
                $jsonresp=$ex->getMessage();                                    
                DB::rollBack();
                return false;
         }
        return  true;       
    }
}
