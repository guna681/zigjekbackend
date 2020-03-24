<?php

     file_put_contents('/var/www/html/foodapp/app/Http/Utility/assignevent.log',date('y-m-d'),FILE_APPEND);



  


 $url = 'http://157.245.104.200/foodapp/public/api/getUnassignedOrders';

        $ch = curl_init();

      
        curl_setopt($ch, CURLOPT_URL, $url);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                


        curl_setopt($ch, CURLOPT_POST, 0);
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_POSTFIELDS,true);

      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

       
        $result = curl_exec($ch);


        curl_close($ch);
    if($result){


        echo "success";
    }

