<?php

namespace App\Http\Service\Admin;

use App\Http\Utility\LanguageManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Repository\LanguageRepository;
use File;
use Storage;
use Illuminate\Support\Str;
use Symfony\Component\VarDumper\Cloner\Data;


Class LanguageService {

    public function listLanguages(){
        $languageRepository= new LanguageRepository();
        $languages         =$languageRepository->listLanguages();
        $data              =new DataService();
        if(!$languages->isEmpty()){
            $data->error         =Common::error_false;
            $data->errorMessage  =__('validation.sucess');
            $data->languages     = $languages;
        }else{
            $data->error         =Common::error_true;
            $data->errorMessage  =__('validation.failure');
        }
        return $data;
    }


    public function getLanguages($arg)
    {
        $languageRepostitory = new LanguageRepository();
        $languages   = $languageRepostitory->getLanguage($arg);
        $data        = new DataService();
        if ($languages) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->language     = $languages;



        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }


    public function addLanguage($arg)
    {
        $languageRepostitory = new LanguageRepository();
        $languages           = $languageRepostitory->addLanguage($arg);
        $data       = new DataService();
        if ($languages) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.addSuccess');
            $languageManager    = new LanguageManager();
            //create directory
            $createLang         = $languageManager->createNewLanguage($arg->iso);
            $languageString = File::getRequire(base_path() . '/resources/lang/en/validation.php');
            //create the File and Import the language key and value
            $languageManager->writeLanguageFile($arg->iso, $languageString);

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;

    }


    public function updateLanguageString($arg)
    {

        $languageString = File::getRequire(base_path().'/resources/lang/'.$arg->iso.'/validation.php');

        $explodeValue = preg_split('/:attribute|:date|:values|:min and :max.|:other|:min/', $arg->value, -1, PREG_SPLIT_NO_EMPTY);

        $value = implode($explodeValue);
        $languageManager = new LanguageManager();
        if(!empty($arg->masterKey)){
            $masterkeyValue = $languageString[$arg->masterKey];

            if(is_array($masterkeyValue)){
                $rules = $masterkeyValue[$arg->key];
            }
            $value =$languageManager->buildValue($value,$rules);
            $masterkeyValue[$arg->key]= $value;
            $languageString[$arg->masterKey]=$masterkeyValue;
        }else{
            $rules = $languageString[$arg->key];

            $languageString[$arg->key] = $value;
        }

        $updateString= $languageManager->writeLanguageFile($arg->iso, $languageString);
        $data  = new DataService();
        if($updateString){
            $data->error   = Common::error_false;
            $data->errorMessage = __('validation.updateSuccess');
        }else{
            $data->error  = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
   }




    public function updateStatus($arg)
    {
        $languageRepostitory = new LanguageRepository();
        $language            = $languageRepostitory->updateStatus($arg);
        $data                = new DataService();
        if($language){
            $data->error   = Common::error_false;
            $data->errorMessage = __('validation.updateSuccess');
        }else{
            $data->error  = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }

    public function deleteLanguage($languageCode)
    {

        $languageRepostitory = new LanguageRepository();
        $language            = $languageRepostitory->deleteLanguage($languageCode);
        $data                = new DataService();
        if($language){
            $data->error   = Common::error_false;
            $data->errorMessage = __('validation.deleteSuccess');
            if($languageCode != 'en') {

                $languageManager = new LanguageManager();
                $delete = $languageManager->deleteLanguagesDirectory($languageCode);
            }

        }else{
            $data->error  = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }



    public function getLanguageString($iso)
    {

        $languageString = File::getRequire(base_path().'/resources/lang/'.$iso.'/validation.php');

        $data =array();
        if($languageString){
            $data['error']   = Common::error_false;
            $data['errorMessage'] = __('validation.sucess');

            $language = [];
            $i =1;
            foreach($languageString as $key => $value){

                if(is_array($value)){
                        $j =1;
                    foreach($value as $key1 => $value2){

                        $subString[]=array('id'=>$j++,'key'=>$key1,'value'=>$value2);

                    }
                    $data[$key]=$subString;
                }else{
                    $value1 = $value;
                }
                $language[]=array(
                    'id' => $i++,
                    'key'=>$key,

                    'value'=>$value1,
                );
            }

            $data['languageString'] = $language;
        }else{
            $data['error']  = Common::error_true;
            $data['errorMessage'] = __('validation.failure');
        }

        return $data;
    }



    



}