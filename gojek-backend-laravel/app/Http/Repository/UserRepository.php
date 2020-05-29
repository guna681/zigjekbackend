<?php

namespace App\Http\Repository;

use App\User;
use App\Address;
use App\UserOtp;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Utility\Constant;
use DB;

class UserRepository
{

//user module


    public function  addUser($data){

        DB::beginTransaction();
        try{
            $user = new User;
            $user->userName = $data->userName;
            $user->email    = strtolower($data->email);
            $user->mobileNumber = $data->mobileNumber;
            $user->refferalCode = $data->refferalCode;
            if($data->password){
                $user->password =bcrypt($data->password);
            }
            $user->udId             =$data->udId;
            $user->stripeCustomerId =$data->customerId;
            $user->countryCode      =$data->countryCode;
            $user->save();

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return $user->id;
    }

    public function  addSocialUser($data){

        DB::beginTransaction();
        try{
            $user = new User;
            $user->userName = $data->userName;
            $user->email    = strtolower($data->email);
            $user->mobile = $data->mobileNumber;
            $user->loginType    = $data->loginType;
            $user->socialToken  = $data->socialToken;
            $user->refferalCode = $data->refferalCode;
            if($data->password){
                $user->password =bcrypt($data->password);
            }
            if ($data->loginType == 'GOOGLE') {
                $user->googleToken = $data->socialToken;
            } 
            if ($data->loginType == 'FACEBOOK') {
                $user->facebookToken = $data->socialToken;
            }
            if ($data->loginType == 'APPLE') {
                $user->appleToken = $data->socialToken;
            }
            $user->udId             =$data->udId;
            $user->stripeCustomerId =$data->customerId;
            $user->countryCode      =$data->countryCode;
            $user->save();

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return $user->id;
    }
    
    public function putOtp($data){
       $userOtp=UserOtp::where(['mobileNumber'=>$data->mobileNumber])->first();
       if($userOtp){
        $data=UserOtp::where('mobileNumber',$data->mobileNumber)->update(['otpNumber'=>$data->otpNumber]);
        return true;
       }else{
        DB::beginTransaction();
        try{
            $user = new UserOtp;
            $user->mobileNumber = $data->mobileNumber;
            $user->otpNumber=$data->otpNumber;
            $user->save();
        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();

        return true;
       }



    }

    public  function getUser($data){
        $data=User::select('Id as id','FirstName as userName','Email as email','Mobile as mobileNumber','ExtCode as countryCode','Status as status','deviceToken','os',
            'StripeCustomerID', 'latitude', 'longitude', 'CurrentAddressId')->where('id',$data)->first();
        return $data;
    }


    public function putUdid($data){
        DB::beginTransaction();
        try{
            $data=User::where('id',$data->userId)->update(['udId'=>$data->udId]);

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }

    public function  getExistMobile($data){       
        $data=User::where('Mobile',$data)->first();
        return $data;
    }

    public function getMobileNumber($data)
    {
        $data = User::where(['Mobile'=>$data->mobileNumber,'ExtCode'=>$data->countryCode])->first();
        return $data;
    }

    public function  getExistSocialToken($data){
    if ($data->email) {
         $data=User::where(['email'=>$data->email])->first();
        return $data;
    }  else {
        $data=User::where(['appleToken'=>$data->socialToken])->first();
        return $data;
    }      
        
    }

    public function putPassword($data){
        DB::beginTransaction();
        try{
            $data=User::where('mobileNumber',$data->mobileNumber)->update(['password'=>bcrypt($data->password)]);
        }catch(\Illuminate\Database\QueryException $ex){
                $jsonresp=$ex->getMessage();
                DB::rollBack();
                return false;
        }
            DB::commit();
            return true;
    }

    public function getEmail($arg){
        $data=User::where('email',$arg)->first();
        return $data;
    }

    public static function userEmail($arg){
        $data=User::where('id',$arg)->select('email')->first();

        return $data;
    }

    public function removeOtp($data){
        $data=UserOtp::where(['mobileNumber'=>$data->mobileNumber,'otpNumber'=>$data->otpNumber])->delete();
        return $data;
    }


    public function verifyOtp($data){
        $data=userOtp::where(['Mobile'=>$data->mobileNumber])->first();
        return $data;
    }

    public function  getResendOtp($data){
        $data=UserOtp::where(['mobileNumber'=>$data->mobileNumber])->first();
        return $data;
    }

    public function getVerifiedUser($code){
        $data=User::where('code',$code)->get();
        return $data;
    }


    public function editProfile($data,$userId){
        DB::beginTransaction();
        try{
            $query = User::where('id',$userId)->update(['userName'=>$data->userName]);

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;

    }

    public function putProfile($data){

        $query=UserOtp::where(['otpNumber'=>$data])->first();
        if($query){
            DB::beginTransaction();
            try{
              $data=User::where('otpNumber',$data)->update(['email'=>$query->email]);
              $delete=UserOtp::where(['email'=>$query->email])
                               ->delete();        
    
            }catch(\Illuminate\Database\QueryException $ex){
                $jsonresp=$ex->getMessage();
                DB::rollBack();
                return false;
            }
            DB::commit();
            return true;

        }

        return false;
       
    }
    public function putEmail($data){
        DB::beginTransaction();
        try{
            $user = new UserOtp;
            $user->email = $data->email;
            $user->otpNumber=$data->otpNumber;
            $user->save();

            $query=User::where('id',$data->userId)->update(['otpNumber'=>$data->otpNumber]);
        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }

    // address  modlue functions

    public function getAddress($userid){
      
        $data=Address::select(DB::raw("fullAddress,id,userId,location,houseFlatNo,landMark,latitude,longitude,type,currentAddress"))->where(['userId'=>$userid,'unSaved'=>0,'isDeleted'=>0])->get();
        return $data;
    }

    public function getUserAddress($userAddressId){
      
        $data=Address::select(DB::raw("fullAddress,id,userId,location,houseFlatNo,landMark,latitude,longitude,type,currentAddress"))->where(['id'=>$userAddressId,'unSaved'=>0])->get();
        return $data;
    }

    public function getCurrentAddress($data){
           
        $userAddress=User::where('Id',$data->userId)->first();
        
        $address=Address::where(['userId'=>$data->userId,'currentAddress'=>1])->first();
        if($userAddress->CurrentAddressId && $address){

            $query=DB::select(DB::raw("select fullAddress,id,userId,location,houseFlatNo,landMark,latitude,longitude,type,
            ST_Distance_Sphere(
                point('$data->longitude', '$data->latitude'),
                point(Address.longitude, Address.latitude)
            ) AS distance from Address where Address.userId='$data->userId' and Address.unSaved = '0' and  Address.id Having distance < '$data->getAddressDistance' ORDER by distance asc"));

           if(sizeof($query)==0){
             
            $query=Address::select(DB::raw("fullAddress,id,userId,location,houseFlatNo,landMark,latitude,longitude,type"))->where(['id'=>$userAddress->CurrentAddressId])->get();

           }else{             
               
             $user =User::where('Id',$data->userId)->update(['CurrentAddressId'=>$query[0]->id]);

           }


        }else{

            try{             
                $userAddress = new Address;
                $userAddress->userId        = $data->userId;
                $userAddress->type          = $data->city;
                $userAddress->unSaved       = 1;
                $userAddress->latitude      = $data->latitude;
                $userAddress->longitude     = $data->longitude;
                $userAddress->location      = $data->location;
                $userAddress->fullAddress	= $data->location;
                $userAddress->currentAddress= 1;
                $userAddress->save();
                $user =User::where('Id',$data->userId)->update(['CurrentAddressId'=>$userAddress->id]);


            }catch(\Illuminate\Database\QueryException $ex){
                $jsonresp=$ex->getMessage();
                print_r($jsonresp);

                return false;
            }
             if ($userAddress->id){
                $query=DB::select(DB::raw("select fullAddress,id,location,houseFlatNo,landMark,type,latitude,longitude ,(
                6371 * acos (
                cos ( radians('$data->latitude') )
                * cos( radians( Address.latitude ) )
                * cos( radians( Address.longitude ) - radians('$data->longitude') )
                + sin ( radians('$data->latitude') )
                * sin( radians( Address.latitude ) )
              )
          ) AS distance from Address where Address.userId='$data->userId' and Address.id Having distance < '$data->getAddressDistance' ORDER by distance asc"));
             }
            
     

        }
       
      return $query;

    }

    public function addAddress($data){
        DB::beginTransaction();

        try {
            $useraddress = new Address;
            $useraddress->userId      = $data->userId;
            $useraddress->location    = $data->location;
            $useraddress->houseFlatNo = $data->houseFlatNo;
            $useraddress->fullAddress =$data->fullAddress;
            if($data->landMark){
            $useraddress->landMark    = $data->landMark;
            }
            $useraddress->type        = $data->type;
            $useraddress->latitude    = $data->latitude;
            $useraddress->longitude   = $data->longitude;
            $useraddress->save();

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();      
            return false;
  		}
        DB::commit();
          
        $user =User::where('Id',$data->userId)->update(['CurrentAddressId'=>$useraddress->id]);

        return $useraddress->id;

    }

    public function putAddress($data){
        DB::beginTransaction();
        try{

            
      $AddressResult=Address::where('id',$data->addressId)->update(['location'=>$data->location,'houseFlatNo'=>$data->houseFlatNo,'landMark'=>$data->landMark,'type'=>$data->type,'latitude'=>$data->latitude,'longitude'=>$data->longitude,'fullAddress'=>$data->fullAddress,'userId'=>$data->userId]);         
        }catch(\Illuminate\Database\QueryException $ex){
        $jsonresp=$ex->getMessage();      
        DB::rollBack();
        return false;
        }
        DB::commit();
        if(empty($AddressResult)){
            return true;
        }
        return true;

    }


    public function checkAddress($data){
            $resultData=Address::where(['type'=>$data->type,'isDeleted'=>0,'userId'=>$data->userId])
                                       ->whereNotIn('id', [$data->addressId])
                                       ->first();
        return $resultData;

    }
    public function setCurrentAddress($data){
       
        DB::beginTransaction();
        try{
            $user =User::where('id',$data->userId)->update(['CurrentAddressId'=>$data->addressId]);
            $query=Address::where('userId',$data->userId)->update(['currentAddress'=>0]);
            $address=Address::where('id',$data->addressId)->update(['currentAddress'=>1]);
        }catch(\Illuminate\Database\QueryException $ex){
        $jsonresp=$ex->getMessage();        
        DB::rollBack();
        return false;
        }
        DB::commit();
        if(empty($data)){
            return false;
        }
        return true;
    }

    public function deleteAddress($data){
       
        try{
            $address=Address::where(['id'=>$data->addressId,'userId'=>$data->userId])->update(['isDeleted'=>1]);
            $user =User::where(['id'=>$data->userId,'CurrentAddressId'=>$data->addressId])->first();
            if($user){
                $user =User::where(['id'=>$data->userId,'CurrentAddressId'=>$data->addressId])->update(['CurrentAddressId'=>0]);
            }

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage(); 
            return false;
        }
        if($address){
            return true;
        }      
        return false;

    }

    public function getUserTotal() {

        try{
            $data = User::count();

        }catch(\Illuminate\Database\QueryException $ex){

            $jsonresp = $ex->getMessage();
            return false;
        }

        return $data;

    }

    public function getUsers($page) {

        if($page) {

            $page = $page - 1;
        } else {
            $page = 0;
        }

        $page_offset=($page * 10);

        try{
            $data = User::selectRaw('id, userName, email, image')
            ->offset($page_offset)
            ->limit(10)
            ->get();

        }catch(\Illuminate\Database\QueryException $ex){

            $jsonresp = $ex->getMessage();
            return false;
        }


        return $data;

    }

    public function getPages() {
        $totalUsers = self::getUserTotal();
        $total = $totalUsers/10;
        $NumOfPage = ceil($total);

        return $NumOfPage;
    }

    public function deleteUser($userId){
        $data=array();
        $data=User::where('id',$userId)->delete();
        return $data;
    }

    public function getPaymentAddress($addressId)
    {

        $data = Address::where('id',$addressId)->first();
        return $data;

    }


    public function updateDevicetoken($data, $userId)
    {

        DB::beginTransaction();
        try {
            $update = User::where('Id', $userId)
                             ->update(['deviceToken' => $data->deviceToken,'os'=>$data->osType]);
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::Commit();
        return true;

    }

    public function userLogout($data){
        DB::beginTransaction();
        try{
            $data=UserDevices::where('UserId',$data)->update(['DeviceId'=>'']);

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }

    // address  modlue functions

    public function currentAddress($userid,$userCurrentAddress){
        $data=Address::select(DB::raw("fullAddress,id,userId,location,houseFlatNo,landMark,latitude,longitude,type,currentAddress"))->where(['userId'=>$userid,'unSaved'=>0,'isDeleted'=>0,'id'=>$userCurrentAddress])->get();
        return $data;
    }

}
