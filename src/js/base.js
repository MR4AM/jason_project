define(function(){
    return{
        searchAjax(){
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
                                $('.insert').get(0).value=$(this).html();
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
            // return this;
        },
         // 加载远程html文件，load取html结构
        loading(selheader,selnav,selfooter){
               console.log(this.searchAjax);
                $(selheader).load('../html/base.html header',function(){
                 // 头部搜索框ajax请求
                // this.searchAjax();
               // // 搜索框吸顶(滚动条滚动时触发)
               // $(window).scroll(function(){
               //    catchTop($('#header_main').get(0),$('.catchTop').get(0));
               //    if(window.scrollY>1000){
               //      $('.toTop').css('display','block');
               //    }else{
               //      $('.toTop').css('display','none');
               //    }
               // })
            });
             $(selnav).load('../html/base.html #nav_top');
             $('.toTop').load('../html/base.html .toTop',function(){    
             });
            $(selfooter).load('../html/base.html footer');
        },
        // toTop(){
        //  // 返回顶部按钮
        //     $('.toTop').click(function(){
        //         toTop();
        //     })  
        // } 
    }
})


// js代码备份（home.js商品ajax请求备份）
// 
        // 商品模块ajax请求
        // ajax({
        //     type:'get',
        //     url:'../api/productdata.json',
        //     success:function(res){
        //         prodata_arr=res.prodata;
        //         $.each($(prodata_arr),function(idx,item){
        //             // 生成结构函数
        //              function rendom(arr,selector){
        //                     var par=$.map($(arr),function(val){
        //                         return '<a href="#"><li><img src="'+val.imgurl+'"/><h2>'+val.name+'</h2><span>'+val.price+'</span></li></a>'
        //                     }).join('\n');
        //                     $(selector).html(par);
        //                 }
        //         // 根据模版加载对应json数据：手机数码模块
        //             if(item.name=='phone'){
        //                     var phone_arr=[];
        //                     phone_arr=item.prodata;
        //                     rendom(phone_arr,'.phone_det_right');
        //             }
        //             // 鞋服配饰模块
        //             if(item.name=='clothes'){
        //                     var phone_arr=[];
        //                     clothes_arr=item.prodata;
        //                     rendom(clothes_arr,'.clothes_det_right');
        //             }
        //             // 家居电器模块
        //             if(item.name=='family'){
        //                     var phone_arr=[];
        //                     family_arr=item.prodata;
        //                     rendom(family_arr,'.family_det_right');
        //             }
        //              // 家居生活模块
        //             if(item.name=='life'){
        //                     var phone_arr=[];
        //                     life_arr=item.prodata;
        //                     rendom(life_arr,'.life_det_right');
        //             }
        //              // 母婴玩具模块
        //             if(item.name=='mom_child'){
        //                     var phone_arr=[];
        //                     mom_child_arr=item.prodata;
        //                     rendom(mom_child_arr,'.mom_child_det_right');
        //             }
        //               // sport_outside模块
        //             if(item.name=='sport_outside'){
        //                     var phone_arr=[];
        //                     sport_outside_arr=item.prodata;
        //                     rendom(sport_outside_arr,'.sport_outside_det_right');
        //             }
        //               // makeup模块
        //             if(item.name=='makeup'){
        //                     var phone_arr=[];
        //                     makeup_arr=item.prodata;
        //                     rendom(makeup_arr,'.makeup_det_right');
        //             }
        //               // heathy_food模块
        //             if(item.name=='heathy_food'){
        //                     var phone_arr=[];
        //                     heathy_food_arr=item.prodata;
        //                     rendom(heathy_food_arr,'.heathy_food_det_right');
        //             }

        //         })
        //     }
        // })
