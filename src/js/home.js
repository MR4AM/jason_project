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
        'base':{
            deps:['com_plus']
        },
    }
 })

// 
require(['jquery','com_plus','base','ajax_plugin','slider','dateFormat'],function($,common,base){
             // 头部搜索框ajax请求
             base.searchAjax();
            // 搜索框吸顶(滚动条滚动时触发)
           $(window).scroll(function(){
              common.catchTop($('#header_main').get(0),$('.catchTop').get(0));
              if(window.scrollY>1000){
                $('.toTop').css('display','block');
              }else{
                $('.toTop').css('display','none');
              }
           })
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
            // 根据导航条分类发起ajax请求
             var data_gory;
             var par='';
             cateGory('#nav_left');
             function cateGory(selector){
                 $(selector).on('click',function(e){
                    console.log(e.target.id);
                switch(e.target.id){
                    case 'phone':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'life_ele':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'kitchen_ele':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'heathy_ele':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'makeup':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'cooker':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'life':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'clothes':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'watch':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'beauty':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'bag':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'sport':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'mom_child':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'heathy_food':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                }
            })
        }
              function listHref(data){
                 par+='?'+'category'+'='+data;
                location.href='html/list.html'+par;
              }
          // 导航条分类ajax请求函数
              function listAjax(data){
                    $.ajax({
                    url:'../api/list.php',
                    dataType:'json',
                     data:{category:data},
                    success:function(res){
                        console.log(res);
                    },
                })
              }
              // 点击页面任意商品位置实现跳转到详情页ajax请求
               function detailAjax(data){
                    $.ajax({
                    url:'../api/hometodetail.php',
                    dataType:'json',
                     data:{id:data},
                    success:function(res){
                        console.log(res);
                    },
                })
              }
               function detailHref(data){
                 par+='?'+'id'+'='+data;
                location.href='html/detail.html'+par;
              }
            // 自动轮播图
            $('#auto').jasonCarousel({
                width:1900,
                height:480,
                duration:3000,
                imgs:['../img/banner/banner1.jpg','../img/banner/banner2.jpg','../img/banner/banner3.jpg','../img/banner/banner4.jpg','../img/banner/banner5.jpg','../img/banner/banner6.jpg'],
                // 轮播类型：vertical垂直horizontal水平滚动fade淡入淡出
                type:'fade',
                page:true,
                // 是否无缝滚动默认为true，当你需要淡入淡出效果时，请设置为false
                marquee:false,
            });
            // 鼠标移入时出现前后按钮
            $('#auto').on('mouseover',function(){
                $('.prev').css('display','block');
                $('.next').css('display','block');
            }).on('mouseout',function(){
                 $('.prev').css('display','none');
                $('.next').css('display','none');
            })
            // 秒杀倒计时
            function autotime(){
                var now=new Date();
                var date_str=now.format('YYYY/MM/DD');
                var new_str=String(date_str.slice(-2)*1+1);
                date_str=date_str.substr(0,8);
                var final_str=date_str+new_str;
                console.log(final_str);
                var future=new Date(final_str);
                var daojishi=parseInt((Date.parse(future)-Date.parse(now))/1000);
                console.log(daojishi)
                // 将相差的毫秒数转化成天/时/分/秒
               var secLeft=daojishi%60;
               var minLeft=parseInt(daojishi/60)%60;
               var hourLeft=Math.floor(daojishi/60/60)%24;
               console.log(secLeft,minLeft,hourLeft)
               // 补0操作
               secLeft<10?secLeft='0'+secLeft:secLeft;
               minLeft<10?minLeft='0'+minLeft:minLeft;
               hourLeft<10?hourLeft='0'+hourLeft:hourLeft;        
              $('.hour').html(hourLeft);
              $('.min').html(minLeft);
              $('.second').html(secLeft);
            }
            var lefttime=setInterval(autotime,1000);
        // 商品模块左边广告栏
        function pro_modul_rendom(img1,img2,img3,selector){
            var $par=$('<div class="fl"><img src="'+img1+'"></div>'+
                '<div><img src="'+img2+'"/><img src="'+img3+'"/></div>').appendTo(selector);
        }
        pro_modul_rendom('../img/phone/ph1.jpg','../img/phone/ph2.jpg','../img/phone/ph3.jpg','.phone_det_left');
        pro_modul_rendom('../img/clothes/cl1.jpg','../img/clothes/cl2.jpg','../img/clothes/cl3.jpg','.clothes_det_left');
        pro_modul_rendom('../img/family/fm1.jpg','../img/family/fm2.jpg','../img/family/fm3.jpg','.family_det_left ');
        pro_modul_rendom('../img/life/lf1.jpg','../img/life/lf2.jpg','../img/life/lf3.jpg','.life_det_left ');
        pro_modul_rendom('../img/mom_child/mc1.jpg','../img/mom_child/mc2.jpg','../img/mom_child/mc3.jpg','.mom_child_det_left ');
        pro_modul_rendom('../img/sport_outside/so1.jpg','../img/sport_outside/so2.jpg','../img/sport_outside/so3.jpg','.sport_outside_det_left ');
        pro_modul_rendom('../img/makeup/mk1.jpg','../img/makeup/mk2.jpg','../img/makeup/mk3.jpg','.makeup_det_left ');
        pro_modul_rendom('../img/heathy_food/hf1.jpg','../img/heathy_food/hf2.jpg','../img/heathy_food/hf3.jpg','.heathy_food_det_left ');
        // 点击商品模块左边广告栏实现跳转到列表页
             cateGory('main .container');
        // 返回顶部按钮
        $('.toTop').click(function(){
            common.toTop();
        })
        var prosale_arr=[];
        var phone_arr=[];
        var family_arr=[];
        var life_arr=[];
        var clothes_arr=[];
        var mom_child_arr=[];
        var sport_outside_arr=[];
        var makeup_arr=[];
        var heathy_food_arr=[];
        var $pro_one_ul=$('<ul/>').addClass('clearfix fl');
        // 生成结构函数
        function rendom(arr,selector){
            var par=$.map($(arr),function(val){
                return '<li><img src="'+val.imgurl+'" id="'+val.id+'"/><h2>'+val.name+'</h2><span>￥'+val.price+'</span></li>'
            }).join('\n');
            $(selector).html(par);
        }
        // jQuery ajax请求
        $.ajax({
            type:'get',
            url:'../api/goods.php',
            dataType:'json',
            success:function(res){
                prodata_arr=res;
                $.each($(prodata_arr),function(idx,item){
                // 秒杀活动产品
                    if(item.category=='prosale'){
                        prosale_arr.push(item);
                            var par=$.map($(prosale_arr),function(item){
                            return '<li><img src="'+item.imgurl+'" id="'+item.id+'"/><h1>'+item.name+'</h1>'+
                                    '<span>￥'+item.sale+'<del>￥'+item.price+'</del>'+'</span><a href="#" class="catchbuy">立即秒杀</a></li>'
                           }).join('\n')
                          $pro_one_ul.get(0).innerHTML=par;
                          $('.pro_one_detail').get(0).appendChild($pro_one_ul.get(0));
                }
                 // 手机数码模块
                    if(item.category=='phone'){
                        phone_arr.push(item);
                        rendom(phone_arr,'.phone_det_right');
                    }
                    // 鞋服配饰模块
                    if(item.category=='clothes'){
                            clothes_arr.push(item);
                            rendom(clothes_arr,'.clothes_det_right');
                    }
                    // 家居电器模块
                    if(item.category=='family'){
                            family_arr.push(item);
                            rendom(family_arr,'.family_det_right');
                    }
                     // 家居生活模块
                    if(item.category=='life'){
                            life_arr.push(item);
                            rendom(life_arr,'.life_det_right');
                    }
                     // 母婴玩具模块
                    if(item.category=='mom_child'){
                            mom_child_arr.push(item);
                            rendom(mom_child_arr,'.mom_child_det_right');
                    }
                      // sport_outside模块
                    if(item.category=='sport_outside'){
                            sport_outside_arr.push(item);
                            rendom(sport_outside_arr,'.sport_outside_det_right');
                    }
                      // makeup模块
                    if(item.category=='makeup'){
                            makeup_arr.push(item);
                            rendom(makeup_arr,'.makeup_det_right');
                    }
                      // heathy_food模块
                    if(item.category=='heathy_food'){
                            heathy_food_arr.push(item);
                            rendom(heathy_food_arr,'.heathy_food_det_right');
                    }

                })
            }
        })
        // 延时500ms执行点击首页商品跳转到详情页
        setTimeout(function(){
           $('main').on('click','li img',function(e){
                detailAjax(e.target.id);
                detailHref(e.target.id);
          })
        },500)
    


})
