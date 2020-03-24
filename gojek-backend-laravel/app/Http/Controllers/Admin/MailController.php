<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Service\Admin\MailService;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Validator;


Class MailController extends Controller{


    public function listMailTemplate(request $request){
        $mailService=new MailService();
        $response=$mailService->listMailTemplate();
        $responseData=Defaults::encode($response);
        return $responseData;

    }


    public function getEmailTemplate(request $request){
        $response=new Response();                 
        $mailService=new MailService();
        $response=$mailService->getEmailTemplate($request->id);                             	
        $responsedata=Defaults::encode($response);
        return $responsedata;   
    }


    public function updateEmailTemplate(request $request){
        $response=new Response();
        $rules = array(
          'templateId'      => 'required|numeric',	          
          );   
        $validator = Validator::make($request->all(),$rules);        
        if ($validator->fails()) {    
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
              
       }else{    
          $mailService=new MailService();
          $response=$mailService->updateEmailTemplate($request);
                      
       }	
        $responsedata=Defaults::encode($response);
        return $responsedata;
      
    }
    /**
     * @param key  integer  required The name of the mailtemplate
     * @param templdateId integer required The id of the mailltemplate
     * @param status integer required The status of the template active or deactivate
     * @return Void
     * */


    public function  updateStatus(request $request){
        $response   =new Response();
        $rules      =array('key'=>'required','status'=>'required:numeric','templdateId'=>'required');
        $validator  =Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $maillService           = new MailService();
            $response               =$maillService->updateStatus($request);
        }
        $responsedata =Defaults::encode($response);
        return $responsedata;
    }

    public function addEmailTemplate(request $request){
        $response   = new Response();
        $rules      = array(
                            'templateName'=>'required',
                            'template'      =>'required',
                            'key'           =>'required',
                            'status'        =>'required|numeric'
                            );
        $validator  =Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $mailService            = new MailService();
            $response               = $mailService->addTemplate($request);
        }
        $responsedata   =Defaults::encode($response);
        return $responsedata;

    }

    public function getMailTokens(request $request){
        $response       = new Response();
        $mailService    = new MailService();
        $response       = $mailService->getMailTokens($request);
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }







}