<?php
namespace App\Http\Service;

use Mail;
use App\MailSetting;

Class  MailService{


    public function setTitle($title)
    {
        $this->title = $title;

    }

    public function setReceiver($receiverMail)
    {
        $this->receiverMail =$receiverMail;

    }


    public function setTemplate($key)
    {
        $this->key = $key;

    }


    public function getTemplate()
    {

        $template=MailSetting::select('template')
                              ->where(['key'=>$this->key,'status'=> 1])
                              ->first();

        return $template->template;

    }

    public function buildMessage($data)
    {
        $template = $this->getTemplate();

        $result   = preg_replace_callback('/##(\w+)(?:\\((.*?)\\))?##/', function ($match) use($data) {
            $value = isset($data[$match[1]]) ? $data[$match[1]] : null;

            if (!$value) {
                // undefined variable in template throw exception or something ...
            }

            return $value;
        }, $template);


        return $result;
    }


    public function sendMail($data)
    {

        $title           = $this->title;
        $email           = $this->receiverMail;
        $messsageContent = $this->buildMessage($data);

        Mail::send([], [], function($message) use ($email,$messsageContent,$title) {
            $message->to($email);
            $message->subject($title);
            $message->setBody( $messsageContent, 'text/html');
        });

        return true;
    }




    public function adminMail($arg){
        $emailTo=$arg->email;
        $subject="RESTAURANT ADMIN LOGIN DETAILS";
        $data['title']="Food Delivery App";
        $data['userName']=$arg->email;
        $data['password']=$arg->password;
        $Mail = Mail::send('email.restaurant-AdminLogin',$data, function ($message) use ($emailTo,$subject,$data) {
            $message->To($emailTo)->subject($subject);   
        });
      

    }

    public function sendEmailConfirm($arg){

        $subject="Fooddelivery App Email Verification";
        $data['title']="VERIFY ACCOUNT";      
        $emailTo=$arg->email;
        $url=url('/');
        $link=array('link' => ($url.'/api/getVerfiyEmail/'.$arg->otpNumber), 'username' => $arg->email);
        $Mail = Mail::send('email.confirm-email',$link, function ($message) use ($emailTo,$subject,$link) {
            $message->To($emailTo)->subject($subject);   
        });
     
    }






    


}