<?php

namespace App\Http\Repository;

use App\Oauthclients;

Class OauthClientRepostitory
{


    public  function getClientKey($id)
    {
        $data = OauthClients::select('id', 'secret')->where('id',$id)->first();

        return $data;
    }



}