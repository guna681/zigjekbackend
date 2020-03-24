<?php

namespace App\Http\Repository;

use App\Languages;
use App\Http\Utility\Constant;
use DB;

class LanguageRepository{

    public function listLanguages()
    {
        $data = Languages::select('id as languageId', 'lang', 'iso', 'default', 'status')
                          ->get();
        return $data;
    }

    public function getLanguage($data)
    {
        $data = Languages::select('id as languageId', 'lang', 'iso', 'default', 'status')
                          ->where('iso', $data->languageCode)
                          ->first();
        return $data;
    }


    public function addLanguage($data)
    {
        DB::beginTransaction();

        try {

            $language   = new Languages();
            $language->lang =  $data->lang;
            $language->iso  = $data->iso;
            $language->default = $data->default;
            $language->status  = $data->status;
            $language->save();
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();

            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;

    }


    public function updateStatus($data)
    {
        DB::beginTransaction();

        try {
            $update = Languages::where('id',$data->id)->update(['status'=>$data->status]);

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;

    }


    public function deleteLanguage($iso)
    {

        DB::beginTransaction();
        try {
            $language = Languages::where(['iso'=>$iso])->where('iso','!=','en')->delete();

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }




}
