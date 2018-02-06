require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'zoom':'../lib/jquery.jasonZoom/jquery.jasonZoom'
    },
    shim:{
        'zoom':{
             deps: ["jquery"],//设置依赖
             exports:'jQuery.prototype.jasonZoom'
        },
    }
 })
require(['jquery','com_plus','zoom'],function($,common){
      // 加载远程html文件，load取html结构
    $('.detail_header').load('../html/base.html header');
     $('.detail_nav').load('../html/base.html #nav_top');
     $('.detail_main').load('../html/base.html .toTop');
    $('.detail_footer').load('../html/base.html footer');
       // 头部搜索框ajax请求
        var timer;
        var res=$('.res').get(0);
        $('.insert').get(0).focus();
        $('.insert').get(0).oninput = function(){
            let key = $('.insert').get(0).value;
            clearTimeout(timer);
            timer = setTimeout(function(){
                ajax({
                    type:'jsonp',
                    url:'http://suggest.taobao.com/sug?code=utf-8&q='+key,
                    // data:{json:1,wd:key},
                    jsonpName:'callback',
                    success:function(data){
                        var data_arr=[];
                        data_arr=data.result;
                        var $ul=$('<ul/>');
                        var item_arr=[];
                        $.each($(data_arr),function(idx,item){
                            item_arr.push(item[0])
                        })
                        $ul.get(0).innerHTML=$.map(item_arr,function(val,idx){
                            return '<li>'+val+'</li>'
                        }).join('\n');
                        res.innerHTML = '';
                        res.appendChild($ul.get(0));
                        $('.res').on('click','li',function(){
                            // 这里的this指向事件源对象
                            $('#insert').get(0).value=$(this).html();
                        })
                    }
                })
                if(key==''){
                    res.style.display='none';
                }else{
                    res.style.display='block';
                }
            },500); 
        }


})