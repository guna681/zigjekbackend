<?php

namespace App\Http\Service\Admin;

use Mail;
use App\MailSetting;
use App\Http\Repository\MailRepostitory;
use App\Http\Utility\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


Class  MailService
{


    public function listMailTemplate()
    {
        $mailRepostitory   = new MailRepostitory();
        $mail     = $mailRepostitory->listTemplate();
        $data     = new DataService();
        if (!$mail->isEmpty()) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->mail         = $mail;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
            $data->mail         = $mail;
        }
        return $data;
    }


    public function getEmailTemplate($arg)
    {
        $mailRepostitory = new MailRepostitory();
        $mail            = $mailRepostitory->getTemplate($arg);
        $data            = new DataService();
        if ($mail) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->mail         = $mail;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
            $data->mail         = $mail;

        }
        return $data;
    }

    public function updateEmailTemplate($arg)
    {
        $mailRepostitory = new MailRepostitory();
        $mail   = $mailRepostitory->updateTemplate($arg);
        $data   = new DataService();
        if ($mail) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;
    }

    public function updateStatus($arg)
    {
        $mailRepostitory = new MailRepostitory();
        $mail   = $mailRepostitory->updateStatus($arg);
        $data   = new DataService();
        if ($mail) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }

    public function addTemplate($arg)
    {
        $mailRepostitory = new MailRepostitory();
        $mail = $mailRepostitory->addTemplate($arg);
        $data = new DataService();
        if ($mail) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }

    public function getMailTokens($arg)
    {
        $mailRepostitory = new MailRepostitory();
        $mail = $mailRepostitory->getTokens($arg);
        $data = new DataService();
        if ($mail) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->mailTokens   = $mail;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
            $data->mailTokens   = (object)array();

        }
        return $data;
    }


}