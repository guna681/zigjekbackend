<?php

namespace App\Http\Utility;

final class Common{

  const error_true         = 'true';
  const error_false        = 'false';

  


  //cart errors

  const error_shortDes='Too Many Items';
  const error_longDesc='Clear Items From Cart';
 
  
  //order errors
  const error_orderSuccess='Order placed successfully';
  const error_orderFailure='Failed Order'; 


  
  
  const error_userincorrect='User mobile number or password is invalid';
  const error_updatprofile='User profile updated successfully';
  
  
 
  const error_nosearch='Your search  did not match';
  const error_nocoupon='Coupon not available';
  const error_iscoupon='Coupon is available';
  const text_iscoupon='Success: Your coupon discount has been applied!';
  const text_nocoupon='Warning: Coupon is either invalid, expired or reached its usage limit!';
  const entry_coupon='Enter your coupon here';
  const error_removecoupon='coupon removed successfully';
  const error_iscart='Cartlisted successfully';
  const error_nocart='Your cart is empty';

  const error_login='No match for User Moblie Number  or Password.';
  const error_successcart='You have added Dish to your cart!';
  const text_number='Your Mobile Number is invalid!';  
  const error_countrycode='Your Country Code is invalid!';
 
 
  const error_latlong='Your Latitude or longitude is invalid!';

 
  

}
