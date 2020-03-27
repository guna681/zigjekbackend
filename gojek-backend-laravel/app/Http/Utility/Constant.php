<?php

namespace App\Http\Utility;

final class Constant{


   //setting

   const LOGIN_SETTING               = 'isOtpLogin';
   const TERMS_AND_CONDITIONS        = 'termsConditions';
   Const GET_ADDRESS_DISTANCE        = 'MAX_RANGE';
   Const OUTLET_RADIUS               = 'outletRadius';
   Const SHOW_RATING_POPUP_AFTER     = 'showRatingPopupAfter';
   Const PICKUP_TIME                 = 'pickupTime';
   Const RESEND_OTP_TIME             = 'resendOtpTime';
   Const UNSAVED_TYPE                = 'unsavedType';
   Const IS_CUSTOMIZE                = 1;
   Const NO_CUSTOMIZE                = 0;
   Const IS_RECOMMENDED              = 1;
   Const NO_RECOMMENDED              = 0;
   Const IS_SUBCATEGORY              = 1;
   Const NO_SUBCATEGORY              = 0;
   Const RECOMMENDED                 ='Recommended';  
   Const ANDROID_MAPkEY              ='androidmapKey';
   Const IOS_MAPkEY                  ='iosMapKey';
   Const FIREBASE_KEY                ='FireBasekey';
   Const BROWSER_KEY                 ='BrowserKey';
   Const STRIPE                      ='Stripe';
   Const TWILIO_KEY                  ='Twilio';
   Const PASSWORD_LOGIN              ="passwordLogin";   
   Const OTP_LOGIN                   ="otpLogin";
   Const FAQ_PAGE                    ='Faq';
   Const DELIVERY_ADDRESS_RADIUS     = 'DeliveryAddressRadius';
   Const DELIVERYSTAFF_LOGIN_SETTING = 'DeliveryStaffOtpLogin';
   Const DELIVERYBOYCOMMISSION       = 'DeliveryBoyCommission';


    //integrationtypes
   Const SMS_GATEWAY                 ='SmsGateWay';
   Const PAYMENT_GATEWAY             ='PaymentGateway';
   Const LOGIN_TYPE                  ='LoginType';
   Const PUSH_NOTIFICATION           ='PushNotification';
   Const MAP_KEY                     ='googleMapKey';  

   // charges
   Const DELIVERY_CHARGES            = 'DELIVERY_CHARGES';  
   Const DISTANCE_CHARGES            = 'DISTANCE_CHARGES';  
   Const PER_KM_CHARGES              = 'PER_KM_CHARGES';  
   Const DISTANCE_THRESHOLD          = 'DISTANCE_THRESHOLD';  


   Const PERPAGE                     = 10;
   
   //imageupload path

    Const RESTAURANT                 = 'Restaurant';
    Const OFFERSIMAGE                = 'offersimage';
    Const DISHIMAGE                  = 'dishes';
    Const DELIVERYBOYIMAGE           = 'DeliveryboyImage';
    Const DELIVERYBOYDOCUMNET        = 'DeliveryboyDocument';


   //table name

    Const USERS                        ='Users';
    Const OUTLETS                      ='Outlets';



    //ORDER STATUS


    Const UNASSIGNED                  = 'unassigned';
    Const ACCEPTED                    = 'accepted';
    Const REJECTED                    = 'rejected';
    Const PICKEDUP                    = 'pickedup';
    Const DELIVERED                   = 'delivered';
    Const CONFIRMED                   = 'confirmed';
    Const ASSIGNED                    = 'assigned';
    Const REACHOUTLET                 = 'reachOutlet';
    const REACHUSERLOCATION           =  'reachUserLocation';

  //Mail Template keys

    Const SIGNUP                      = 'signup';
    Const ORDERINVOICE                = 'order';

    //ouath login

    Const ADMIN                      = 'admin';


}
