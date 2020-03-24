<?php
namespace App\Http\Repository;

use Mail;
use App\MailSetting;

use DB;

Class MailRepostitory{

    public function listTemplate(){
        $data=array();
        $query=MailSetting::select('id','templateName','template','key','status')
                         ->get();
        $data = $query->groupBy('key');
        return $data;
    }

    public function getTemplate($templateId){
        $data=array();
        $query=MailSetting::select('id','templateName','template')
                          ->where('id',$templateId)
                          ->get();
        return $query;
    }

    public function updateTemplate($data){
        try{
            $mailTemplate=html_entity_decode($data->template, ENT_QUOTES, 'UTF-8');  
            $template=MailSetting::where('id',$data->templateId)
                                   ->update(['template'=>$mailTemplate,'templateName'=>$data->templateName]);
        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            return false;
        }

        return true;
    }

    public function updateStatus($data){
        try{
            $query=MailSetting::where('key',$data->key)->update(['status'=>0]);
            $query1=MailSetting::Where(['id'=>$data->templdateId])->update(['status'=>$data->status]);
        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            return false;
        }
        return true;
    }

    public function addTemplate($data){
        DB::beginTransaction();
        $token=MailSetting::select('Token')->where(['key'=>$data->key,'default'=>1])->first();

        try{
            $mail               = new MailSetting();
            $mail->templateName	= $data->templateName;
            $mail->template     = html_entity_decode($data->template, ENT_QUOTES, 'UTF-8');
            $mail->key          = $data->key;
            $mail->Token        = $token->Token;
            $mail->status       = $data->status;
            $mail->save();
        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }


    public function getTokens($data){
        $data=MailSetting::select('Token')
                         ->where(['key'=>$data->key,'default'=>1])
                         ->first();
        return $data;
    }



}
