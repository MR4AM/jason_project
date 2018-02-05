require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1'
    },
    shim:{
    }
 })
require(['jquery'],function(){
  jQuery(function($){
        console.log(666);
        $('header').load('../html/base.html header');
         $('nav').load('../html/base.html #nav_top');
        $('footer').load('../html/base.html footer');
    })
})