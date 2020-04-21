/*!

 =========================================================
 * Light Bootstrap Dashboard - v1.4.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

$(document).ready(function () {
    window_width = $(window).width();

    // check if there is an image set for the sidebar's background
    lbd.checkSidebarImage();

    // Init navigation toggle for small screens
    lbd.initRightMenu();

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    $('.form-control').on("focus", function () {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function () {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Fixes sub-nav not working as expected on IOS
    $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
});

$(document).on('click', '.navbar-toggle', function () {
    $toggle = $(this);

    if (lbd.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        lbd.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function () {
            $toggle.removeClass('toggled');
        }, 550);
    } else {
        setTimeout(function () {
            $toggle.addClass('toggled');
        }, 580);
        div = '<div id="bodyClick"></div>';
        $(div).appendTo('body').click(function () {
            $('html').removeClass('nav-open');
            lbd.misc.navbar_menu_visible = 0;
            setTimeout(function () {
                $toggle.removeClass('toggled');
                $('#bodyClick').remove();
            }, 550);
        });

        $('html').addClass('nav-open');
        lbd.misc.navbar_menu_visible = 1;
    }
});

$(window).on('resize', function () {
    if (navbar_initialized) {
        lbd.initRightMenu();
        navbar_initialized = true;
    }
});

lbd = {
    misc: {
        navbar_menu_visible: 0
    },

    checkSidebarImage: function () {
        $sidebar = $('.sidebar');
        image_src = $sidebar.data('image');

        if (image_src !== undefined) {
            sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>'
            $sidebar.append(sidebar_container);
        }
    },

    initRightMenu: debounce(function () {
        if (!navbar_initialized) {
            $sidebar_wrapper = $('.sidebar-wrapper');
            $navbar = $('nav').find('.navbar-collapse').html();

            mobile_menu_content = '';

            nav_content = $navbar;

            nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';

            // navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;

            $sidebar_nav = $sidebar_wrapper.find(' > .nav');

            // insert the navbar form before the sidebar list
            $nav_content = $(nav_content);
            // $navbar_form = $(navbar_form);
            $nav_content.insertBefore($sidebar_nav);
            // $navbar_form.insertBefore($nav_content);

            $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function (event) {
                event.stopPropagation();

            });

            mobile_menu_initialized = true;
        } else {
            if ($(window).width() > 991) {
                // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                // $sidebar_wrapper.find('.navbar-form').remove();
                $sidebar_wrapper.find('.nav-mobile-menu').remove();

                mobile_menu_initialized = false;
            }
        }
    }, 200)
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};


$(document).ready(function () {

    //    $('.has_tab').click(function(){
    //     $(this).toggleClass('tap');
    //    });
    $('#backColor li').on('click', function () {

        $('.down-alone', this).toggleClass('tap');
    });


    $('.sub_menu_bg li').on('click', function () {
        $('.sub_menu_bg li a').removeClass('sideactive');

        $('a', this).addClass('sideactive');

    });

});

// $(document).ready(function() {

//       $("#backColor li").click(function() {

//       });

//      $('.sidebarColor').click(function() {

//                var menuId = $(this).attr('id');
//        $('.collapse, .over, .navhide').removeClass('in');           
//        $('#'+ menuId).addClass('in');
//        $('.sidebarColor, .in, .active').click(function(){
//         var id = $('.collapse, .over, .navhide').attr('id');
//         menuId.preventDefault();
//         $('.collapse, .over, .navhide').removeClass('in');            
//        });


//       });


// });
// $(document).ready(function () {

//     $('.sidebarColor').on('click', function (e) { 
//         var id = $(this).attr('id');
//         var selector = $("#" + id).hasClass('active');
//         alert (selector); 
//         e.preventDefault();
//         $('.collapse, .over, .navhide').toggleClass('in');
//         $(this).toggleClass('navhide');
//         $('.collapse, .over, .navhide').removeClass('in');           

//     });


// });

// $(document).ready(function () {
//     $('.sidebarColor active navhide').on('click', function () {
//         var selector = $(this).hasClass('in'); 
//         alert ('hi');  
//         // e.preventDefault();   

//        if ($(this).hasClass('in')) {
//            alert ($(this).hasClass('in'));
//        } else {
//         $('.collapse, .over, .navhide').toggleClass('in');
//         $(this).toggleClass('navhide');
//         $('.collapse, .over, .navhide').removeClass('in'); 
//        }   
//     });

//     var menuId = $('.sidebarColor active navhide').attr('id')
//        $().on('click',function(){
//         $('.sidebarColor').removeClass('in');   
//        })


// });
// $(document).ready(function () {
//     $('.sidebarColor active navhide').on('click', function () {
//         var selector = $(this).hasClass('in'); 
//         alert ('hi');  
//         // e.preventDefault();   

//     //    if ($(this).hasClass('in')) {
//     //        alert ($(this).hasClass('in'));
//     //    } else {
//     //     $('.collapse, .over, .navhide').toggleClass('in');
//     //     $(this).toggleClass('navhide');
//     //     $('.collapse, .over, .navhide').removeClass('in'); 
//     //    }   
//     });

//     var menuId = $('.sidebarColor active navhide').attr('id')
//        $().on('click',function(){
//         $('.sidebarColor').removeClass('in');   
//        })


// });




$(document).ready(function () {

    $("#backColor li").click(function () {

        // var menu = $(this).attr('id');
        // $(this).prev().find('.navhide').hide();
        // $('id').toggle();
        // $('#usermenu').addClass('over navhide collapse');
        // $('#usermenu').removeClass('over navhide collapse');
        // $('#'.menu).show();
        // alert(menu);
    });

    $('.sidebarColor').click(function (e) {
        e.preventDefault();
        //$('.sidebarColor .navhide').removeClass('myclass');
        //    $('.navhide', this).toggleClass('myclass');
        var menuId = $(this).attr('id');
        $('.collapse, .over, .navhide').removeClass('in');
        $('#' + menuId).addClass('in');



        // $(this)('.nav').addClass('in');
    });

    $('.sidebarColor, .active').click(function (e) {
        e.preventDefault();
        //$('.sidebarColor .navhide').removeClass('myclass');
        //    $('.navhide', this).toggleClass('myclass');

        console.log('test');

        // $('.collapse, .over, .navhide').removeClass('in');
        $('.collapse, .over, .navhide').toggleClass('hide');
        // $('.collapse, .over, .navhide').toggle();




        // $(this)('.nav').addClass('in');
    });    

    //   $('.myclass').hide();
    // $('.sidebarColor').click(function (e) {
    //     e.preventDefault();
    //     $('.sidebarColor .navhide').removeClass('myclass');
    //        $('.navhide', this).toggleClass('myclass');
    //     var menuId = $(this).attr('id');
    //     $('.collapse, .over, .navhide').removeClass('in');
    //     $('#' + menuId).addClass('in');



    //     $(this)('.nav').addClass('in');
    // });

    // $('.sidebarColor, .active').click(function (e) {
    //     e.preventDefault();
    //     $('.sidebarColor .navhide').removeClass('myclass');
    //        $('.navhide', this).toggleClass('myclass');

    //     console.log('test');

    //     $('.collapse, .over, .navhide').removeClass('in');
    //     $('.collapse, .over, .navhide').toggleClass('hide');
    //     $('.collapse, .over, .navhide').toggle();




    //     $(this)('.nav').addClass('in');
    // });

    // $('.active').on('click', function (e) { 
    //     $('.sidebarcolor').removeClass('in')
    // });


    //   $('#menu2').on('click', function(){

    //     $('.navhide', this).toggle();
    //   });
});