<?php
namespace  App\Http\Cron;

Class S2ServiceProvider
{


    public function getCellId($latitude,$longitude)
    {

        $data = array('latitude'=>$latitude,'longitude'=>$longitude);
        $url = 'http://localhost:8002/s2CellId';


        $headers = array(
            'Content-Type: application/json'
        );

        // Open connection
        $ch = curl_init();

        // Set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        // Avoids problem with https certificate
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        // Execute post
        $result = curl_exec($ch);


        // Close connection
        curl_close($ch);


        if($result){

           return json_decode($result);
        }else{

           return $result = 0;
        }


    }


    public function getDistanceCalculation($origin, $destination)
    {
        // print_r($origin);die;
        $origindata = json_encode($origin);
        $destinationdata = json_encode($destination);
        $data = array('origin'=>$origindata, 'destination'=>$destinationdata);
        $url = 'http://localhost:8002/distanceCalculation';


        $headers = array(
            'Content-Type: application/json'
        );

        // Open connection
        $ch = curl_init();

        // Set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        // Avoids problem with https certificate
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        // Execute post
        $result = curl_exec($ch);


        // Close connection
        curl_close($ch);


        if($result){

           return json_decode($result);
        }else{

           return $result = 0;
        }


    }    




    public function wightCalculation($deliveryboy,$weight)
    {
        $data = array('deliveryboy'=>$deliveryboy,'weight'=>$weight);
        $url = 'http://localhost:8002/weightCalculation';


        $headers = array(
            'Content-Type: application/json'
        );

        // Open connection
        $ch = curl_init();

        // Set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        // Avoids problem with https certificate
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        // Execute post
        $result = curl_exec($ch);


        // Close connection
        curl_close($ch);

        if($result){

            return json_decode($result);
        }else{

            return $result = 0;
        }

    }



    public function reAssign($blockStaffList)
    {
// echo $blockStaffList;
        $data = array('blockStaffList'=>$blockStaffList);
        $url = 'http://localhost:8002/reAssign';


        $headers = array(
            'Content-Type: application/json'
        );

        // Open connection
        $ch = curl_init();

        // Set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        // Avoids problem with https certificate
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        // Execute post
        $result = curl_exec($ch);


        // Close connection
        curl_close($ch);


        if($result){

           return json_decode($result);
        }else{

           return $result = 0;
        }


    }



}