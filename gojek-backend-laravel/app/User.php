<?php

namespace App;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use DB;



class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $table='Users';
    protected $primaryKey = 'Id';


    public function findForPassport($username)
    {
        return $this->where('Mobile', $username)->first();
    }

    public function getAuthPassword()
    {
        return $this->Password;
    }
}
