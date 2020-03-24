<?php
namespace App\Http\Repository;
use App\City;
use App\Country;
use DB;
Class LocationRepository{
    
    public function selectCity($data){
        DB::beginTransaction();
        try{
            $update=City::where('countryId',$data->countryId)->update(['status'=>'0']);
            $query=City::where(['id'=>$data->cityId,'countryId'=>$data->countryId])->update(['status'=>'1']);       
        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
             DB::rollBack();      
             return false;
        }
            DB::commit();
       
        return true;
        
    }

    public function getSelectedCity(){
        $data=City::where('status',1)->get();
        return $data;
    }


    public function getCountry() {
        $city = Country::selectRaw('id, countryName')
        ->get();
    
        return $city;
      }
    
      public function getCity($countryId) {
        $city = City::selectRaw('id, cityName AS itemName')
        ->where('countryId', $countryId)
        ->get();
    
        foreach( $city as $cit ) {
          $cit->selected = false;
        }
    
        return $city;
      }
}