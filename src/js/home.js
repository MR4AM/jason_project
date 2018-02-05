require.config({
    // baseUrl:

    // 设置别名（虚拟路径）
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'slider':'../lib/jquery.autoBanner/js/jquery.autoBanner',
        // 'zoom':'../lib/jquery.gdsZoom/jquery.gdsZoom'
    },
    shim:{
        //zoom依赖jquery
        // 'zoom':['jquery']
        // 'zoom':{
        //      deps: ["jquery"],//设置依赖
        //      exports:'jQuery.prototype.gdsZoom'
        // },
        'slider':{
             deps: ["jquery"],//设置依赖
             exports:'jQuery.prototype.jasonCarousel'
        },
    }
 })

// 
require(['jquery','com_plus','ajax_plugin','slider','dateFormat'],function($){
    jQuery(function($){
            // 头部搜索框ajax请求
            var timer;
            var res=$('.res').get(0);
            $('#insert').get(0).focus();
            $('#insert').get(0).oninput = function(){
                let key = $('#insert').get(0).value;
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
            // 轮播右侧滚动公告ajax请求
            var $dl=$('<dl/>').addClass('mes_list');
            ajax({
                type:'get',
                url:'../api/messsage.json',
                success:function(res){
                var mes=$.map($(res),function(val,idx){
                    return '<dd>'+'<a href="#">'+val+'</a>'+'</dd>'
                  }).join('\n');
                  $dl.html(mes);
                  $dl.appendTo('.banner_mes');
                    // 轮播图右侧hotsale商品广告
                    var $hotsale=$('<img/>').attr('src','../img/banner/banner_hotsale.jpg');
                    $hotsale.appendTo('.banner_mes');
                }
            })
            // 自动轮播图
            $('#auto').jasonCarousel({
                width:1900,
                height:480,
                duration:3000,
                imgs:['../img/banner/banner1.jpg','../img/banner/banner2.jpg','../img/banner/banner3.jpg','../img/banner/banner4.jpg'],
                // 轮播类型：vertical垂直horizontal水平滚动fade淡入淡出
                type:'fade',
                page:true,
                // 是否无缝滚动默认为true，当你需要淡入淡出效果时，请设置为false
                marquee:false,
            });
            $('#banner').on('mouseenter',function(){
                $('.prev').css('display','block');
                $('.next').css('display','block');
            }).on('mouseleave',function(){
                 $('.prev').css('display','none');
                $('.next').css('display','none');
            })
            // 秒杀倒计时
            var lefttime=setInterval(autotime,1000);
            function autotime(){
                var now=new Date();
                var date_str=now.format('YYYY/M/D');
                var new_str=String(date_str.slice(-1)*1+1);
                date_str=date_str.substr(0,7);
                var final_str=date_str+new_str;
                // console.log(final_str);
                var future=new Date(final_str);
                var daojishi=parseInt((Date.parse(future)-Date.parse(now))/1000);
                // 将相差的毫秒数转化成天/时/分/秒
               var secLeft=daojishi%60;
               var minLeft=parseInt(daojishi/60)%60;
               var hourLeft=Math.floor(daojishi/60/60)%24;
               // 补0操作
               secLeft<10?secLeft='0'+secLeft:secLeft;
               minLeft<10?minLeft='0'+minLeft:minLeft;
               hourLeft<10?hourLeft='0'+hourLeft:hourLeft;        
              $('.hour').html(hourLeft);
              $('.min').html(minLeft);
              $('.second').html(secLeft);
            }
        // 秒杀活动产品数据ajax请求
            var $pro_one_ul=$('<ul/>').addClass('clearfix fl');
        ajax({
            type:'get',
            url:'../api/prosale.json',
            success:function(res){ 
               var par=$.map($(res),function(item){
                return '<li><a href="#"><img src="'+item.imgurl+'"/></a><h1>'+item.name+'</h1>'+
                        '<span>'+item.sale+'<del>'+item.price+'</del>'+'</span><a href="#" class="catchbuy">立即秒杀</a></li>'
               }).join('\n')
              $pro_one_ul.get(0).innerHTML=par;
              $('.pro_one_detail').get(0).appendChild($pro_one_ul.get(0));
            }
        })
        // 商品模块左边广告栏
        function pro_modul_rendom(img1,img2,img3,selector){
            var $par=$('<div class="fl"><a href="#"><img src="'+img1+'"></a></div>'+
                '<div><a href="#"><img src="'+img2+'"/></a><a href="#"><img src="'+img3+'"/></a></div>').appendTo(selector);
        }
        pro_modul_rendom('../img/phone/ph1.jpg','../img/phone/ph2.jpg','../img/phone/ph3.jpg','.phone_det_left');
        pro_modul_rendom('../img/clothes/cl1.jpg','../img/clothes/cl2.jpg','../img/clothes/cl3.jpg','.clothes_det_left');
        pro_modul_rendom('../img/family/fm1.jpg','../img/family/fm2.jpg','../img/family/fm3.jpg','.family_det_left ');
        pro_modul_rendom('../img/life/lf1.jpg','../img/life/lf2.jpg','../img/life/lf3.jpg','.life_det_left ');
        pro_modul_rendom('../img/mom_child/mc1.jpg','../img/mom_child/mc2.jpg','../img/mom_child/mc3.jpg','.mom_child_det_left ');
        pro_modul_rendom('../img/sport_outside/so1.jpg','../img/sport_outside/so2.jpg','../img/sport_outside/so3.jpg','.sport_outside_det_left ');
        pro_modul_rendom('../img/makeup/mk1.jpg','../img/makeup/mk2.jpg','../img/makeup/mk3.jpg','.makeup_det_left ');
        pro_modul_rendom('../img/heathy_food/hf1.jpg','../img/heathy_food/hf2.jpg','../img/heathy_food/hf3.jpg','.heathy_food_det_left ');
        


        // 商品模块ajax请求
        ajax({
            type:'get',
            url:'../api/productdata.json',
            success:function(res){
                prodata_arr=res.prodata;
                $.each($(prodata_arr),function(idx,item){
                    // 生成结构函数
                     function rendom(arr,selector){
                            var par=$.map($(arr),function(val){
                                return '<a href="#"><li><img src="'+val.imgurl+'"/><h2>'+val.name+'</h2><span>'+val.price+'</span></li></a>'
                            }).join('\n');
                            $(selector).html(par);
                        }
                // 根据模版加载对应json数据：手机数码模块
                    if(item.name=='phone'){
                            var phone_arr=[];
                            phone_arr=item.prodata;
                            rendom(phone_arr,'.phone_det_right');
                    }
                    // 鞋服配饰模块
                    if(item.name=='clothes'){
                            var phone_arr=[];
                            clothes_arr=item.prodata;
                            rendom(clothes_arr,'.clothes_det_right');
                    }
                    // 家居电器模块
                    if(item.name=='family'){
                            var phone_arr=[];
                            family_arr=item.prodata;
                            rendom(family_arr,'.family_det_right');
                    }
                     // 家居生活模块
                    if(item.name=='life'){
                            var phone_arr=[];
                            life_arr=item.prodata;
                            rendom(life_arr,'.life_det_right');
                    }
                     // 母婴玩具模块
                    if(item.name=='mom_child'){
                            var phone_arr=[];
                            mom_child_arr=item.prodata;
                            rendom(mom_child_arr,'.mom_child_det_right');
                    }
                      // sport_outside模块
                    if(item.name=='sport_outside'){
                            var phone_arr=[];
                            sport_outside_arr=item.prodata;
                            rendom(sport_outside_arr,'.sport_outside_det_right');
                    }
                      // makeup模块
                    if(item.name=='makeup'){
                            var phone_arr=[];
                            makeup_arr=item.prodata;
                            rendom(makeup_arr,'.makeup_det_right');
                    }
                      // heathy_food模块
                    if(item.name=='heathy_food'){
                            var phone_arr=[];
                            heathy_food_arr=item.prodata;
                            rendom(heathy_food_arr,'.heathy_food_det_right');
                    }

                })
            }
        })





    })
})
