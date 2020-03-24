<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Service\Admin\LanguageService;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Validator;
use File;

Class LanguagesController extends Controller{


    /**
     * show the available languages api.
     * @param
     * @return json
     * */

    public function listLanguages(request $request){
        $languageService   =new LanguageService();
        $response          =$languageService->listLanguages();
        $responsedata      =Defaults::encode($response);
		return $responsedata;
    }

    /**
     * Return the language name,code,status
     * @param languagecode
     * @return json
     */

    public function getLanguages(request $request){
        $response   = new Response();
        $rules      = array('languageCode=>required|string');
        $validator  =Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $languageService        = new LanguageService();
            $response               = $languageService->getLanguages($request);
        }
        $responsedata=Defaults::encode($response);
        return $responsedata;
    }


    /**
     * Add the New Language api
     * @param name , iso ,status,default
     * @return void
     * **/

    public function addLanguage(request $request)
    {

        $response   = new \stdClass();
        $rules      = array('lang' => 'required', 'iso' => 'required', 'status' => 'required');
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {

            $languageService = new LanguageService();
            $response        = $languageService->addLanguage($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * update Language string api
     * @param key ,iso
     * @return boolean
     **/


    public function updateLanguageString(request $request)
    {

        $response  = new \StdClass();
        $rules     = ['key'=>'required','iso'=>'required|exists:Languages','value'=>'required'];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data      = $validator->messages();
            $response->error = Common::error_true;
            $response->errorMessage= $data->first();
        }else{
            $lanuageService   = new LanguageService();
            $response         = $lanuageService->updateLanguageString($request);
        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * update language status api
     * @param id,status
     * @return void
     * */
    public function updateLanguageStatus(request $request)
    {
        $response   = new \StdClass();
        $rules      = ['id' => 'required|exists:Languages', 'status' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $languageService = new LanguageService();
            $response        = $languageService->updateStatus($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * show the language string api
     * @param iso
     * @return json
     * **/
    public function getLanguageString(request $request)
    {
        $response = new \stdClass();
        $rules    = ['iso'=>'required|exists:Languages,iso'];
        $validator  = Validator::make(['iso' => $request->iso], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $languageService = new LanguageService();
            $response        = $languageService->getLanguageString($request->iso);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;


    }


    /**
     * Delete the languages  api
     * default language english should not be deleted.
     * @param iso
     * @return boolean
     * */

    public function deleteLanguage(request $request)
    {
        $response  = new \StdClass();
        $rules     = ['iso' => 'required|exists:Languages,iso'];
        $validator = Validator::make(['iso' => $request->iso], $rules);
        if ($validator->fails()){
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $languageService = new LanguageService();
            $response        = $languageService->deleteLanguage($request->iso);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


}