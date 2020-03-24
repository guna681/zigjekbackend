<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;


Class MockController extends Controller{


    public function homePage(request $request)
    {
        $response = '{
  "error": false,
  "errorMessage": "success",
  "deliveryDetail": {
    "todayDisplayName": "TODAY\'S DELIVERY\'S",
    "todayCost": "₹2990",
    "todayOrders": "21",
    "weekDisplayName": "WEEK SO FAR",
    "weekCost": "₹8522",
    "weekOrders": "34",
    "yesterdayDisplayName": "YESTERDAYS",
    "yesterdayCost": "₹3952",
    "yesterdayOrders": "55",
    "tripStatus" : 0
  }
}';

     echo $response;

    }


    public  function   listDishs(request $request){
        $response='{
      "error": "false",
      "errorMessage": "Dishes listed",
      "cartDetails":[{
        "dishCount":"5",
        "totalAmount":"550",
        "unit":"$"
      }
      ],
      "dishes": [
        {
          "categoryName": "recommended",      
          "categoryId": "1",
          "isRecommended":1,
          "isHavingSubCategory":0,
          "categoryValues": [
            {
              "dishId": "2",
              "dishName": "Tandoori Chicken",
              "price": "150",
              "slashPrice": "150",
              "unit": "$",
              "quantity": 1,
              "cuisineType": "Mexican Pizza",
              "description": "Pizza",
              "availableFrom": "3600000",
              "availableTo": "28800000",
              "isHighlighted": 1,
              "highlightedValue": "Must Try",
              "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/5.jpeg",
              "isCustomizable": 1,
              "isVeg": 1,
              "customizableElements": [
                {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":1,
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":1,
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    },
                {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":"1",
                      "customizableType": "multiple",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":"1",
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":"0",
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    }
              ]
            },
            {
              "dishId": "3",
              "dishName": "margherita pizza",
              "price": "150",
              "slashPrice": "270",
              "quantity": 0,
              "unit": "$",
              "cuisineType": "Mexican Pizza",
              "description": "Pizza",
              "availableFrom": "43200000",
              "availableTo": "43200000",
              "isHighlighted": 1,
              "highlightedValue": "Must Try",
              "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/5.jpeg",
              "isCustomizable": 0,
              "isVeg": 1,
              "customizableElements": [
                {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":1,
                      "customizableType": "multiple",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":1,
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    },
                {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":1,
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":1,
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    }
              ]
            },
            {
              "dishId": "2",
              "dishName": "margherita pizza",
              "price": "239",
              "slashPrice": "270",
              "unit": "$",
              "quantity": 1,
              "cuisineType": "Mexican Pizza",
              "description": "Pizza",
              "availableFrom": "3600000",
              "availableTo": "28800000",
              "isHighlighted": 1,
              "highlightedValue": "Must Try",
              "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/5.jpeg",
              "isCustomizable": 1,
              "isVeg": 1,
              "customizableElements": [
                {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":1,
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":1,
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    },
                {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":1,
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":1,
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    }
              ]
            },
            {
              "dishId": "3",
              "dishName": "margherita pizza",
              "price": "239",
              "slashPrice": "270",
              "unit": "$",
              "quantity": 0,
              "cuisineType": "Mexican Pizza",
              "description": "Pizza",
              "availableFrom": "43200000",
              "availableTo": "43200000",
              "isHighlighted": 1,
              "highlightedValue": "Must Try",
              "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/5.jpeg",
              "isCustomizable": 0,
              "isVeg": 1,
              "customizableElements": [
                {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":1,
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":1,
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    },
                {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":1,
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":1,
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    }
              ]
            }
          ]
        },
        {
          "categoryName": "Veg pan pizzas",
          "isRecommended":0,
          "isHavingSubCategory":0,
          "categoryValues": [
            {
              "dishId": "3",
              "dishName": "margherita pizza",
              "price": "239",
              "quantity": 1,
              "slashPrice": "270",
              "unit": "$",
              "cuisineType": "Mexican Pizza",
              "description": "Pizza",
              "availableFrom": "3600000",
              "availableTo": "28800000",
              "isHighlighted": 1,
              "highlightedValue": "Must Try",
              "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/7.jpeg",
              "isCustomizable": 1,
              "isVeg": 1,
              "customizableElements": [
                {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":1,
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":"1",
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    }
              ]
            },
            {
              "dishId": "3",
              "dishName": "margherita pizza",
              "quantity": 1,
              "price": "239",
              "slashPrice": "270",
              "unit": "$",
              "cuisineType": "Mexican Pizza",
              "description": "Pizza",
              "availableFrom": "3600000",
              "availableTo": "28800000",
              "isHighlighted": 1,
              "highlightedValue": "Must Try",
              "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/7.jpeg",
              "isCustomizable": 0,
              "isVeg": 1,
              "customizableElements": [
                {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":"1",
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":1,
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    }
              ]
            }
          ]
        },
        {
          "categoryName": "Soups",
          "isRecommended":0,      
          "isHavingSubCategory": 1,
          "subCategoryValues": [
            {
              "categoryName": "Veg",
              "categoryValues": [
                {
                  "dishId": "2",
                  "dishName": "margherita pizza",
                  "price": "500",
                  "slashPrice": "270",
                  "quantity": 1,
                  "unit": "$",
                  "cuisineType": "Mexican Pizza",
                  "description": "Pizza",
                  "availableFrom": "3600000",
                  "availableTo": "86400000",
                  "isHighlighted": 1,
                  "highlightedValue": "Must Try",
                  "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/7.jpeg",
                  "isCustomizable": 0,
                  "isVeg": 0,
                  "customizableElements": [
                    {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId": "1",
                          "elementName": "Onions",
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId": "2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    }
                  ]
                },
                {
                  "dishId": "3",
                  "dishName": "margherita pizza",
                  "price": "800",
                  "slashPrice": "270",
                  "unit": "$",
                  "quantity": 3,
                  "cuisineType": "Mexican Pizza",
                  "description": "Pizza",
                  "availableFrom": "3600000",
                  "availableTo": "86400000",
                  "isHighlighted": 1,
                  "highlightedValue": "Must Try",
                  "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/7.jpeg",
                  "isCustomizable": 0,
                  "isVeg": 1,
                  "customizableElements": [
                    {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId": "1",
                          "elementName": "Onions",
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1,
                          "isSelected": "1"
                        },
                        {
                          "elementId": "2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "units": "$",
                          "isVeg": 1,
                          "isSelected": "0"
                        }
                      ],
                      "quantity": "1"
                    }
                  ]
                }
              ]
            },
            {
              "categoryName": "Non-Veg",
              "isRecommended":0,
              "isHavingSubCategory":0,
              "categoryValues": [
                {
                  "dishId": "2",
                  "dishName": "margherita pizza",
                  "price": "600",
                  "quantity": 0,
                  "slashPrice": "270",
                  "unit": "$",
                  "cuisineType": "Mexican Pizza",
                  "description": "Pizza",
                  "availableFrom": "3600000",
                  "availableTo": "86400000",
                  "isHighlighted": 1,
                  "highlightedValue": "Must Try",
                  "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/5.jpeg",
                  "isCustomizable": 1,
                  "isVeg": 1,
                  "customizableElements": [
                    {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":1,
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":1,
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    }
                  ]
                },
                {
                  "dishId": "3",
                  "dishName": "margherita pizza",
                  "price": "455",
                  "slashPrice": "270",
                  "unit": "$",
                  "quantity": 1,
                  "cuisineType": "Mexican Pizza",
                  "description": "Pizza",
                  "availableFrom": "3600000",
                  "availableTo": "86400000",
                  "isHighlighted": 1,
                  "highlightedValue": "Must Try",
                  "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/5.jpeg",
                  "isCustomizable": 1,
                  "isVeg": 0,
                  "customizableElements": [
                    {
                      "customizableId": "1",
                      "customizableName": "Toppings(Medium)",
                      "quantity":1,
                      "customizableType": "single",
                      "customizableDishItems": [
                        {
                          "elementId":"1",
                          "elementName": "Onions",
                          "isSelected":1,
                          "Price": "10",
                          "units": "$",
                          "isVeg": 1
                        },
                        {
                          "elementId":"2",
                          "elementName": "Paneer",
                          "Price": "20",
                          "isSelected":0,
                          "units": "$",
                          "isVeg": 1
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      "restaurantDetails": [
        {
          "restaurantName": "Subway",
          "restaurantId": "1",
          "cuisines": "Asian,Continental",
          "averageReview": "4.5",
          "costForTwo": "405",
          "time": "24 mins",
          "isFavourite": "1",
          "units": "$",
          "isVeg": 1,
          "Offers": [
            {
              "OfferType": "FreeBie or Delivery or Percentage",
              "OfferName": "Free Cookie",
              "isFavourite": "1"
            }
          ]
        }
      ]
    }';
    
  
    
        echo $response;
 
    
    
    }




    public function  searchrestrauntdish(request $request){
        $response='{
      "error":"false",
      "error_message":"Search RestaurantAdminService.php&Dishes  listed",
       "ListRestaurant":[
         
         {
              "restaurantName": "Subway",
          "restaurantId": "1",
              "restaurantImage":"http://139.59.70.80/foodapp/public/images/dishes/5.jpeg",
              "cuisines": "Asian,Continental",
              "averageReview": "4.5",
              "costForTwo": "405",
              "units": "$",
              "time": "24 mins",
              "isExculsive": "true",
          "isFavourite":"1",
              "isPromoted": "true",
              "Outlets": [
                {
                 "locationName":"Subway",
                 "outletId":"1",
                 "Offers":[{
       "OfferType" :"FreeBie or Delivery or Percentage",
                 "OfferName" :"Free Cookie",
      "isFavourite":"1"
      }
               
                 ],
                 "AverageReview":"4.5",
                 "Time":"34 mins"
                }
              ],
      "isServicable":false
            },
           {
              "RestaurantName": "Subway",
              "Cuisines": "Asian,Continental",
               "Image":"http://139.59.70.80/foodapp/public/images/dishes/5.jpeg",
              "AverageReview": "4.5",
              "CostForTwo": "405",
              "Time": "24 mins",
              "isExculsive": "true",
              "isPromoted": "true",
              "Outlets": [
                {
                 "LocationName":"Subway",
                 "Offers":[
      { 
      "OfferType" :"FreeBie or Delivery or Percentage",
                 "OfferName" :"Free Cookie"
      },{
      "OfferType" :"FreeBie or Delivery or Percentage",
                 "OfferName" :"Free Cookie"
      }
                
                 ],
                 "AverageReview":"4.5",
                 "Time":"34 mins"
                }
              ],
            "isServicable":false
             }
        
      ],
      "ListDishes":[{
         "restaurant":[{
           "restaurantName": "Subway",
            "restaurantId": "1",
            "cuisines": "Asian,Continental",
            "averageReview": "4.5",
            "costForTwo": "405",
            "units": "$",
            "time": "24 mins"
              }],
         "dishes":[{
           "dishId":"1",
      "dishName":"Tandoori Chicken",
      "description":"Tomato base with double cheese",
      "Price": "10",
      "units": "$",
      "availableFrom": "82930291031012",
      "availableTo": "6457890976578",
      "isVeg": 1,
      "isBestSeller":"1",
      "isCustomizable": 1,
      "customizableElements":[
      {
      "customizableName": "Toppings(Medium)",
      "customizableType": "single",
      "customizableElements": [
      {
         "elementName": "Full",
         "Price": "300",
          "units": "$",
          "isVeg": 0
        },
        {
         "elementName": "Half",
         "Price": "20",
         "units": "$",
         "isVeg": 0
          }
          ]
          
          }]
           
         },
         {
           "dishId":"1",
      "dishName":"Tandoori Chicken",
      "description":"Tomato base with double cheese",
      "Price": "10",
      "units": "$",
      "availableFrom": "82930291031012",
      "availableTo": "6457890976578",
      "isVeg": 1,
      "isBestSeller":"1",
      "isCustomizable": 1,
      "customizableElements":[
      {
      "customizableName": "Toppings(Medium)",
      "customizableType": "single",
      "customizableElements": [
      {
         "elementName": "Full",
         "Price": "300",
          "units": "$",
          "isVeg": 0
        },
        {
         "elementName": "Half",
         "Price": "20",
         "units": "$",
         "isVeg": 0
          }
          ]
          
          }]
           
         }
         
         ]
        
        
      },{
         "restaurant":[{
             "restaurantName": "Dominos Pizza",
            "restaurantId": "2",
            "cuisines": "Pizzas",
            "averageReview": "3.5",
            "costForTwo": "200",
            "units": "$",
            "time": "34 mins"
              }],
         "dishes":[{
           "dishId":"1",
      "dishName":"Margherita Pizza",
      "description":"Tomato base with double cheese",
      "Price": "20",
      "units": "$",
      "availableFrom": "82930291031012",
      "availableTo": "6457890976578",
      "isVeg": 1,
      "isBestSeller":"1",
      "isCustomizable": 1,
      "customizableElements":[
      {
      "customizableName": "Margherita Pizza(Medium)",
      "customizableType": "single",
      "customizableElements": [
      {
         "elementName": "Cheese Max ",
         "Price": "300",
          "units": "$",
          "isVeg": 0
        },
        {
         "elementName": "Mushrooms",
         "Price": "200",
         "units": "$",
         "isVeg": 0
          }
          ]
          
          }]
           
           
           
         },
         {
           "dishId":"1",
      "dishName":"Margherita Pizza",
      "description":"Tomato base with double cheese",
      "Price": "20",
      "units": "$",
      "availableFrom": "82930291031012",
      "availableTo": "6457890976578",
      "isVeg": 1,
      "isBestSeller":"1",
      "isCustomizable": 1,
      "customizableElements":[
      {
      "customizableName": "Margherita Pizza(Medium)",
      "customizableType": "single",
      "customizableElements": [
      {
         "elementName": "Cheese Max ",
         "Price": "300",
          "units": "$",
          "isVeg": 0
        },
        {
         "elementName": "Mushrooms",
         "Price": "200",
         "units": "$",
         "isVeg": 0
          }
          ]
          
          }]
           
           
           
         }
         
         ]
        
        
        
      }
      
      
      ]
        
      
      }';
      echo $response;
      }







      public function  listofFilters(request $request){
        $response='{
          "error": "false",
          "error_message": "list of filters",
          "filters": [
              {
                  "filterId": "1",
                  "filterName": "Relavance",
                  "filterStatus": "0"
              },
              {
                  "filterId": "2",
                  "filterName": "CostForTwo",
                  "filterStatus": "0"
              },
              {
                  "filterId": "3",
                  "filterName": "DeliveryTime",
                  "filterStatus": "0"
              }
          ]
      }';
        echo $response;
      }
      
      public function listofPayment(request $request){
        $response='{
          "error": "false",
          "errorMessage": "Restaurants Listed",
          "availablePaymentTypes": [
           {
            "paymentTypeName": "Card",
            "paymentTypeId": "0",
            "paymentTypeImage": "image.png"
           }
         ]
      }';
      echo $response;
      }
      
      public function listofCoupons(request $request){
          $response=' {
              {
      "error":"true",
      "error_message":"List of Coupons",
      "coupons": [
          {
            "couponCode": "AABBCC",
            "couponId": "0",
            "couponTitle": "25% Discount on Help",
            "minCartAmount": "Rs 250 and above",
            "paymentMethod": "25% Discount on Help",
            "validTill": "Offers Valid till 31st December",
      "couponTermsAndCondition":[
      {
      "terms":"Valid Once per user"
      },
      {
      "terms":"Offer not valid on COD"
      }
      
      ]
          }
        ]
      
      
      }';
      
      echo $response;
      
      }
      
      
      public function applyCoupon(request $request){
        $response='{
          "error": "false",
          "errorMessage": "COUPON APPLIED"
      }
      ';
      echo $response;
      
      }
      
      public function removeCoupon(request $request){
        $response='{
          "error":"false",
          "error_message":"Coupon Removed successfully";
            }';
        echo $response;
      }
      
      public function  viewCart(request $request){
        $response='{
        "error": "false",
        "error_message": "View Cart api",
        "Restraunt": [
          {
           "restaurantName": "Subway",
                  "restaurantId": "1",
                  "restaurantImage": "http://139.59.70.80/foodapp/public/images/RestaurantAdminService.php/1.jpeg",
                  "cuisines": "Asian,Continental",
                  "averageReview": "4.5",
                  "costForTwo": "405",
                  "units": "$",
                  "time": "24 mins",
                  "isExculsive": "true",
                  "isFavourite": "1",
                  "isPromoted": "true"
          }
        ],
        "CartDishes": [
          {
            "dishId": "1",
            "dishName": "margherita pizza",
            "price": "239",
            "slashPrice": "270",
            "unit": "$",
            "cuisineType": "Mexican Pizza",
            "description": "Pizza",
            "availableFrom": "82930291031012",
            "availableTo": "6457890976578",
            "isHighlighted": 1,
            "highlightedValue": "Must Try",
            "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/5.jpeg",
            "isCustomizable": 1,
            "isVeg": 1,
            "customizableElements": [
              {
                "customizableId": "1",
                "customizableName": "Toppings(Medium)",
                "customizableType": "single",
                "customizableElements": [
                  {
                    "elementName": "Onions",
                    "Price": "10",
                    "isSelected": "1",
                    "units": "$",
                    "isVeg": 1
                  },
                  {
                    "elementName": "Paneer",
                    "Price": "20",
                    "isSelected": "0",
                    "units": "$",
                    "isVeg": 1
                  }
                ]
              }
            ]
          },
          {
            "dishName": "margherita pizza",
            "price": "239",
            "slashPrice": "270",
            "unit": "$",
            "cuisineType": "Mexican Pizza",
            "description": "Pizza",
            "availableFrom": "82930291031012",
            "availableTo": "6457890976578",
            "isHighlighted": 1,
            "highlightedValue": "Must Try",
            "dishImage": "http://139.59.70.80/foodapp/public/images/dishes/5.jpeg",
            "isCustomizable": 1,
            "isVeg": 1,
            "customizableElements": [
              {
                "customizableName": "Toppings(Medium)",
                "customizableType": "single",
                "customizableElements": [
                  {
                    "elementName": "Onions",
                    "Price": "10",
                    "units": "$",
                    "isVeg": 1
                  },
                  {
                    "elementName": "Paneer",
                    "Price": "20",
                    "units": "$",
                    "isVeg": 1
                  }
                ]
              }
            ]
          }
        ],
        "itemTotal": "350",
        "units": "$",
        "OffersDiscount": "25",
        "Charges": [
          {
            "chargeName": "packCharge",
            "Price": "30",
            "units": "$",
            "isEnabled": "1"
          },
          {
            "chargeName": "DeliveryCharge",
            "Price": "10",
            "units": "$",
            "isEnabled": "1",
            "isFree": "1"
          }
        ],
        "Discounts": [
          {
            "discountName": "Coupon Discount",
            "discountAmount": "$10"
          },
          {
            "discountName": "RestaurantAdminService.php Discount",
            "discountAmount": "$5"
          }
        ],
        "taxes": [
          {
            "taxName": "GST",
            "price":"34",
            "units": "$"
          }
        ],
        "Coupons": [
          {
            "couponName": "45",
            "couponCode": "EC-ASDAS",
            "couponDescription": "Offers applied on the bill"
          }
        ],
        "ToPay": "100",
        "isCartEligible": "false",
        "shortDescription": "Too Many Items",
        "longDescription": "Remove Some of the items in the cart",
        "highLightedText": "You have saved $30 from this order"
      }';
      echo $response;
      }







}


