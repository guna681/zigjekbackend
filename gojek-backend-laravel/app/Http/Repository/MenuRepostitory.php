<?php
namespace App\Http\Repository;
use App\Setting;
use App\Cuisines;
use App\IntegrationSetting;
use DB;
use App\Http\Utility\Constant;


class MenuRepostitory{

    public function listCuisines($pageNumber)
    {

        $perPage = Constant::PERPAGE;
        $data = Cuisines::select('id as cuisinesId', 'name as CuisinesName', 'status')
                            ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }

    public function addCuisines($data){
        DB::beginTransaction();
		try{
            $cuisines = new Cuisines;
            $cuisines->name  =$data->cuisinesName;
            $cuisines->status=$data->status;
            $cuisines->save();
	   

		}catch(\Illuminate\Database\QueryException $ex){
			$jsonresp=$ex->getMessage();
			DB::rollBack();
			return false;
		}
		DB::commit();
		return true;
    }


    public function updateCuisines($data){
        DB::beginTransaction();
		try{

            $data=Cuisines::where('id',$data->cuisinesId)->update(['name'=>$data->cuisinesName,'status'=>$data->status]);	   

		}catch(\Illuminate\Database\QueryException $ex){
			$jsonresp=$ex->getMessage();
			DB::rollBack();
			return false;
		}
		DB::commit();
		return true;
    }

    public function getCuisine($data){        
        $data=Cuisines::select('id as cuisinesId','name as CuisinesName','status')
                        ->where('id',$data->cuisinesId)
                        ->first();

        return $data;   
    }

    public function deleteCuisine($data){

        $data=Cuisines::where('id',$data->cuisinesId)->delete();
        return $data; 
    }






}
	